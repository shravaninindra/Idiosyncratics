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
      name = "app-deployment"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
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

module "backend_service" {
  source = "./backend-service"

  backend_service_image = var.backend_service_image
  db_details            = data.terraform_remote_state.infra.outputs.db_details
  chatgpt_api_key       = var.chatgpt_api_key
}

module "frontend_service" {
  source = "./frontend-service"

  frontend_service_image   = var.frontend_service_image
  backend_service_endpoint = "http://${module.backend_service.backend_service_ip}"
}