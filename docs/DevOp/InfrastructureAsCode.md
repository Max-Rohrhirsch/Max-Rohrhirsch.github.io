# Infrastructure as Code (IaC)

## Einführung

Infrastructure as Code (IaC) ist eine DevOps-Praxis, bei der Infrastruktur durch maschinenlesbare Definitionsdateien verwaltet und bereitgestellt wird, anstatt durch manuelle Prozesse. IaC behandelt diese Konfigurationsdateien ähnlich wie Softwarecode.

**Vorteile:**
- **Konsistenz:** Eliminiert Abweichungen zwischen Umgebungen
- **Wiederholbarkeit:** Identische Infrastruktur bei jeder Bereitstellung
- **Skalierbarkeit:** Einfache Skalierung durch Konfigurationsänderungen
- **Versionierung:** Infrastrukturänderungen können wie Code versioniert werden
- **Effizienz:** Automatisierung reduziert manuelle Eingriffe

## Wichtige IaC-Tools

### Terraform

Terraform ist ein Open-Source-Tool zur Beschreibung und Bereitstellung von Infrastruktur über Code.

#### Grundlegende Konzepte
- **Provider:** Schnittstellen zu verschiedenen Plattformen (AWS, Azure, GCP, etc.)
- **Resources:** Die zu erstellenden Infrastrukturkomponenten
- **State:** Zustand der verwalteten Infrastruktur
- **Modules:** Wiederverwendbare Konfigurationskomponenten

Für Azure installiere arurerm und `az login --use-device-code`.

Für Rasberry Pi Setup nutze lieber Ansible.

#### Beispiel: Azure-Infrastruktur

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  use_azure_cli = true
}

resource "azurerm_resource_group" "hello" {
  name     = "rg-hello-world"
  location = "westeurope"
}
```

#### Terraform-Workflow

```bash
# Initialisierung (Provider herunterladen, etc.)
terraform init

# Konfiguration überprüfen und Ausführungsplan erstellen
terraform plan

# Infrastruktur erstellen/aktualisieren
terraform apply

# Infrastruktur entfernen
terraform destroy
```

#### Modulare Terraform-Struktur

```
projekt/
├── main.tf          # Hauptkonfiguration
├── variables.tf     # Eingabevariablen
├── outputs.tf       # Ausgabevariablen
├── modules/
│   ├── networking/  # Netzwerk-Modul
│   ├── compute/     # Compute-Modul
│   └── database/    # Datenbank-Modul
└── environments/
    ├── dev/         # Entwicklungsumgebung
    ├── staging/     # Testumgebung
    └── prod/        # Produktionsumgebung
```

### AWS CloudFormation

CloudFormation ist der native IaC-Service von AWS, der die Erstellung und Verwaltung von AWS-Ressourcen ermöglicht.

#### Beispiel: CloudFormation-Template

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple EC2 instance with VPC'

Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: MyVPC

  MySubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      Tags:
        - Key: Name
          Value: MySubnet

  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t2.micro
      ImageId: ami-0c55b159cbfafe1f0
      SubnetId: !Ref MySubnet
      Tags:
        - Key: Name
          Value: MyInstance

Outputs:
  InstanceId:
    Description: The ID of the EC2 instance
    Value: !Ref MyInstance
```

#### CloudFormation-Workflow

```bash
# Stack erstellen
aws cloudformation create-stack --stack-name mystack --template-body file://template.yaml

# Stack aktualisieren
aws cloudformation update-stack --stack-name mystack --template-body file://template.yaml

# Stack-Status prüfen
aws cloudformation describe-stacks --stack-name mystack

# Stack löschen
aws cloudformation delete-stack --stack-name mystack
```

### Ansible

Ansible ist ein agentenloser Automatisierungstool, das für Konfigurationsmanagement, Anwendungsbereitstellung und Aufgabenausführung verwendet wird.

#### Grundlegende Konzepte
- **Inventar:** Liste der zu verwaltenden Hosts
- **Playbooks:** YAML-Dateien mit Anweisungen zur Automatisierung
- **Rollen:** Wiederverwendbare Konfigurationseinheiten
- **Module:** Einzelne Funktionen zur Verwaltung bestimmter Ressourcenarten

#### Beispiel: Ansible-Inventar

```ini
# inventory.ini
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com

[all:vars]
ansible_user=admin
```

#### Beispiel: Ansible-Playbook

```yaml
---
# webserver.yml
- name: Webserver Setup
  hosts: webservers
  become: true
  
  vars:
    http_port: 80
    
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present
        update_cache: yes
        
    - name: Start Nginx Service
      service:
        name: nginx
        state: started
        enabled: yes
        
    - name: Copy Website Content
      copy:
        src: files/index.html
        dest: /var/www/html/
        owner: www-data
        group: www-data
        mode: '0644'
```

