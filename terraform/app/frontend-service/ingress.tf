resource "kubernetes_ingress_v1" "frontend_ingress" {
  wait_for_load_balancer = true
  metadata {
    name = local.frontend_service_ingress
    annotations = {
      "kubernetes.io/ingress.class" = "gce"
    }
  }
  spec {
    rule {
      http {
        path {
          path = "/*"
          backend {
            service {
              name = local.frontend_service_label
              port {
                number = local.frontend_service_port
              }
            }
          }
        }
      }
    }
  }
}