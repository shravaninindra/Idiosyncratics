resource "kubernetes_deployment" "backend_service_deployment" {
  metadata {
    name = local.backend_deployment_label
    labels = {
      App = local.backend_deployment_label
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        App = local.backend_deployment_label
      }
    }
    template {
      metadata {
        labels = {
          App = local.backend_deployment_label
        }
      }
      spec {
        container {
          image             = var.backend_service_image
          name              = local.backend_service_label
          image_pull_policy = "Always"

          port {
            container_port = local.backend_service_port
          }

          env_from {
            secret_ref {
              name = local.backend_service_secret
            }
          }

          resources {
            limits = {
              cpu    = "2"
              memory = "2048Mi"
            }
            requests = {
              cpu    = "1"
              memory = "1024Mi"
            }
          }
        }
      }
    }
  }
}
