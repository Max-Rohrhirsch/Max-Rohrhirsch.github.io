# DevSecOps

## Einführung

DevSecOps integriert Sicherheit als zentralen Bestandteil in den DevOps-Prozess ("Security as Code"). Statt Sicherheit als nachgelagertes Thema zu behandeln, wird sie von Anfang an in den Software-Entwicklungslebenszyklus eingebunden.

### Die drei Säulen von DevSecOps

1. **Menschen**: Kultur, Zusammenarbeit und geteilte Verantwortung
2. **Prozesse**: Automatisierung, kontinuierliche Integration und kontinuierliches Feedback
3. **Technologie**: Tools zur Integration von Sicherheit in CI/CD-Pipelines

## DevSecOps vs. traditionelle Sicherheitsmodelle

| Traditionelle Sicherheit | DevSecOps |
|--------------------------|-----------|
| Am Ende des Entwicklungsprozesses | Integriert in jede Phase des Entwicklungsprozesses |
| Sicherheitsteam als "Torwächter" | Gemeinsame Verantwortung aller Beteiligten |
| Manuelle Sicherheitsprüfungen | Automatisierte Sicherheitstests |
| Lange Feedback-Zyklen | Sofortiges Feedback |
| Blockiert Releases | Ermöglicht sichere Releases |
| Reaktiv | Proaktiv |

## Sicherheitsmaßnahmen im DevOps-Zyklus

### 1. Planung und Design

- **Threat Modeling** - Systematische Identifikation potenzieller Bedrohungen
- **Security User Stories** - Sicherheitsanforderungen als User Stories
- **Secure Design Patterns** - Bewährte Muster für sicheren Code

#### Beispiel für eine Security User Story
```
Als Administrator
möchte ich, dass fehlgeschlagene Anmeldeversuche protokolliert werden,
damit ich potenzielle Brute-Force-Angriffe erkennen kann.
```

#### STRIDE-Modell für Threat Modeling

| Bedrohungstyp | Beschreibung | Sicherheitseigenschaft |
|---------------|-------------|------------------------|
| **S**poofing | Sich als jemand anderes ausgeben | Authentifizierung |
| **T**ampering | Unbefugte Änderung von Daten | Integrität |
| **R**epudiation | Leugnen einer Handlung | Nicht-Abstreitbarkeit |
| **I**nformation Disclosure | Unbeabsichtigte Informationsfreigabe | Vertraulichkeit |
| **D**enial of Service | System unbenutzbar machen | Verfügbarkeit |
| **E**levation of Privilege | Unberechtigter Zugriff | Autorisierung |

### 2. Code-Entwicklung

- **Sichere Coding-Standards** - Bewährte Praktiken für sicheren Code
- **Code-Reviews** mit Sicherheitsfokus
- **SAST (Static Application Security Testing)** - Statische Code-Analyse

#### OWASP Top 10 (2021)
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

#### Beispiel für SonarQube-Konfiguration
```yaml
# sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.sources=src
sonar.tests=test
sonar.exclusions=node_modules/**/*
sonar.sourceEncoding=UTF-8

# Sicherheitsregeln aktivieren
sonar.security.respecsEnabled=true
```

#### Beispiel für ESLint-Regeln zur Sicherheit (JavaScript)
```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  plugins: [
    'security'
  ],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
  }
};
```

### 3. Continuous Integration

- **Dependency Scanning** - Überprüfung von Abhängigkeiten auf Schwachstellen
- **Secrets Detection** - Erkennung von ungeschützten Geheimnissen im Code
- **SAST Integration** in CI/CD-Pipelines

#### Beispiel für GitHub Actions mit Sicherheits-Checks
```yaml
# .github/workflows/security.yml
name: Security Checks

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run ESLint with Security plugin
      run: npm run lint
      
    - name: SAST scan with SonarCloud
      uses: sonarsource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        
    - name: Run Dependency Audit
      run: npm audit --audit-level=moderate
    
    - name: Check for secrets
      uses: zricethezav/gitleaks-action@master
```