#### Ansible-Workflow

```bash
# Playbook ausführen
ansible-playbook -i inventory.ini webserver.yml

# Ad-hoc-Befehl ausführen
ansible webservers -i inventory.ini -m ping

# Rollen installieren
ansible-galaxy install geerlingguy.nginx
```

### Puppet

Puppet ist ein Konfigurationsmanagement-Tool, das die gewünschte Systemkonfiguration deklarativ beschreibt.

#### Beispiel: Puppet-Manifest

```puppet
# webserver.pp
class webserver {
  package { 'nginx':
    ensure => installed,
  }
  
  service { 'nginx':
    ensure  => running,
    enable  => true,
    require => Package['nginx'],
  }
  
  file { '/var/www/html/index.html':
    ensure  => file,
    content => '<html><body><h1>Hello, World!</h1></body></html>',
    owner   => 'www-data',
    group   => 'www-data',
    mode    => '0644',
    require => Package['nginx'],
    notify  => Service['nginx'],
  }
}

node 'web1.example.com', 'web2.example.com' {
  include webserver
}
```

### Chef

Chef ist eine leistungsstarke Automatisierungsplattform, die komplexe Infrastrukturen in Code umwandelt.

#### Beispiel: Chef-Kochbuch (Cookbook)

```ruby
# cookbooks/nginx/recipes/default.rb
package 'nginx' do
  action :install
end

service 'nginx' do
  action [ :enable, :start ]
end

template '/var/www/html/index.html' do
  source 'index.html.erb'
  owner 'www-data'
  group 'www-data'
  mode '0644'
  notifies :reload, 'service[nginx]'
end
```

## Kubernetes und IaC

### Kubernetes-Manifeste

Kubernetes-Ressourcen können als deklarative YAML-Dateien definiert werden.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
```

### Helm Charts

Helm ist ein Paketmanager für Kubernetes, der es ermöglicht, komplexe Anwendungen zu definieren, zu installieren und zu aktualisieren.

#### Beispiel: Helm-Chart-Struktur

```
mychart/
├── Chart.yaml          # Metadaten
├── values.yaml         # Standardkonfiguration
├── templates/
│   ├── deployment.yaml # Kubernetes-Manifeste
│   ├── service.yaml
│   └── ingress.yaml
└── charts/             # Abhängige Charts
```

#### Beispiel: Helm-Template mit Variablen

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-deployment
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        ports:
        - containerPort: {{ .Values.service.port }}
```

#### Helm-Workflow

```bash
# Chart erstellen
helm create mychart

# Chart installieren
helm install myrelease ./mychart

# Chart aktualisieren
helm upgrade myrelease ./mychart

# Chart entfernen
helm uninstall myrelease
```

## IaC Best Practices

### 1. Versionskontrolle

Alle IaC-Dateien sollten in einem Versionskontrollsystem wie Git verwaltet werden, um:
- Änderungsverlauf zu verfolgen
- Kollaboration zu ermöglichen
- Rollbacks durchzuführen
- Audits zu unterstützen

```bash
# Git-Beispiel
git init
git add terraform/
git commit -m "Initial infrastructure setup"
```

### 2. Modularisierung

Code sollte in wiederverwendbare Module aufgeteilt werden.

```hcl
# Terraform-Modul-Beispiel
module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
}

module "ec2" {
  source = "./modules/ec2"
  subnet_id = module.vpc.subnet_id
}
```

### 3. Umgebungstrennung

Separate Konfigurationen für Entwicklung, Test und Produktion verwenden.

```
environments/
├── dev/
│   └── main.tf    # Dev-spezifische Parameter
├── staging/
│   └── main.tf    # Staging-spezifische Parameter
└── prod/
    └── main.tf    # Prod-spezifische Parameter
```

### 4. Secrets-Management

Keine sensiblen Daten im Code speichern.

```hcl
# Terraform mit Vault
data "vault_generic_secret" "db_credentials" {
  path = "secret/database"
}

resource "aws_db_instance" "default" {
  username = data.vault_generic_secret.db_credentials.data["username"]
  password = data.vault_generic_secret.db_credentials.data["password"]
}
```

### 5. Automatisierte Tests

IaC-Code sollte getestet werden, bevor er angewendet wird.

#### Terraform-Tests mit Terratest

