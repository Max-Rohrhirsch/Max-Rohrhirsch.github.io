# Container-Orchestrierung

Container-Orchestrierung automatisiert die Bereitstellung, Skalierung, Vernetzung und Verwaltung von Containeranwendungen. Die wichtigsten Systeme hierfür sind Kubernetes, Docker Swarm und OpenShift.

## Docker Swarm

Docker Swarm ist eine Clustering- und Orchestrierungslösung für Docker-Container, die in Docker integriert ist.

### Grundkonzepte

- **Node**: Ein Docker-Host im Swarm
- **Manager Node**: Verwaltet den Cluster-Status und delegiert Aufgaben
- **Worker Node**: Führt Container aus
- **Service**: Die Definition einer auszuführenden Aufgabe
- **Task**: Ein Container-Instanz eines Service
- **Stack**: Sammlung von Services, die zusammengehören

### Swarm-Cluster einrichten

```bash
# Auf dem ersten Node (wird zum Manager)
docker swarm init --advertise-addr <MANAGER-IP>

# Ausgabe enthält Befehl für Worker-Nodes
# Beispiel:
# docker swarm join --token SWMTKN-1-49nj1cmql0... <MANAGER-IP>:2377

# Swarm-Status anzeigen
docker info | grep Swarm

# Nodes anzeigen
docker node ls
```

### Services verwalten

```bash
# Service erstellen (Standard-Replikat-Modus)
docker service create --name web --replicas 3 -p 80:80 nginx:latest

# Service mit Constraint auf bestimmten Nodes
docker service create --name db \
  --constraint 'node.labels.type==database' \
  -e MYSQL_ROOT_PASSWORD=pass \
  mysql:5.7

# Service aktualisieren
docker service update --image nginx:1.21 web

# Service skalieren
docker service scale web=5

# Services anzeigen
docker service ls

# Detaillierte Service-Informationen
docker service inspect web

# Service-Logs anzeigen
docker service logs web

# Service löschen
docker service rm web
```

### Docker Stack für Swarm

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
        max_attempts: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    networks:
      - webnet

  visualizer:
    image: dockersamples/visualizer:latest
    ports:
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      placement:
        constraints: [node.role == manager]
    networks:
      - webnet

networks:
  webnet:
```

```bash
# Stack deployen
docker stack deploy -c docker-compose.yml myapp

# Stacks anzeigen
docker stack ls

# Services in einem Stack anzeigen
docker stack services myapp

# Tasks in einem Stack anzeigen
docker stack ps myapp

# Stack entfernen
docker stack rm myapp
```

### Rolling Updates in Swarm

```bash
# Service mit Update-Konfiguration erstellen
docker service create --name web \
  --replicas 10 \
  --update-delay 10s \
  --update-parallelism 2 \
  --update-failure-action rollback \
  nginx:1.20

# Service aktualisieren
docker service update --image nginx:1.21 web

# Rollback bei Problemen
docker service update --rollback web
```

### Swarm-Netzwerke

```bash
# Overlay-Netzwerk erstellen
docker network create --driver overlay webnet

# Verschlüsseltes Overlay-Netzwerk erstellen
docker network create --driver overlay --opt encrypted webnet-secure

# Service mit spezifischem Netzwerk
docker service create --name web \
  --network webnet \
  -p 80:80 \
  nginx:latest
```

### Swarm Secrets

```bash
# Secret aus Datei erstellen
echo "supersecretpassword" > password.txt
docker secret create db_password password.txt
rm password.txt  # Lokale Datei löschen

# Secret über STDIN erstellen
echo "supersecretpassword" | docker secret create db_password_stdin -

# Service mit Secret
docker service create --name db \
  --secret db_password \
  -e POSTGRES_PASSWORD_FILE=/run/secrets/db_password \
  postgres:13
```

### Swarm Configs

```bash
# Config aus Datei erstellen
docker config create nginx_config nginx.conf

# Service mit Config
docker service create --name web \
  --config source=nginx_config,target=/etc/nginx/nginx.conf \
  -p 80:80 \
  nginx:latest
```

### Health Checks und Auto-Healing

```bash
# Service mit Health Check
docker service create --name web \
  --health-cmd "curl -f http://localhost/ || exit 1" \
  --health-interval 5s \
  --health-retries 3 \
  --health-timeout 2s \
  -p 80:80 \
  nginx:latest
```

## Kubernetes

Kubernetes (K8s) ist eine Open-Source-Plattform zur Automatisierung der Bereitstellung, Skalierung und Verwaltung von containerisierten Anwendungen.

### Grundkonzepte

- **Node**: Eine physische oder virtuelle Maschine im Cluster
- **Pod**: Die kleinste Einheit in Kubernetes, enthält einen oder mehrere Container
- **ReplicaSet**: Gewährleistet, dass eine bestimmte Anzahl von Pod-Repliken läuft
- **Deployment**: Verwaltet ReplicaSets und ermöglicht deklarative Updates
- **Service**: Definiert einen stabilen Endpunkt zum Zugriff auf Pods
- **Ingress**: Regelt den externen Zugriff auf Dienste im Cluster
- **ConfigMap/Secret**: Speichert Konfigurationsdaten bzw. sensible Daten
- **Namespace**: Virtuelles Cluster innerhalb eines Clusters
- **StatefulSet**: Für zustandsbehaftete Anwendungen
- **DaemonSet**: Stellt sicher, dass bestimmte Pods auf allen Nodes laufen
- **Job/CronJob**: Für einmalige oder geplante Aufgaben

### Kubernetes-Cluster einrichten

#### Minikube (Lokale Entwicklung)

```bash
# Minikube starten
minikube start --driver=docker

