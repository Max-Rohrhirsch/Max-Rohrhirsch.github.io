# Kubernetes

### Installation
```bash
sudo apt-get update
sudo apt-get install docker.io

curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x minikube
sudo mv minikube /usr/local/bin/

curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

minikube start
            
            
curl.exe -LO "https://dl.k8s.io/release/v1.29.0/bin/windows/amd64/kubectl.exe"
kubectl version --client
```
Is installed in Docker desktop. -> Config Enable

### Commands
```bash
kubectl apply -f deployment.yaml
kubectl expose deployment example-deployment --type=LoadBalancer --port=8080

kubectl get deployments
kubectl get pods

minikube service example-deployment

kubectl scale deployment example-deployment --replicas=4
```

### Kubernetes Konfigurationsdateien

#### Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:1.0.0
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "200m"
            memory: "256Mi"
        env:
        - name: DB_HOST
          value: "postgres-service"
        - name: SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: secret-key
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

#### Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

#### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.properties: |
    environment=production
    logging.level=info
  database.properties: |
    url=jdbc:postgresql://postgres:5432/mydb
    username=admin
```

#### Secret
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  db-password: cGFzc3dvcmQ=  # base64 encoded "password"
  secret-key: c2VjcmV0  # base64 encoded "secret"
```

#### PersistentVolumeClaim
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

### Kubernetes Namespaces

```bash
# Namespace erstellen
kubectl create namespace dev

# Ressource in bestimmtem Namespace erstellen
kubectl apply -f deployment.yaml -n dev

# Zwischen Namespaces wechseln
kubectl config set-context --current --namespace=dev

# Ressourcen aus allen Namespaces anzeigen
kubectl get pods --all-namespaces
```

### Ressourcenmanagement

```bash
# Pod-Details anzeigen (inkl. Ressourcennutzung)
kubectl describe pod my-pod

# Ressourcennutzung anzeigen
kubectl top nodes
kubectl top pods

# Ressourcen-Limits und -Requests können in der YAML-Datei konfiguriert werden
resources:
  limits:
    cpu: "1"
    memory: "1Gi"
  requests:
    cpu: "500m"
    memory: "512Mi"
```

### Helm - Der Kubernetes-Paketmanager

```bash
# Helm installieren (Linux)
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

# Chart-Repository hinzufügen
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Verfügbare Charts suchen
helm search repo wordpress

# Chart installieren
helm install my-wordpress bitnami/wordpress

# Chart aktualisieren
helm upgrade my-wordpress bitnami/wordpress --values=values.yaml

# Chart entfernen
helm uninstall my-wordpress

# Eigenes Chart erstellen
helm create my-chart
```

#### Beispiel einer Helm values.yaml-Datei
```yaml
# values.yaml
replicaCount: 2

image:
  repository: nginx
  tag: 1.21
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 200m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi
```

### Kubernetes Networking

#### Ingress-Controller
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls-cert
```

#### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 5432
```

### StatefulSets für zustandsbehaftete Anwendungen

```yaml
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
        image: nginx:1.20
        ports:
        - containerPort: 80
          name: web
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

### Jobs und CronJobs

```yaml
# Einmaliger Job
apiVersion: batch/v1
kind: Job
metadata:
  name: batch-job
spec:
  template:
    spec:
      containers:
      - name: batch-job
        image: my-batch-job:latest
        command: ["python", "job.py"]
      restartPolicy: OnFailure
  backoffLimit: 4

# Zeitgesteuerter Job
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-job
spec:
  schedule: "0 3 * * *"  # Jeden Tag um 3 Uhr
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: backup-tool:latest
            command: ["backup.sh"]
          restartPolicy: OnFailure
```

### Kubernetes Dashboard

```bash
# Dashboard installieren
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

# Token für Dashboard erzeugen
kubectl create serviceaccount dashboard-admin
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin

# Token anzeigen
kubectl get secret $(kubectl get serviceaccount dashboard-admin -o jsonpath="{.secrets[0].name}") -o jsonpath="{.data.token}" | base64 --decode

# Dashboard starten
kubectl proxy
```

Dashboard ist dann unter http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/ erreichbar.

### Kubernetes Monitoring mit Prometheus und Grafana

```bash
# Prometheus Operator mit Helm installieren
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack

# Port-Forwarding für Grafana
kubectl port-forward deployment/prometheus-grafana 3000:3000

# Port-Forwarding für Prometheus
kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090:9090
```

### Kubeconfig-Datei

Die Kubeconfig-Datei (normalerweise unter `~/.kube/config`) enthält Konfigurationsinformationen für kubectl.

```yaml
apiVersion: v1
kind: Config
clusters:
- name: my-cluster
  cluster:
    server: https://kubernetes.example.com
    certificate-authority-data: DATA+OMITTED
contexts:
- name: my-context
  context:
    cluster: my-cluster
    namespace: default
    user: my-user
current-context: my-context
users:
- name: my-user
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

### Kontexte in kubectl wechseln

```bash
# Verfügbare Kontexte anzeigen
kubectl config get-contexts

# Kontext wechseln
kubectl config use-context my-context

# Namespace im aktuellen Kontext ändern
kubectl config set-context --current --namespace=my-namespace
```

Feature	Docker Compose	Kubernetes
Neustart nach Crash	Ja, simpel	Ja, plus Healthchecks
Automatische Skalierung	❌	✅ (CPU/Memory gesteuert)
Auf mehreren Hosts laufen	❌	✅
Rolling Updates & Rollbacks	❌	✅
Self-Healing, Monitoring	❌	✅


```bash
kind create cluster --name my-cluster

kind delete cluster --name my-cluster
```

| Kategorie | Kind | Beschreibung |
| --- | --- | --- |
| **Workloads** | `Pod` | Kleinste Ausführungseinheit |
|  | `ReplicaSet` | Hält gewünschte Anzahl Pods |
|  | `Deployment` | Rollouts + Updates von Pods |
|  | `StatefulSet` | Zustandsbehaftete Pods (z. B. DBs) |
|  | `DaemonSet` | 1 Pod pro Node |
|  | `Job` | Einmalige Tasks |
|  | `CronJob` | Wiederkehrende Jobs (z. B. Backup) |
| **Services** | `Service` | Zugriff auf Pods (ClusterIP, NodePort) |
|  | `Ingress` | HTTP-Routing + Domains |
| **Config** | `ConfigMap` | Key-Value Config-Dateien |
|  | `Secret` | Gesicherte Daten (z. B. Passwörter) |
| **Storage** | `PersistentVolume` (PV) | Speicherangebot |
|  | `PersistentVolumeClaim` (PVC) | Speicheranforderung |
|  | `StorageClass` | Speicher-Typen (z. B. SSD, HDD) |
| **Security** | `ServiceAccount` | Identität für Pods |
|  | `Role` / `ClusterRole` | RBAC: Berechtigungen |
|  | `RoleBinding` / `ClusterRoleBinding` | Rollenzuweisung |
| **Networking** | `NetworkPolicy` | Traffic-Regeln für Pods |
| **Custom** | `CustomResourceDefinition` | Eigene API-Erweiterung |
| **Namespace** | `Namespace` | Isolation von Ressourcen |
| **Node Mgmt** | `Node` | Info über Cluster-Knoten |
|  | `LimitRange`, `ResourceQuota` | Ressourcenbegrenzungen pro Namespace |

