# CI/CD - Continuous Integration / Continuous Delivery

## Einführung

CI/CD steht für **Continuous Integration** und **Continuous Delivery/Deployment** und beschreibt eine Methode zur häufigen Auslieferung von Anwendungen durch den Einsatz von Automatisierung in den Phasen der Anwendungsentwicklung.

### Continuous Integration (CI)
- Automatisches Zusammenführen von Code-Änderungen
- Automatisierte Tests
- Früherkennung von Fehlern und Problemen

### Continuous Delivery (CD)
- Automatisierte Bereitstellung in einer Testumgebung
- Manuelle Freigabe für die Produktion

### Continuous Deployment
- Vollständig automatisierter Release-Prozess
- Änderungen gehen automatisch in die Produktion

## CI/CD-Prozess

```
Code Push → Build → Test → Deploy (Staging) → [Manuelle Freigabe] → Deploy (Production)
```

## Wichtige CI/CD-Plattformen

### Self-Hosted

| Name | Beschreibung | Vorteile | Nachteile |
|------|-------------|----------|-----------|
| Jenkins | Open-Source-Automatisierungsserver | Hochgradig anpassbar, große Plugin-Bibliothek | Hoher Wartungsaufwand, Lernkurve |
| GitLab CI/CD | Teil der GitLab-Plattform | Tiefe Integration mit GitLab | Ressourcenintensiv |
| TeamCity | CI/CD-Server von JetBrains | Benutzerfreundlich, gute Java-Integration | Kostenintensiv für größere Teams |

### Cloud-basiert

| Name | Beschreibung | Vorteile | Nachteile |
|------|-------------|----------|-----------|
| GitHub Actions | CI/CD in GitHub integriert | Direkte GitHub-Integration, einfach zu nutzen | Begrenzte kostenlose Nutzung |
| CircleCI | Cloud-basierte CI/CD-Plattform | Schnell, parallele Jobs | Kostenmodell kann teuer werden |
| Azure DevOps | Microsoft's DevOps-Lösung | Umfassende Features, Azure-Integration | Komplexes Interface |
| Travis CI | CI-Dienst für Open-Source-Projekte | Einfach zu konfigurieren | Begrenzt für komplexe Workflows |
| AWS CodePipeline | AWS CI/CD-Service | Integration mit AWS-Services | Nur für AWS-Cloud sinnvoll |

## CI/CD Best Practices

### Pipeline-Design

1. **Schnelles Feedback**: Tests sollten so früh wie möglich in der Pipeline ausgeführt werden.
2. **Parallele Ausführung**: Unabhängige Schritte sollten parallel ausgeführt werden.
3. **Idempotenz**: Pipeline-Schritte sollten bei mehrmaliger Ausführung das gleiche Ergebnis liefern.
4. **Fehlerbehandlung**: Klare Fehlerberichte und Rollback-Mechanismen einrichten.

### Automatisierte Tests

```
Unit Tests → Integration Tests → Komponententests → End-to-End-Tests
```

| Testart | Umfang | Ausführungsgeschwindigkeit | Wartungsaufwand |
|---------|--------|---------------------------|----------------|
| Unit Tests | Einzelne Funktionen/Klassen | Sehr schnell | Gering |
| Integration Tests | Zusammenspiel mehrerer Komponenten | Mittel | Mittel |
| Komponententests | Vollständige Komponenten | Langsam | Hoch |
| End-to-End Tests | Gesamtes System | Sehr langsam | Sehr hoch |

### Umgebungsmanagement

```
Entwicklung → Test → Staging → Produktion
```

- **Entwicklung**: Schnelle Iteration und Experimentieren
- **Test**: Formale Tests und Qualitätssicherung
- **Staging**: Produktionsähnliche Umgebung für Vorab-Tests
- **Produktion**: Live-System für Endbenutzer

### Infrastructure as Code (IaC)

- Infrastruktur in deklarativen Konfigurationsdateien definieren
- Versioniert und nachvollziehbar
- Ermöglicht reproduzierbare Umgebungen

**Beliebte IaC-Tools:**
- Terraform
- AWS CloudFormation
- Ansible
- Puppet
- Chef

### Sicherheit in CI/CD (DevSecOps)

- **Secrets Management**: Keine Passwörter oder Zugriffsschlüssel im Code
- **Sicherheitsscans**: SAST (Static Application Security Testing) und DAST (Dynamic Application Security Testing)
- **Container-Scanning**: Auf Schwachstellen und Konfigurationsprobleme prüfen
- **Compliance-Prüfungen**: Automatisierte Policy-Überprüfungen

## CI/CD Metriken und KPIs

| Metrik | Beschreibung | Ziel |
|--------|-------------|------|
| Deployment-Häufigkeit | Wie oft wird in die Produktion deployed? | Höher = besser |
| Lead Time | Zeit vom Commit bis zum erfolgreichen Deployment | Kürzer = besser |
| Fehlerrate | Prozentsatz fehlgeschlagener Deployments | Niedriger = besser |
| Mean Time to Recovery (MTTR) | Durchschnittliche Zeit zur Fehlerbehebung | Kürzer = besser |
| Test-Abdeckung | Prozentsatz des Codes, der durch Tests abgedeckt wird | Höher = besser |