#### Beispiel für Dependency-Check in GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - security

dependency_scanning:
  stage: security
  image: owasp/dependency-check:latest
  script:
    - mkdir -p /tmp/dependency-check-data
    - dependency-check --project "My Project" --scan . --out . --format "ALL"
  artifacts:
    paths:
      - dependency-check-report.html
  allow_failure: true
```

### 4. Continuous Deployment

- **Container-Scanning** - Überprüfung von Container-Images auf Schwachstellen
- **Infrastructure as Code Security** - Sicherheitsüberprüfungen für IaC
- **Compliance as Code** - Automatisierte Compliance-Checks

#### Beispiel für Container-Scanning mit Trivy
```yaml
# .github/workflows/container-scan.yml
name: Container Scan

on:
  push:
    branches: [ main ]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Scan with Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:${{ github.sha }}'
          format: 'table'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'
```

#### Beispiel für Terraform-Sicherheitsprüfung mit Checkov
```yaml
# .github/workflows/iac-security.yml
name: IaC Security

on:
  push:
    paths:
      - '**.tf'

jobs:
  checkov-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Checkov
        uses: bridgecrewio/checkov-action@master
        with:
          directory: ./terraform
          framework: terraform
          output_format: cli
          soft_fail: false
```

### 5. Betrieb und Monitoring

- **Runtime Application Self-Protection (RASP)**
- **Security Information and Event Management (SIEM)**
- **Vulnerability Management**
- **Incident Response**

#### Beispiel für Prometheus Alert bei Sicherheitsereignissen
```yaml
# prometheus-alerts.yaml
groups:
- name: security_alerts
  rules:
  - alert: HighFailedLoginAttempts
    expr: sum(increase(failed_login_attempts_total[5m])) by (job) > 10
    for: 2m
    labels:
      severity: high
    annotations:
      summary: "High number of failed login attempts"
      description: "Job {{ $labels.job }} has seen {{ $value }} failed login attempts in the last 5 minutes."
```

#### ELK Stack für Sicherheitsmonitoring
```yaml
# logstash-security.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [log][level] == "ERROR" and [message] =~ "authentication failure" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} authentication failure for user %{USERNAME:username} from %{IP:source_ip}" }
    }
    geoip {
      source => "source_ip"
    }
  }
}

output {
  if [log][level] == "ERROR" and [message] =~ "authentication failure" {
    elasticsearch {
      hosts => ["elasticsearch:9200"]
      index => "security-events-%{+YYYY.MM.dd}"
    }
  }
}
```

## DevSecOps-Tools und -Technologien

### Static Application Security Testing (SAST)
- **SonarQube** - Codequalität und Sicherheitsanalyse
- **Checkmarx** - Statische Codeanalyse
- **Fortify** - Erkennung von Sicherheitslücken im Code
- **SpotBugs** - Bugfinder für Java
- **Brakeman** - Sicherheitsanalyse für Ruby on Rails

### Dynamic Application Security Testing (DAST)
- **OWASP ZAP** - Web-Anwendungs-Scanner
- **Burp Suite** - Web-Sicherheitstests
- **Netsparker** - Automatisierte Schwachstellenerkennung
- **Acunetix** - Web-Anwendungssicherheitstests

### Software Composition Analysis (SCA)
- **Snyk** - Abhängigkeitscheck und Fix
- **OWASP Dependency-Check** - Erkennung bekannter Schwachstellen
- **WhiteSource** - Open-Source-Sicherheitsmanagement
- **Black Duck** - Verwaltung und Sicherheit von Open-Source-Software

### Container Security
- **Trivy** - Container-Image-Scanner
- **Clair** - Container-Schwachstellenanalyse
- **Anchore** - Container-Compliance und -Sicherheit
- **Aqua Security** - Umfassende Container-Sicherheit

### Infrastructure as Code (IaC) Security
- **Checkov** - Statische Analyse für Terraform, CloudFormation, etc.
- **TFsec** - Sicherheitsscanner für Terraform
- **Terrascan** - Sicherheitsschwachstellen in IaC erkennen
- **CloudSploit** - Cloud-Sicherheits-Scanner

### Secrets Management
- **HashiCorp Vault** - Secrets-Management-Tool
- **AWS Secrets Manager** - Secrets-Verwaltung in AWS
- **Azure Key Vault** - Schlüssel-, Zertifikat- und Geheimnisverwaltung
- **GitGuardian** - Geheimnisse im Code erkennen
- **git-secrets** - Verhindert die Übertragung sensibler Daten

### Compliance as Code
- **InSpec** - Compliance-Tests für Infrastruktur
- **Open Policy Agent (OPA)** - Policy-basierte Kontrollen
- **Chef Compliance** - Automatisierte Compliance-Scans
- **AWS Config** - Compliance-Überwachung und -Management

## DevSecOps-Best-Practices

### 1. Sicherheit von Anfang an einbeziehen

- Threat Modeling früh im Entwicklungsprozess durchführen
- Sicherheitsanforderungen in User Stories integrieren
- Security Champions in Entwicklungsteams ernennen

### 2. Automatisierte Sicherheitstests implementieren

```bash
# Beispiel für ein Pre-commit-Hook mit Sicherheitsüberprüfungen
#!/bin/bash

