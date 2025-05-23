terraform {
  required_providers {
    grafana = {
      source = "grafana/grafana"
    }
  }
}

provider "grafana" {
  alias         = "cloud"
  cloud_api_key = var.grafana_auth
}

resource "grafana_cloud_stack" "my_stack" {
  provider = grafana.cloud

  name        = "idiosyncratics"
  slug        = "idiosyncratics"
  region_slug = "us"
}

resource "grafana_cloud_stack_service_account" "mystack_cloud_stack_service_account" {
  provider   = grafana.cloud
  stack_slug = grafana_cloud_stack.my_stack.slug

  name = "mystack-cloud-stack-sa"
  role = "Admin"
}

// Creating a grafana cloud stack service account token
resource "grafana_cloud_stack_service_account_token" "mystack_cloud_stack_service_account_token" {
  provider   = grafana.cloud
  stack_slug = grafana_cloud_stack.my_stack.slug

  name               = "mystack-cloud-stack-sa-token"
  service_account_id = grafana_cloud_stack_service_account.mystack_cloud_stack_service_account.id
}

// Create resources within the stack using the below provider
provider "grafana" {
  alias = "my_stack"

  url  = grafana_cloud_stack.my_stack.url
  auth = grafana_cloud_stack_service_account_token.mystack_cloud_stack_service_account_token.key
}

resource "grafana_folder" "monitoring" {
  provider = grafana.my_stack

  title = local.kubernetes_monitoring
}

resource "grafana_folder" "logs" {
  provider = grafana.my_stack

  title = local.application_logs
}

resource "grafana_dashboard" "pod_metrics" {
  depends_on  = [grafana_folder.monitoring]
  provider    = grafana.my_stack
  config_json = file("${path.module}/dashboards/Kubernetes_pods.json")
  folder      = grafana_folder.monitoring.id
}

resource "grafana_dashboard" "workload_metrics" {
  depends_on  = [grafana_folder.monitoring]
  provider    = grafana.my_stack
  config_json = file("${path.module}/dashboards/Kubernetes_workloads.json")
  folder      = grafana_folder.monitoring.id
}

resource "grafana_dashboard" "application_logs" {
  depends_on  = [grafana_folder.logs]
  provider    = grafana.my_stack
  config_json = file("${path.module}/dashboards/logs.json")
  folder      = grafana_folder.logs.id
}

resource "grafana_data_source" "loki_datasource" {
  provider   = grafana.my_stack
  type       = "loki"
  name       = "application-logs"
  url        = var.loki_url
  is_default = true
}

resource "grafana_data_source" "prom_datasource" {
  provider   = grafana.my_stack
  type       = "prometheus"
  name       = "cluster-monitoring"
  url        = var.prom_url
  is_default = true
}