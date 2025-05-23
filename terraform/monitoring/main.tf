terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.52.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.1"
    }
  }
  cloud {
    hostname     = "app.terraform.io"
    organization = "idiosyncratics"
    workspaces {
      name = "monitoring-deployment"
    }
  }
}

data "terraform_remote_state" "infra" {
  backend = "remote"
  config = {
    organization = "idiosyncratics"
    workspaces = {
      name = "app-infra"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

data "google_client_config" "default" {}

data "google_container_cluster" "my_cluster" {
  name     = data.terraform_remote_state.infra.outputs.gke_cluster_outputs.cluster_name
  location = data.terraform_remote_state.infra.outputs.gke_cluster_outputs.location
}

provider "kubernetes" {
  host = "https://${data.terraform_remote_state.infra.outputs.gke_cluster_outputs.cluster_host}"

  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(data.google_container_cluster.my_cluster.master_auth[0].cluster_ca_certificate)
}

provider "helm" {
  kubernetes {
    host                   = "https://${data.terraform_remote_state.infra.outputs.gke_cluster_outputs.cluster_host}"
    token                  = data.google_client_config.default.access_token
    cluster_ca_certificate = base64decode(data.google_container_cluster.my_cluster.master_auth[0].cluster_ca_certificate)
  }
}

module "monitoring_endpoints" {
  source = "./monitoring"
}

module "grafana" {
  source       = "./grafana"
  grafana_auth = var.grafana_auth
  loki_url     = "http://${module.monitoring_endpoints.loki_outputs.loki_endpoint}"
  prom_url     = "http://${module.monitoring_endpoints.prom_outputs.prom_endpoint}"
}