# Cluster-Status prüfen
minikube status

# Dashboard aktivieren
minikube dashboard
```

#### kubeadm (Produktionsumgebung)

```bash
# Auf allen Nodes
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

# Auf dem Master-Node
sudo kubeadm init --pod-network-cidr=192.168.0.0/16

# Anweisungen aus der Ausgabe befolgen, z.B.:
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Netzwerk-Plugin installieren (z.B. Calico)
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# Token für Worker-Nodes anzeigen
kubeadm token create --print-join-command

# Auf Worker-Nodes
# Den angezeigten Befehl ausführen, z.B.:
# sudo kubeadm join 192.168.1.100:6443 --token abcdef.1234567890abcdef \
#   --discovery-token-ca-cert-hash sha256:1234...
```

### Grundlegende Kubernetes-Ressourcen

#### Pod

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
```

#### Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
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
        resources:
          limits:
            cpu: "0.5"
            memory: "512Mi"
          requests:
            cpu: "0.2"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
```

#### Service

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP  # Alternativen: NodePort, LoadBalancer
```

#### Ingress

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
```

### Kubernetes-Ressourcen verwalten

```bash
# Ressource erstellen
kubectl apply -f deployment.yaml

# Ressourcen anzeigen
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get ingress

# Detaillierte Informationen anzeigen
kubectl describe pod nginx-pod
kubectl describe deployment nginx-deployment

# Container-Logs anzeigen
kubectl logs nginx-pod
kubectl logs -f nginx-pod  # Follow-Modus

# Pod-Shell zugreifen
kubectl exec -it nginx-pod -- /bin/bash

# Ressourcen löschen
kubectl delete -f deployment.yaml
# oder
kubectl delete deployment nginx-deployment
```

### Skalierung und Updates

```bash
# Deployment manuell skalieren
kubectl scale deployment nginx-deployment --replicas=5

# Rolling Update durchführen
kubectl set image deployment/nginx-deployment nginx=nginx:1.22

# Update-Status prüfen
kubectl rollout status deployment/nginx-deployment

# Rollback bei Problemen
kubectl rollout undo deployment/nginx-deployment
```

### ConfigMaps und Secrets

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    server {
      listen 80;
      server_name localhost;
      location / {
        root /usr/share/nginx/html;
        index index.html;
      }
    }
```

```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=  # base64-encoded "admin"
  password: cGFzc3dvcmQ=  # base64-encoded "password"
```

```yaml
# pod-mit-config-secret.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-config-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    volumeMounts:
    - name: config-volume
      mountPath: /etc/nginx/conf.d
    env:
    - name: DB_USERNAME
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: username
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
  volumes:
  - name: config-volume
    configMap:
      name: nginx-config
```

### Namespaces

```bash
# Namespace erstellen
kubectl create namespace dev

# Ressource in Namespace erstellen
kubectl apply -f deployment.yaml -n dev

# Ressourcen in allen Namespaces anzeigen
kubectl get pods --all-namespaces

# Kontext für bestimmten Namespace setzen
kubectl config set-context --current --namespace=dev
```

### StatefulSets für zustandsbehaftete Anwendungen

```yaml
# statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "nginx"
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
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

### DaemonSets

```yaml
# daemonset.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  labels:
    app: fluentd
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      containers:
      - name: fluentd
        image: fluent/fluentd:v1.14
```

### Jobs und CronJobs

```yaml
# job.yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4
```

```yaml
# cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"  # Jede Minute
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox
            command: ["echo", "Hello world"]
          restartPolicy: OnFailure
```

### Horizontale Pod-Autoskalierung (HPA)

```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
```

### Affinity und Anti-Affinity

```yaml
# pod-affinity.yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: app
            operator: In
            values:
            - cache
        topologyKey: "kubernetes.io/hostname"
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: app
              operator: In
              values:
              - web
          topologyKey: "kubernetes.io/hostname"
  containers:
  - name: with-affinity
    image: nginx
```

### Ressourcenlimits und -anforderungen

```yaml
# resource-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi
    pods: "10"
```

```yaml
# limit-range.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: dev
spec:
  limits:
  - default:
      cpu: 200m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 256Mi
    type: Container
```

### Helm - Der Kubernetes-Paketmanager

```bash
# Helm installieren
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

# Repository hinzufügen
helm repo add stable https://charts.helm.sh/stable
helm repo update

# Chart-Installation
helm install nginx-release stable/nginx-ingress

