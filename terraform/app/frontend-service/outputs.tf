# Display load balancer IP (typically present in GCP, or using Nginx ingress controller)
output "frontend_service_ip" {
  value = kubernetes_ingress_v1.frontend_ingress.status.0.load_balancer.0.ingress.0.ip
}