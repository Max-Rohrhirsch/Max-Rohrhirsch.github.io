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