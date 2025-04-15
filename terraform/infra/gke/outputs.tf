output "cluster_name" {
  value = google_container_cluster.primary.name
}

output "node_pool_name" {
  value = google_container_node_pool.primary_nodes.name
}

output "cluster_host" {
  value       = google_container_cluster.primary.endpoint
  description = "The host of the kubernetes cluster"
}

output "location" {
  value = var.region
}