# Statische Codeanalyse
npm run lint || exit 1

# Secrets-Scanner
git secrets --scan || exit 1

# Dependency-Check
npm audit --audit-level=high || exit 1
```

### 3. Sichere Entwicklungsumgebungen verwenden

- Entwickler-Workstations härten
- Sichere CI/CD-Systeme konfigurieren
- Least-Privilege-Prinzip durchsetzen

### 4. Sicheres Dependency-Management

```bash
# npm-Pakete auf Sicherheitslücken überprüfen
npm audit
npm audit fix

# Python-Pakete prüfen
pip-audit
```

### 5. Container-Sicherheit verbessern

```dockerfile
# Dockerfile mit Sicherheitsverbesserungen
FROM alpine:3.14 AS builder

# Sichere Build-Phase
WORKDIR /app
COPY . .
RUN apk add --no-cache nodejs npm && \
    npm ci && \
    npm run build

# Minimales Produktions-Image
FROM alpine:3.14
RUN apk add --no-cache nodejs && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /app/dist /app
USER appuser

ENTRYPOINT ["node", "server.js"]
```

### 6. Infrastruktur als Code (IaC) absichern

```hcl
# Terraform mit Sicherheitskontrollen
resource "aws_s3_bucket" "data" {
  bucket = "example-data-bucket"
  
  # Sichere Konfiguration
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  
  # Öffentlichen Zugriff blockieren
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

### 7. Kontinuierliches Sicherheitsmonitoring

- Security Information and Event Management (SIEM) einrichten
- Anpassbare Dashboards für Sicherheitsmetriken erstellen
- Automatische Alerts für Sicherheitsereignisse konfigurieren

### 8. Incident Response automatisieren

```yaml
# Automatische Reaktion auf verdächtige Aktivitäten
- name: Block IP address after multiple failed login attempts
  hosts: web_servers
  tasks:
    - name: Check auth.log for failed SSH attempts
      shell: grep "Failed password" /var/log/auth.log | grep -c "{{ suspicious_ip }}"
      register: failed_attempts
      
    - name: Add IP to iptables drop list
      iptables:
        chain: INPUT
        source: "{{ suspicious_ip }}"
        jump: DROP
      when: failed_attempts.stdout|int > 5
      become: yes
```

### 9. Sicherheits-Schulungen durchführen

- Regelmäßige Awareness-Trainings für alle Teammitglieder
- Spezielle Schulungen für Entwickler zu sicherem Programmieren
- Red Team vs. Blue Team Übungen

### 10. Vertrauen, aber verifizieren

- Zero-Trust-Architektur implementieren
- Regelmäßige Penetrationstests durchführen
- Bug-Bounty-Programme einrichten

## DevSecOps-Metriken

| Metrik | Beschreibung | Ziel |
|--------|-------------|------|
| Durchschnittliche Zeit zur Behebung von Sicherheitslücken | Wie lange dauert es, eine entdeckte Schwachstelle zu beheben? | Kürzer = besser |
| Anzahl kritischer Schwachstellen in Produktion | Anzahl der bekannten kritischen Schwachstellen im Produktionscode | Niedriger = besser |
| Sicherheits-Schuldenquote | Verhältnis von offenen zu geschlossenen Sicherheitsproblemen | Niedriger = besser |
| Sicherheits-Test-Abdeckung | Prozentsatz des Codes, der durch Sicherheitstests abgedeckt wird | Höher = besser |
| Failed Security Build Rate | Prozentsatz der Builds, die aufgrund von Sicherheitsproblemen fehlschlagen | Ausgewogen (zu hoch/niedrig kann problematisch sein) |
| Mean Time to Detect (MTTD) | Durchschnittliche Zeit zur Erkennung einer Sicherheitsverletzung | Kürzer = besser |
| Mean Time to Respond (MTTR) | Durchschnittliche Zeit zur Reaktion auf eine Sicherheitsverletzung | Kürzer = besser |

## DevSecOps-Reifegradmodell

### Level 1: Initial
- Ad-hoc-Sicherheitsmaßnahmen
- Manuelle Sicherheitstests
- Keine klare Verantwortlichkeit für Sicherheit

### Level 2: Integriert
- Grundlegende Sicherheitsautomatisierung
- Sicherheitstests in CI/CD-Pipeline integriert
- Begrenzte Zusammenarbeit zwischen Entwicklungs- und Sicherheitsteams

### Level 3: Fortgeschritten
- Umfassende Automatisierung der Sicherheitstests
- Shift-Left-Ansatz für Sicherheit
- Sichere Entwicklungspraktiken etabliert

### Level 4: Proaktiv
- Proaktive Identifikation von Sicherheitsrisiken
- Automatische Reaktion auf Sicherheitsereignisse
- Sicherheitskultur im gesamten Unternehmen

### Level 5: Optimiert
- Kontinuierliche Verbesserung der Sicherheitsprozesse
- Innovative Sicherheitslösungen
- Aktive Beteiligung an der Sicherheits-Community

## Herausforderungen bei der DevSecOps-Implementierung

1. **Kulturwandel**
   - Überwindung von Silodenken
   - Aufbau einer Kultur der gemeinsamen Verantwortung für Sicherheit

2. **Technische Schulden**
   - Bestehende Sicherheitslücken in Legacy-Systemen
   - Schwierigkeiten bei der Nachrüstung von Sicherheit

3. **Tool-Überflutung**
   - Zu viele Sicherheitstools ohne Integration
   - Schwierigkeiten bei der Auswahl der richtigen Tools

4. **Fehlende Fachkenntnisse**
   - Mangel an DevSecOps-Spezialisten
   - Lernkurve für Entwickler und Operations

5. **Compliance-Anforderungen**
   - Komplexe regulatorische Anforderungen
   - Nachweis der Einhaltung von Sicherheitsstandards

## Zukunftstrends in DevSecOps

1. **KI/ML für Sicherheit**
   - Automatisierte Erkennung von Mustern in Sicherheitsdaten
   - Vorhersage von Sicherheitsrisiken

2. **Serverless Security**
   - Sicherheit für Function-as-a-Service (FaaS)
   - Event-basierte Sicherheitslösungen

3. **Supply Chain Security**
   - Sicherheit von Drittanbieter-Komponenten
   - Software Bill of Materials (SBOM)

4. **Zero Trust Security**
   - Kontinuierliche Authentifizierung und Autorisierung
   - Micro-Segmentierung von Netzwerken

5. **Security Chaos Engineering**
   - Absichtliches Einführen von Sicherheitsfehlern
   - Testen der Widerstandsfähigkeit gegen Angriffe
