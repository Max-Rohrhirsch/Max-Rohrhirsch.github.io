# Pipelines

## GitLab CI/CD

```yaml
stages:
  - helloWorld
  - jobs
  - check
  - destroy

myHelloWorld:
  stage: helloWorld
  script:
    - echo "Erste pipeline"

test-job1:
  stage: jobs
  script:
    - echo "Job 1"
  only:
    changes:
      - src/**/*

test-job2:
  stage: jobs
  script:
    - echo "Job 2"
  only:
    changes:
      - .angular/**/*


sonarqube-check:
  stage: check
  image:
    name: sonarsource/sonar-scanner-cli:latest
    entrypoint: [""]
  variables:
    SONAR_USER_HOME: "${CI_PROJECT_DIR}/.sonar"  # Defines the location of the analysis task cache
    GIT_DEPTH: "0"  # Tells git to fetch all the branches of the project, required by the analysis task
  cache:
    key: "${CI_JOB_NAME}"
    paths:
      - .sonar/cache
  script:
    - sonar-scanner
  allow_failure: true
  only:
    - merge_requests
    - dockTest
    - develop

destroy:
  stage: destroy
  script:
    - echo "Destroy pipeline"
  when: manual
```

## GitLab CI/CD - Komplexeres Beispiel

```yaml
# Variablen für alle Jobs
variables:
  DOCKER_REGISTRY: registry.gitlab.com
  DOCKER_IMAGE_NAME: $CI_REGISTRY_IMAGE/$CI_COMMIT_REF_SLUG
  DOCKER_TLS_CERTDIR: "/certs"

# Standard-Einstellungen für alle Jobs
default:
  image: alpine:latest
  before_script:
    - echo "Job $CI_JOB_NAME started"
  after_script:
    - echo "Job $CI_JOB_NAME finished"

# Pipeline-Stufen
stages:
  - build
  - test
  - docker
  - deploy
  - cleanup

# Cache-Konfiguration
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/

# Job: Dependencies installieren und Build erstellen
build:
  stage: build
  image: node:16-alpine
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

# Job: Lint-Check durchführen
lint:
  stage: test
  image: node:16-alpine
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run lint
  needs:
    - build

# Job: Unit-Tests durchführen
unit-test:
  stage: test
  image: node:16-alpine
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run test
  artifacts:
    paths:
      - coverage/
    reports:
      junit: junit.xml
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  needs:
    - build

# Job: End-to-End-Tests mit Cypress
e2e-test:
  stage: test
  image: cypress/browsers:node16.14.0-chrome99-ff97
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run e2e:headless
  artifacts:
    when: on_failure
    paths:
      - cypress/screenshots/
      - cypress/videos/
    expire_in: 1 week
  needs:
    - build

# Job: Docker-Image bauen
docker-build:
  stage: docker
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $DOCKER_IMAGE_NAME:$CI_COMMIT_SHA -t $DOCKER_IMAGE_NAME:latest .
    - docker push $DOCKER_IMAGE_NAME:$CI_COMMIT_SHA
    - docker push $DOCKER_IMAGE_NAME:latest
  needs:
    - build
    - lint
    - unit-test

# Job: Staging-Deployment
deploy-staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - echo "Deploying to staging server..."
    - ssh -o StrictHostKeyChecking=no user@staging-server "docker pull $DOCKER_IMAGE_NAME:$CI_COMMIT_SHA && docker-compose up -d"
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - master
  needs:
    - docker-build

# Job: Production-Deployment (manuell)
deploy-production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  script:
    - echo "Deploying to production server..."
    - ssh -o StrictHostKeyChecking=no user@production-server "docker pull $DOCKER_IMAGE_NAME:$CI_COMMIT_SHA && docker-compose up -d"
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - master
  needs:
    - deploy-staging

# Job: Alte Images und Caches aufräumen
cleanup:
  stage: cleanup
  script:
    - echo "Cleaning up old artifacts and images..."
  rules:
    - when: always
  allow_failure: true
```

## GitHub Actions

### Node.js CI/CD Pipeline

