terraform {
  cloud {
    hostname     = "app.terraform.io"
    organization = "idiosyncratics"

    workspaces {
      name = "app-infra"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

module "apis" {
  source = "./cloud-apis"
}
module "gke_cluster" {
  source     = "./gke"
  region     = var.region
  depends_on = [module.apis]
}
module "cloud_sql" {
  source     = "./cloud-sql"
  project    = var.project
  region     = var.region
  depends_on = [module.apis]
}