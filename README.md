# 🚀 DevSecOps CI/CD Pipeline for Counter App

This repository contains a DevSecOps-based CI/CD pipeline for a simple **Counter App**. The pipeline integrates:

- **CI:** GitHub Actions
- **Container Registry:** GitHub Container Registry (GHCR)
- **Kubernetes:** Local cluster using `kind`
- **CD:** Argo CD

The primary goal of this setup is to demonstrate a secure and automated development lifecycle using modern DevSecOps tools and best practices.

---

## 📦 Tech Stack

- GitHub Actions (CI)
- GHCR (GitHub Container Registry)
- kind (Kubernetes in Docker)
- kubectl
- Argo CD (CD)
- Docker

---

## 🔐 Prerequisites

- WSL2 or Linux
- Docker installed and running
- Git and GitHub CLI installed
- A GitHub Personal Access Token

---

## 🚀 Setup & Execution

### 1. 🔑 Create and Add GitHub Secrets

In your GitHub repository:

- Go to **Settings > Secrets and variables > Actions > New repository secret**
- Add the secret token          


---

### 2. 🛠️ Local Environment Setup

Install the required CLI tools on Ubuntu or WSL:

```bash
# Install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Install kubectl
sudo apt update && sudo apt install -y curl
curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Create kind cluster
kind create cluster --name=devsecops-cluster

```


---

### 3. 🚀 Install Argo CD

```bash
# Create namespace and install Argo CD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml


# Expose Argo CD server
kubectl port-forward svc/argocd-server -n argocd 9010:80
```


---

### 4. 🔐 Get Argo CD Admin Credentials

```bash
kubectl get secret argocd-initial-admin-secret -n argocd -o yaml
# Copy the base64 encoded password and decode it
echo '<base64-password>' | base64 --decode
```
Username: admin


---

### 5. 🐳 Authenticate to GHCR (GitHub Container Registry)

```bash
docker login ghcr.io -u <GHCR_USERNAME> -p <GHCR_TOKEN>

# Create a Kubernetes secret to pull images from GHCR:
kubectl create secret docker-registry github-container-registry \
  --docker-server=ghcr.io \
  --docker-username=<GHCR_USERNAME> \
  --docker-password=<GHCR_TOKEN> \
  --docker-email=<GHCR_EMAIL>
```


---

### 6. 📦 CI/CD in Action
Make any changes to your source code and push to GitHub.
GitHub Actions will:
-Build the image
-Push it to GHCR
-Update Kubernetes manifests (if configured)
-Argo CD will auto-sync and deploy the latest image


---

### 7. 🌐 Access the Application
To forward a pod port to your local machine:
```bash
kubectl get pods
kubectl port-forward <your_pod_name> 3010:80
Now access your app at http://localhost:3010
```
