resource "kubernetes_service" "frontend_service_service" {
  metadata {
    name = local.frontend_service_label
  }
  spec {
    selector = {
      App = local.frontend_deployment_label
    }
    port {
      port        = local.frontend_service_port
      target_port = local.frontend_service_port
    }

    type = "NodePort"
  }
}
