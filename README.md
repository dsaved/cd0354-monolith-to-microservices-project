# Udagram Monolith to Microservices Application Submission

## My Front end `Deployment.yaml` file
Kubernetes services are replicated. At least one of the Kubernetes services has replicas: defined with a value greater than 1 in its deployment.yml file. bellow is a sample of my `deployment configuration`
 ```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: udagram-frontend
  labels:
    app: udagram-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: udagram-frontend
  template:
    metadata:
      labels:
        app: udagram-frontend
    spec:
      containers:
      - name: udagram-frontend
        image: dsaved/udagram-frontend:v2
        imagePullPolicy: Always
        ports:
        - containerPort: 80
 ```

## Deployment Pipeline
* DockerHub showing containers that you have pushed
![DockerHub showing containers that you have pushed](./screenshots/DockerHub.jpg)
* GitHub repository’s settings showing your Travis webhook (can be found in Settings - Webhook)
![GitHub repository’s](./screenshots/GitHub-repositorys-settings-showing-your-Travis-webhook-0.jpg)
The travis ci does not use webhook configuration to pull repositories
it uses application integration

![travic webhook](./screenshots/GitHub-repositorys-settings-showing-your-Travis-webhook-1.jpg)
* Travis CI showing a successful build and deploy job
![Travis CI](./screenshots/Travis-CI-showing-a-successful-build-and-deploy-job.jpg)


## Kubernetes
* To verify Kubernetes pods are deployed properly
```bash
kubectl get pods
```
![kubectl get pods](./screenshots/kubectl-get-pods.jpg)
* To verify Kubernetes services are properly set up
```bash
kubectl describe services
```
![kubectl describe services](./screenshots/kubectl-describe-services-1.jpg)
![kubectl describe services](./screenshots/kubectl-describe-services-2.jpg)
* To verify that you have horizontal scaling set against CPU usage
```bash
kubectl describe hpa
```
![kubectl describe hpa](./screenshots/kubectl-describe-hpa.jpg)
* To verify that you have set up logging with a backend application
```bash
kubectl logs {pod_name}
```
![kubectl logs {pod_name}](./screenshots/kubectl-logs.jpg)

## Additional
```bash
kubectl get svc
```
![kubectl logs {pod_name}](./screenshots/kubectl-get-svc.jpg)
