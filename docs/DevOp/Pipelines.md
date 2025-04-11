# Pipelines

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