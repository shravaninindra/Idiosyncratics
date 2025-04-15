# RabbitMQ Messaging

We have provide a single-pod deployment that provides a RabbitMQ message server and a service called `rabbitmq` so that worker nodes can use DNS names to locate the instance. The provided deployment uses [the one provided by the Rabbitmq developers](https://hub.docker.com/_/rabbitmq).