```yaml
name: Node.js CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build --if-present
      
    - name: Run tests
      run: npm test

    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
    
  lint:
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16.x'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run ESLint
      run: npm run lint
      
  security:
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16.x'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run security audit
      run: npm audit --audit-level=moderate
      
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [lint, security]
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist
        
    - name: Deploy to Staging
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USERNAME }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        source: "dist/"
        target: "/var/www/staging/"
        
    - name: Post-deployment steps
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USERNAME }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        script: |
          cd /var/www/staging
          pm2 restart staging-app
    
  deploy-production:
    runs-on: ubuntu-latest
    needs: [lint, security]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist
        
    - name: Deploy to Production
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.PRODUCTION_HOST }}
        username: ${{ secrets.PRODUCTION_USERNAME }}
        key: ${{ secrets.PRODUCTION_SSH_KEY }}
        source: "dist/"
        target: "/var/www/production/"
        
    - name: Post-deployment steps
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.PRODUCTION_HOST }}
        username: ${{ secrets.PRODUCTION_USERNAME }}
        key: ${{ secrets.PRODUCTION_SSH_KEY }}
        script: |
          cd /var/www/production
          pm2 restart production-app
```

### Python CI/CD Pipeline für Django

```yaml
name: Python Django CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    strategy:
      matrix:
        python-version: [3.8, 3.9, '3.10']
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
        cache: 'pip'
    
    - name: Install Dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-django pytest-cov
    
    - name: Run Tests
      env:
        DATABASE_URL: postgres://postgres:postgres@localhost:5432/test_db
        DJANGO_SETTINGS_MODULE: myproject.settings.test
      run: |
        pytest --cov=./ --cov-report=xml
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
  
  lint:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
        cache: 'pip'
    
    - name: Install Dependencies
      run: |
        python -m pip install --upgrade pip
        pip install flake8 black isort
    
    - name: Run linters
      run: |
        flake8 .
        black --check .
        isort --check --profile black .
  
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [test, lint]
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Deploy to Heroku (Staging)
      uses: akhileshns/heroku-deploy@v3.12.14
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "my-app-staging"
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
  
  deploy-production:
    runs-on: ubuntu-latest
    needs: [test, lint]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://my-app.herokuapp.com
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Deploy to Heroku (Production)
      uses: akhileshns/heroku-deploy@v3.12.14
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "my-app"
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## Jenkins Pipeline (Jenkinsfile)

### Java-Anwendung mit Maven

```groovy
pipeline {
    agent {
        docker {
            image 'maven:3.8.6-openjdk-11'
            args '-v /root/.m2:/root/.m2'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn -B clean compile'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn -B test'
            }
            post {
                always {
                    junit '**/target/surefire-reports/TEST-*.xml'
                }
            }
        }
        
        stage('Code Quality') {
            steps {
                sh 'mvn -B sonar:sonar -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=${SONAR_TOKEN}'
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn -B package -DskipTests'
                archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            }
        }
        
        stage('Docker Build') {
            agent any
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} -t myapp:latest .'
            }
        }
        
        stage('Deploy to Dev') {
            agent any
            steps {
                sh '''
                    docker stop myapp-dev || true
                    docker rm myapp-dev || true
                    docker run -d --name myapp-dev -p 8080:8080 myapp:${BUILD_NUMBER}
                '''
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'mvn -B verify -DskipUnitTests'
            }
        }
        
        stage('Deploy to Staging') {
            agent any
            when {
                branch 'develop'
            }
            steps {
                sh '''
                    docker stop myapp-staging || true
                    docker rm myapp-staging || true
                    docker run -d --name myapp-staging -p 8081:8080 myapp:${BUILD_NUMBER}
                '''
            }
        }
        
        stage('Deploy to Production') {
            agent any
            when {
                branch 'main'
            }
            steps {
                timeout(time: 1, unit: 'DAYS') {
                    input message: 'Deploy to Production?', ok: 'Yes'
                }
                sh '''
                    docker stop myapp-prod || true
                    docker rm myapp-prod || true
                    docker run -d --name myapp-prod -p 80:8080 myapp:${BUILD_NUMBER}
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend channel: '#jenkins', color: 'good', message: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        failure {
            slackSend channel: '#jenkins', color: 'danger', message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
    }
}
```

## Azure DevOps Pipeline

```yaml
# Azure DevOps YAML Pipeline für .NET Core Anwendung
trigger:
  branches:
    include:
    - main
    - develop
    - feature/*

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'
  dotnetSdkVersion: '6.x'
  projectName: 'MyProject'

stages:
- stage: Build
  jobs:
  - job: Build
    steps:
    - task: UseDotNet@2
      displayName: 'Use .NET SDK $(dotnetSdkVersion)'
      inputs:
        packageType: 'sdk'
        version: '$(dotnetSdkVersion)'
    
    - task: DotNetCoreCLI@2
      displayName: 'Restore packages'
      inputs:
        command: 'restore'
        projects: '**/*.csproj'
    
    - task: DotNetCoreCLI@2
      displayName: 'Build solution'
      inputs:
        command: 'build'
        projects: '**/*.csproj'
        arguments: '--configuration $(buildConfiguration)'
    
    - task: DotNetCoreCLI@2
      displayName: 'Run tests'
      inputs:
        command: 'test'
        projects: '**/*Tests.csproj'
        arguments: '--configuration $(buildConfiguration) --collect "Code coverage"'
    
    - task: DotNetCoreCLI@2
      displayName: 'Publish'
      inputs:
        command: 'publish'
        publishWebProjects: true
        arguments: '--configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)'
        zipAfterPublish: true
    
    - task: PublishBuildArtifacts@1
      displayName: 'Publish Artifact'
      inputs:
        PathtoPublish: '$(Build.ArtifactStagingDirectory)'
        ArtifactName: '$(projectName)'
        publishLocation: 'Container'

- stage: DeployDev
  displayName: 'Deploy to Dev'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'))
  jobs:
  - deployment: DeployDev
    environment: 'Development'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureRmWebAppDeployment@4
            inputs:
              ConnectionType: 'AzureRM'
              azureSubscription: 'AzureServiceConnection'
              appType: 'webApp'
              WebAppName: '$(projectName)-dev'
              packageForLinux: '$(Pipeline.Workspace)/$(projectName)/*.zip'
              enableCustomDeployment: true
              DeploymentType: 'webDeploy'
              TakeAppOfflineFlag: true

- stage: DeployProd
  displayName: 'Deploy to Production'
  dependsOn: Build
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
  jobs:
  - deployment: DeployProd
    environment: 'Production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureRmWebAppDeployment@4
            inputs:
              ConnectionType: 'AzureRM'
              azureSubscription: 'AzureServiceConnection'
              appType: 'webApp'
              WebAppName: '$(projectName)'
              packageForLinux: '$(Pipeline.Workspace)/$(projectName)/*.zip'
              enableCustomDeployment: true
              DeploymentType: 'webDeploy'
              TakeAppOfflineFlag: true
```

## CircleCI Konfigurationsbeispiel

```yaml
version: 2.1

orbs:
  node: circleci/node@5.0.0
  docker: circleci/docker@2.1.0
  aws-cli: circleci/aws-cli@3.1.1

jobs:
  build:
    docker:
      - image: cimg/node:16.14
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: npm
      - run:
          name: Build application
          command: npm run build
      - persist_to_workspace:
          root: .
          paths:
            - dist
            - node_modules
            - package.json
            - package-lock.json
  
  test:
    docker:
      - image: cimg/node:16.14
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run:
          name: Run tests
          command: npm test
      - store_test_results:
          path: ./test-results

  lint:
    docker:
      - image: cimg/node:16.14
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run:
          name: Run linting
          command: npm run lint

  docker-build:
    docker:
      - image: cimg/node:16.14
    steps:
      - checkout
      - attach_workspace:
          at: .
      - setup_remote_docker:
          version: 20.10.14
      - docker/check:
          docker-username: DOCKER_USERNAME
          docker-password: DOCKER_PASSWORD
      - docker/build:
          image: $DOCKER_USERNAME/myapp
          tag: ${CIRCLE_SHA1},latest
      - docker/push:
          image: $DOCKER_USERNAME/myapp
          tag: ${CIRCLE_SHA1},latest

  deploy-staging:
    docker:
      - image: cimg/python:3.9
    steps:
      - checkout
      - aws-cli/setup:
          profile-name: default
      - run:
          name: Deploy to ECS Staging
          command: |
            aws ecs update-service --cluster staging-cluster \
              --service myapp-service \
              --force-new-deployment \
              --region ${AWS_REGION}

  deploy-production:
    docker:
      - image: cimg/python:3.9
    steps:
      - checkout
      - aws-cli/setup:
          profile-name: default
      - run:
          name: Deploy to ECS Production
          command: |
            aws ecs update-service --cluster production-cluster \
              --service myapp-service \
              --force-new-deployment \
              --region ${AWS_REGION}

workflows:
  version: 2
  build-test-deploy:
    jobs:
      - build
      - test:
          requires:
            - build
      - lint:
          requires:
            - build
      - docker-build:
          requires:
            - test
            - lint
          filters:
            branches:
              only:
                - develop
                - main
      - deploy-staging:
          requires:
            - docker-build
          filters:
            branches:
              only: develop
      - approve-production:
          type: approval
          requires:
            - docker-build
          filters:
            branches:
              only: main
      - deploy-production:
          requires:
            - approve-production
          filters:
            branches:
              only: main
```