## Jenkins Pipeline-Beispiel

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'npm audit'
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh './deploy.sh staging'
            }
        }
        
        stage('Integration Tests') {
            when {
                branch 'develop'
            }
            steps {
                sh 'npm run test:integration'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?'
                sh './deploy.sh production'
            }
        }
    }
    
    post {
        always {
            junit '**/test-results.xml'
            cleanWs()
        }
        success {
            slackSend channel: '#ci', color: 'good', message: "Build Successful: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
        }
        failure {
            slackSend channel: '#ci', color: 'danger', message: "Build Failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
        }
    }
}
```

## GitLab CI/CD-Beispiel

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_ENV: test

cache:
  paths:
    - node_modules/

build:
  stage: build
  image: node:16
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

unit_test:
  stage: test
  image: node:16
  script:
    - npm ci
    - npm run test:unit
  artifacts:
    reports:
      junit: junit.xml

lint:
  stage: test
  image: node:16
  script:
    - npm ci
    - npm run lint

security:
  stage: test
  image: node:16
  script:
    - npm ci
    - npm audit --production

deploy_staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  script:
    - ssh user@staging-server "cd /var/www/app && git pull && npm ci && npm run build && pm2 restart app"
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  script:
    - ssh user@production-server "cd /var/www/app && git pull && npm ci && npm run build && pm2 restart app"
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

## GitHub Actions-Beispiel

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
  
  test:
    needs: build
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
      
    - name: Run security check
      run: npm audit --audit-level=high
  
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/
    
    - name: Deploy to Staging
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USERNAME }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        script: |
          cd /var/www/app
          rm -rf dist/
          mkdir -p dist/
  
    - name: Copy files to staging
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USERNAME }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        source: "dist/"
        target: "/var/www/app/"
        
    - name: Restart application
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.STAGING_HOST }}
        username: ${{ secrets.STAGING_USERNAME }}
        key: ${{ secrets.STAGING_SSH_KEY }}
        script: pm2 restart app
  
  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/
    
    - name: Deploy to Production
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.PRODUCTION_HOST }}
        username: ${{ secrets.PRODUCTION_USERNAME }}
        key: ${{ secrets.PRODUCTION_SSH_KEY }}
        script: |
          cd /var/www/app
          rm -rf dist/
          mkdir -p dist/
  
    - name: Copy files to production
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.PRODUCTION_HOST }}
        username: ${{ secrets.PRODUCTION_USERNAME }}
        key: ${{ secrets.PRODUCTION_SSH_KEY }}
        source: "dist/"
        target: "/var/www/app/"
        
    - name: Restart application
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.PRODUCTION_HOST }}
        username: ${{ secrets.PRODUCTION_USERNAME }}
        key: ${{ secrets.PRODUCTION_SSH_KEY }}
        script: pm2 restart app
```

## Tools für CI/CD-Monitoring

- **Prometheus**: Metriken und Alerts
- **Grafana**: Visualisierung und Dashboards
- **ELK Stack** (Elasticsearch, Logstash, Kibana): Log-Aggregation und -Analyse
- **DataDog**: Umfassendes Monitoring und Observability
- **New Relic**: Application Performance Monitoring

## Continuous Deployment vs. Continuous Delivery vs. Feature Flags

### Continuous Delivery
- Code ist immer bereit für den Release
- Manueller Freigabeprozess

### Continuous Deployment
- Automatische Bereitstellung in der Produktion
- Kein manueller Eingriff erforderlich

### Feature Flags
```javascript
// Beispiel für Feature Flags
if (featureFlags.isEnabled('new-payment-process', user)) {
    // Neuer Zahlungsprozess
    newPaymentProcess();
} else {
    // Alter Zahlungsprozess
    oldPaymentProcess();
}
```

- Teilweise Aktivierung neuer Features
- A/B-Tests
- Schnelles Zurückrollen bei Problemen
- Schrittweise Einführung

## Migration zu CI/CD

### Schritte für die Einführung

1. **Automatisierte Tests einführen**
   - Unit-Tests für neue und kritische Codeteile
   - Test-Coverage schrittweise erhöhen

2. **Build-Automatisierung implementieren**
   - Konsistente Build-Umgebung schaffen
   - Build-Skripte erstellen

3. **Einfache CI-Pipeline einrichten**
   - Build- und Test-Automatisierung
   - Regelmäßige Ausführung

4. **Deployment-Prozess automatisieren**
   - Für Testumgebungen beginnen
   - Skripte für konsistente Deployments erstellen

5. **Monitoring und Feedback verbessern**
   - Post-Deployment-Tests
   - Logging und Metriken

6. **Schrittweise zu Continuous Deployment übergehen**
   - Feature Flags einführen
   - Rollback-Strategien implementieren

### Häufige Herausforderungen

- **Fehlende Testabdeckung**: Schwierig, bei Legacy-Code mit CI/CD zu beginnen
- **Kultureller Widerstand**: Änderung von Arbeitsweisen und Verantwortlichkeiten
- **Tool-Überflutung**: Zu viele Tools ohne klare Integration
- **Langsame Feedback-Schleifen**: Tests, die zu lange dauern
- **Instabile Tests**: Flaky Tests untergraben das Vertrauen in CI/CD