# Chart-Status
helm status nginx-release

# Chart aktualisieren
helm upgrade nginx-release stable/nginx-ingress --values values.yaml

# Chart deinstallieren
helm uninstall nginx-release

# Eigenes Chart erstellen
helm create mychart
```

```yaml
# mychart/values.yaml
replicaCount: 2

image:
  repository: nginx
  tag: 1.21
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
```

### Kubernetes Dashboard

```bash
# Dashboard installieren
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

# Token für Dashboard erstellen
kubectl create serviceaccount dashboard-admin
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin
kubectl get secret $(kubectl get serviceaccount dashboard-admin -o jsonpath="{.secrets[0].name}") -o jsonpath="{.data.token}" | base64 --decode

# Dashboard starten
kubectl proxy
```

Dashboard ist dann unter [http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/) erreichbar.

## Vergleich: Docker Swarm vs. Kubernetes

| Aspekt | Docker Swarm | Kubernetes |
|--------|-------------|------------|
| **Komplexität** | Einfach zu konfigurieren und zu nutzen | Steile Lernkurve, komplexere Konfiguration |
| **Skalierbarkeit** | Gut für kleinere Umgebungen | Exzellent für große, komplexe Umgebungen |
| **Installation** | In Docker integriert | Separate Installation erforderlich |
| **Plattformen** | Docker-basiert | Container-agnostisch |
| **Load Balancing** | Integriert | Erfordert zusätzliche Konfiguration |
| **Auto-Healing** | Grundlegende Funktionen | Umfassende Funktionen |
| **Netzwerk** | Einfaches Overlay-Netzwerk | Flexibles, Plugin-basiertes System |
| **Updates** | Rolling Updates | Komplexe Update-Strategien |
| **Monitoring** | Begrenzt | Umfassend mit zusätzlichen Tools |

### Wann Docker Swarm verwenden?

- Kleine bis mittelgroße Anwendungen
- Einfache Bereitstellungsanforderungen
- Schneller Einstieg ohne komplexe Konfiguration
- Bestehende Docker-Umgebung
- Begrenzte Ressourcen für Management und Betrieb

### Wann Kubernetes verwenden?

- Große, komplexe Anwendungen
- Hochverfügbarkeitsanforderungen
- Fortgeschrittene Orchestrierungsfunktionen benötigt
- Multi-Cloud- oder Hybrid-Cloud-Umgebungen
- Ressourcen für Management und Betrieb verfügbar

## Red Hat OpenShift

OpenShift ist eine Kubernetes-Distribution von Red Hat mit zusätzlichen Features für Unternehmen.

### Hauptmerkmale

- Integrierte CI/CD-Pipeline
- Entwicklerfreundliche Web-Konsole
- Automatisierte Builds und Deployments
- Integriertes Container-Registry
- Rollenbasierte Zugriffskontrolle (RBAC)
- Anwendungskatalog mit Templates
- Integrated Monitoring und Logging

### OpenShift-Konzepte

- **Project**: Entspricht einem Kubernetes-Namespace
- **DeploymentConfig**: Erweiterte Version eines Kubernetes-Deployments
- **BuildConfig**: Definition des Build-Prozesses
- **Route**: Ähnlich einem Kubernetes-Ingress
- **ImageStream**: Abstrahiert Container-Images und deren Tags
- **Template**: Sammlung von OpenShift- und Kubernetes-Ressourcen

### OpenShift-Beispiel: Deployment und Route

```yaml
# deploymentconfig.yaml
apiVersion: apps.openshift.io/v1
kind: DeploymentConfig
metadata:
  name: example
spec:
  replicas: 3
  selector:
    app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: example
        image: nginx:1.21
        ports:
        - containerPort: 8080
  strategy:
    type: Rolling
    rollingParams:
      updatePeriodSeconds: 1
      intervalSeconds: 1
      timeoutSeconds: 600
      maxUnavailable: 25%
      maxSurge: 25%
  triggers:
  - type: ConfigChange
```

```yaml
# route.yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: example
spec:
  host: example.apps.example.com
  to:
    kind: Service
    name: example
  tls:
    termination: edge
```

### OpenShift-CLI (oc)

```bash
# Anmelden
oc login https://api.example.com:6443

# Projekt erstellen
oc new-project my-project

# Anwendung erstellen
oc new-app nginx:1.21

# Ressourcen anzeigen
oc get pods
oc get routes

# Route erstellen
oc expose service/nginx

# Logs anzeigen
oc logs deployment/nginx

# OpenShift-Web-Konsole öffnen
oc console
```

## Fazit

Container-Orchestrierung ist ein wesentlicher Bestandteil moderner DevOps-Praktiken. Während Docker Swarm eine einfache Lösung für kleinere Umgebungen bietet, sind Kubernetes und OpenShift leistungsfähige Plattformen für komplexe, skalierbare Anwendungen. Die Wahl der richtigen Technologie hängt von den spezifischen Anforderungen des Projekts, den verfügbaren Ressourcen und dem erforderlichen Funktionsumfang ab.
