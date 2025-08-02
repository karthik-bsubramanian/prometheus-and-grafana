## Expose some metrics to prometheus

1) write a counter and Expose its data to prometheus
2) Expose Gauge data to prometheus
3) Expose Histogram data prometheus

# Start Prometheus using docker
```bash
docker run -p 9090:9090 -v ./prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```
# or
```bash
docker-compose up
```