```go
package test

import (
	"testing"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/stretchr/testify/assert"
)

func TestTerraformDeployment(t *testing.T) {
	terraformOptions := &terraform.Options{
		TerraformDir: "../",
		VarFiles:     []string{"test.tfvars"},
	}
	
	defer terraform.Destroy(t, terraformOptions)
	terraform.InitAndApply(t, terraformOptions)
	
	vpcID := terraform.Output(t, terraformOptions, "vpc_id")
	assert.NotEmpty(t, vpcID, "VPC ID should not be empty")
}
```

### 6. Drift-Erkennung

Regelmäßige Überprüfung, ob der tatsächliche Zustand vom definierten Zustand abweicht.

```bash
# Terraform-Drift-Erkennung
terraform plan -detailed-exitcode
```

### 7. Idempotenz

Wiederholte Anwendung der Konfiguration sollte zum gleichen Ergebnis führen.

```hcl
# Terraform-Beispiel für idempotente Ressource
resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

## Multi-Cloud und Hybrid-Cloud mit IaC

### Terraform für Multi-Cloud

```hcl
# AWS-Provider
provider "aws" {
  region = "eu-west-1"
}

# Azure-Provider
provider "azurerm" {
  features {}
}

# AWS-Ressource
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}

# Azure-Ressource
resource "azurerm_virtual_machine" "vm" {
  name                  = "my-vm"
  location              = "West Europe"
  resource_group_name   = azurerm_resource_group.main.name
  network_interface_ids = [azurerm_network_interface.main.id]
  vm_size               = "Standard_DS1_v2"
  
  storage_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
  
  os_disk {
    name              = "myosdisk1"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }
}
```

## GitOps für IaC

GitOps ist ein Ansatz zur kontinuierlichen Bereitstellung, bei dem Git als einzige Wahrheitsquelle für die Infrastrukturdefinition dient.

### Flux CD für Kubernetes

```yaml
# flux-system/gotk-sync.yaml
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: GitRepository
metadata:
  name: flux-system
  namespace: flux-system
spec:
  interval: 1m0s
  ref:
    branch: main
  url: https://github.com/org/repo

---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: flux-system
  namespace: flux-system
spec:
  interval: 10m0s
  path: ./clusters/production
  prune: true
  sourceRef:
    kind: GitRepository
    name: flux-system
```

### ArgoCD für Kubernetes

```yaml
# application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/argoproj/argocd-example-apps
    targetRevision: HEAD
    path: guestbook
  destination:
    server: https://kubernetes.default.svc
    namespace: guestbook
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Compliance und Governance in IaC

### Terraform Sentinel

Sentinel ist eine Policy-as-Code-Framework für Terraform Enterprise/Cloud.

```hcl
# AWS-Instance-Typen einschränken
import "tfplan"

allowed_types = ["t2.micro", "t2.small", "t3.micro", "t3.small"]

ec2_instances = filter tfplan.resource_changes as _, rc {
    rc.type is "aws_instance" and
    (rc.change.actions contains "create" or rc.change.actions contains "update")
}

violation = rule {
    all ec2_instances as _, instance {
        instance.change.after.instance_type in allowed_types
    }
}

main = rule {
    violation
}
```

### Checkov

Statischer Code-Analyse-Tool für IaC.

```bash
# Installation
pip install checkov

# Terraform-Code prüfen
checkov -d /path/to/terraform/code

# Kubernetes-Manifeste prüfen
checkov -d /path/to/kubernetes/manifests
```

### Beispiel: Ergebnis einer Checkov-Analyse

```
Check: CKV_AWS_1: "Ensure all data stored in the S3 bucket is securely encrypted at rest"
	FAILED for resource: aws_s3_bucket.data
	File: /main.tf:1-10

Check: CKV_AWS_18: "Ensure the S3 bucket has access logging enabled"
	PASSED for resource: aws_s3_bucket.data
	File: /main.tf:1-10
```

## Fehlerbehandlung und Recovery

### Terraform State-Verwaltung

```bash
# State sichern
terraform state pull > terraform.tfstate.backup

# State reparieren
terraform state push terraform.tfstate.fixed

# Ressourcen aus State entfernen
terraform state rm aws_instance.broken
```

### Rollback-Strategien

```bash
# Rollback zu einer früheren Version mit Git
git checkout v1.0.0
terraform apply

# Terraform mit explizitem State-Pfad
terraform apply -state=terraform.tfstate.backup
```

## Zusammenfassung

Infrastructure as Code bietet einen leistungsstarken Ansatz zur Verwaltung und Bereitstellung von Infrastruktur mit:

1. **Konsistenz** über alle Umgebungen hinweg
2. **Wiederholbarkeit** bei der Bereitstellung
3. **Versionierung** für Änderungsverfolgung
4. **Automatisierung** für schnellere und zuverlässigere Bereitstellungen
5. **Dokumentation** der Infrastruktur als lebendiger Code
