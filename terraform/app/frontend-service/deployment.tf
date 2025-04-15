resource "kubernetes_deployment" "frontend_service_deployment" {
  depends_on = [kubernetes_config_map.frontend_service_config_map]
  metadata {
    name = local.frontend_deployment_label
    labels = {
      App = local.frontend_deployment_label
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        App = local.frontend_deployment_label
      }
    }
    template {
      metadata {
        labels = {
          App = local.frontend_deployment_label
        }
      }
      spec {
        container {
          image             = var.frontend_service_image
          name              = local.frontend_service_label
          image_pull_policy = "Always"

          port {
            container_port = local.frontend_service_port
          }

          env_from {
            config_map_ref {
              name = local.frontend_service_config_map
            }
          }

          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "50Mi"
            }
          }
        }
      }
    }
  }
}
