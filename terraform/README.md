# Terraform

Terraform code for provisioning infrastructure and application deployment on kubernetes

> Features

- Provision GKE cluster on google cloud
- Provision Cloud SQL instance on google cloud
- Deploy application to GKE
- Deploy prometheus and loki to GKE
- Provision grafana cloud stack and dashboards

The `/infra` code creates the below on gcp:

- Custom VPC and subnets
- Google kubernetes engine
- Cloud SQL instance (Postgres), user and a database
- Service account to connect to the Postgres instance

The `/app` code creates the below on the GKE instance provisioned by the `/infra`:

- Flask Backend deployment, service, ingress, secret (containing db connection details and other secrets)
- React Frontend deployment, service, ingress, configmap (containing flask backend's ingress ip)

The `/monitoring` code creates the below on the GKE instance provisioned by the `/infra`:

- `Prometheus` helm chart to monitor the kubernetes resources. An ingress to expose `Prometheus` to grafana cloud.
- `Loki` helm chart with prom trail to collect logs from all containers. An ingress to expose `Loki` to grafana cloud.
- `Grafana cloud` stack with Loki and Prometheus data sources configured.
- `Grafana dashboards` for monitoring the applications deployed on the cluster.
<br />

## Quick Start in [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)

Open code in vs code's dev container to have access to shell with terraform pre installed.


<br />

## How to use it

**Step #1** - Navigate to the project
For provisioning the infra, navigate to the infra folder
```bash
$ cd idiosyncratics/terraform/infra 
```
For deploying the app, navigate to the app folder (This requires infra to be provisioned before)
```bash
$ cd idiosyncratics/terraform/app 
```
For deploying the app, navigate to the app folder (This requires infra to be provisioned before)
```bash
$ cd idiosyncratics/terraform/monitoring 
```


<br >

**Step #2** - Initialize the module and run terraform 

```bash
$ terraform login                                  # Login to terraform cloud using an api key
$ terraform init                                   # Initialize the modules
$ terraform plan --var-file=variables/prod.tfvars  # Runs the terraform plan to find out the required changes to the infrastructure
$ terraform apply --var-file=variables/prod.tfvars # First runs a terraform plan and then makes the required changes to the infrastructure 
```

## Configure the variables 

The terraform code requires some variables to run the plans. These variables are defined in the `variables.tf` file and provided in the `variables/prod.tfvars` file (except for the `GOOGLE_CREDENTIALS` variable which is provided at runtime). The `GOOGLE_CREDENTIALS` variable should have the service account credentials which has access to modify the infra in gcp.

The grafana cloud stack requires grafana api key which needs to be provided as `grafana_auth` variable.

---
