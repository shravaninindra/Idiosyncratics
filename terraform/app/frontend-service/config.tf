resource "kubernetes_config_map" "frontend_service_config_map" {
  metadata {
    name = local.frontend_service_config_map
  }

  data = {
    API_URL = var.backend_service_endpoint
  }
}