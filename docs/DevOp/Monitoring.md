# Monitoring und Logging

## Übersicht

Monitoring und Logging sind essentielle Bestandteile moderner DevOps-Praktiken, die dazu dienen:
- Systemzustand und -leistung zu überwachen
- Probleme frühzeitig zu erkennen
- Trends zu analysieren
- Fehlerbehebung zu unterstützen

## Monitoring-Tools

### Prometheus

Ein Open-Source-Monitoring- und Alerting-System, ideal für dynamische Service-orientierte Architekturen.

```yaml
# prometheus.yml Grundkonfiguration
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
```

**Komponenten:**
- **Prometheus-Server**: Sammelt und speichert Metriken
- **PromQL**: Abfragesprache für Metriken
- **Alertmanager**: Verarbeitet Alerts und leitet sie weiter
- **Exporters**: Sammeln spezifische Metriken (node_exporter, mysql_exporter, etc.)

### Grafana

Visualisierungsplattform für Metriken aus verschiedenen Quellen.

```bash
# Docker-Installation
docker run -d -p 3000:3000 grafana/grafana

# Login mit admin/admin
# Standardmäßig auf http://localhost:3000 erreichbar
```

**Features:**
- Dashboards für verschiedene Datenquellen
- Alarme und Benachrichtigungen
- Annotationen für Events
- Mehrere Datenquellen (Prometheus, InfluxDB, Elasticsearch, etc.)

### Zabbix

Umfassendes Enterprise-Monitoring-System.

```bash
# Einfacher Zabbix-Agent-Konfigurationsbeispiel
Server=zabbix.example.com
ServerActive=zabbix.example.com
Hostname=web-server-01
```

**Vorteile:**
- Skalierbar für große Infrastrukturen
- Umfassendes Web-Interface
- Agenten für verschiedene Systeme
- Vorlagenbasiert

### Datadog

SaaS-Monitoring-Lösung für Cloud-Umgebungen.

```bash
# Datadog-Agent-Installation unter Linux
DD_API_KEY=<API_KEY> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Features:**
- Infrastruktur- und APM-Monitoring
- Log-Management
- Real User Monitoring (RUM)
- Synthetics Testing

## Logging-Systeme

### ELK Stack (Elasticsearch, Logstash, Kibana)

```yaml
# Logstash-Konfigurationsbeispiel
input {
  beats {
    port => 5044
  }
}

filter {
  if [type] == "nginx" {
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
  }
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "logstash-%{+YYYY.MM.dd}"
  }
}
```

**Komponenten:**
- **Elasticsearch**: Suchmaschine, speichert Logs
- **Logstash**: Log-Pipeline, verarbeitet und transformiert Logs
- **Kibana**: Visualisierungsplattform für Elasticsearch-Daten
- **Beats**: Leichtgewichtige Datensammler, z.B. Filebeat, Metricbeat

### Fluentd / Fluent Bit

Log-Sammler und -Prozessor für einheitliches Logging.

```yaml
# fluent-bit.conf
[INPUT]
    Name   tail
    Path   /var/log/nginx/access.log
    Tag    nginx.access

[FILTER]
    Name   grep
    Match  nginx.access
    Regex  log ^(?<remote>[^ ]*) (?<host>[^ ]*) (?<user>[^ ]*) \[(?<time>[^\]]*)\] "(?<method>\S+)(?: +(?<path>[^\"]*?)(?: +\S*)?)?" (?<code>[^ ]*) (?<size>[^ ]*)(?: "(?<referer>[^\"]*)" "(?<agent>[^\"]*)")?$

[OUTPUT]
    Name   elasticsearch
    Match  nginx.access
    Host   elasticsearch
    Port   9200
    Index  nginx
```

**Vorteile:**
- Extrem effizient und ressourcenschonend
- Unterstützt zahlreiche Input- und Output-Plugins
- Ideal für Kubernetes und containerisierte Umgebungen

### Graylog

Zentralisiertes Log-Management-System.

```bash
# Grundlegende Log-Weiterleitung mit rsyslog
*.* @graylog-server:514;RSYSLOG_SyslogProtocol23Format
```

**Features:**
- Strukturierte Logs
- Alarme auf Basis von Logs
- Dashboards und Berichte
- Rollenbasierte Zugriffskontrolle

## Traces und APM (Application Performance Monitoring)

### Jaeger

Open-Source Distributed Tracing System.

```yaml
# Einfache Jaeger-Konfiguration
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: simple-tracing
spec:
  strategy: allInOne
  allInOne:
    image: jaegertracing/all-in-one:1.25
    options:
      log-level: debug
```

**Komponenten:**
- **Jaeger Client**: Instrumentierung der Anwendung
- **Jaeger Agent**: Empfängt Spans und sendet sie an Collector
- **Jaeger Collector**: Validiert und speichert Traces
- **Storage**: Cassandra, Elasticsearch, etc.
- **Jaeger Query**: UI und API für Traces

### Zipkin

Leichtgewichtiges Distributed Tracing System.

```bash
# Docker-Installation
docker run -d -p 9411:9411 openzipkin/zipkin
```

**Features:**
- Einblick in Latenzen
- Service-Abhängigkeitsvisualisierung
- Integration mit Spring Cloud Sleuth, OpenTracing, etc.

### New Relic

Umfassende APM-Lösung.

```bash
# New Relic Agent-Installation (Node.js)
npm install newrelic
```

**Funktionen:**
- End-to-End-Transaktionsüberwachung
- Error-Tracking
- Infrastructure-Monitoring
- Synthetics-Monitoring

## Observability Best Practices

1. **Drei Säulen der Observability:**
   - Logs (Was ist passiert?)
   - Metriken (Wie ist der aktuelle Zustand?)
   - Traces (Wie ist der Datenfluss durch das System?)

2. **Standardisierung:**
   - Einheitliche Logging-Formate (JSON)
   - Konsistente Metriknamen
   - Context-Propagation in Traces

3. **Instrumentierung:**
```python
# Python mit Prometheus Client
from prometheus_client import Counter, start_http_server

requests_total = Counter('requests_total', 'Total number of requests')

def process_request():
    # Request-Verarbeitung
    requests_total.inc()

if __name__ == '__main__':
    start_http_server(8000)
    # Anwendungslogik
```

4. **SLIs (Service Level Indicators) und SLOs (Service Level Objectives):**
   - Verfügbarkeit: `(Gesamtzeit - Ausfallzeit) / Gesamtzeit`
   - Latenz: 95., 99. Perzentil der Antwortzeiten
   - Fehlerrate: `Fehlerhafte Anfragen / Gesamtanfragen`

## Alerting

### Prometheus Alerting Rules

```yaml
groups:
- name: example
  rules:
  - alert: HighLatency
    expr: http_request_duration_seconds{quantile="0.9"} > 1
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High latency on {{ $labels.instance }}"
      description: "90th percentile latency is over 1s for 5 minutes"
```

### Slack-Integration

```yaml
# Alertmanager-Konfiguration für Slack
receivers:
- name: slack
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXX'
    channel: '#alerts'
    text: "{{ range .Alerts }}{{ .Annotations.description }}\n{{ end }}"
```

### PagerDuty für On-Call-Management

```yaml
# Alertmanager-Konfiguration für PagerDuty
receivers:
- name: pagerduty
  pagerduty_configs:
  - service_key: <pagerduty-service-key>
    description: "{{ .CommonAnnotations.summary }}"
    client: "alertmanager"
    client_url: "{{ template \"pagerduty.default.client_url\" . }}"
    details:
      firing: "{{ template \"pagerduty.default.instances\" .Alerts.Firing }}"
```

## Dashboards und Visualisierung

### Grafana Dashboard-Beispiele

```json
{
  "panels": [
    {
      "title": "CPU Usage",
      "type": "graph",
      "datasource": "Prometheus",
      "targets": [
        {
          "expr": "avg by(instance) (rate(node_cpu_seconds_total{mode!=\"idle\"}[5m]))",
          "legendFormat": "{{instance}}"
        }
      ]
    }
  ]
}
```

### Kibana für Log-Visualisierung

```
GET /logstash-*/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "level": "error"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "@timestamp": {
              "gte": "now-24h"
            }
          }
        }
      ]
    }
  }
}
```

## Log-Rotation und -Retention

```bash
# Logrotate-Konfigurationsbeispiel
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -s /run/nginx.pid ] && kill -USR1 `cat /run/nginx.pid`
    endscript
}
```

## Monitoring in Kubernetes

### Prometheus Operator

```yaml
# prometheus-operator.yaml
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  name: prometheus
  namespace: monitoring
spec:
  serviceAccountName: prometheus
  serviceMonitorSelector:
    matchLabels:
      team: frontend
  resources:
    requests:
      memory: 400Mi
  enableAdminAPI: false
```

### kube-state-metrics

```bash
# Installation mit kubectl
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kube-state-metrics/v2.1.0/examples/standard/cluster-role-binding.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kube-state-metrics/v2.1.0/examples/standard/cluster-role.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kube-state-metrics/v2.1.0/examples/standard/deployment.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kube-state-metrics/v2.1.0/examples/standard/service-account.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kube-state-metrics/v2.1.0/examples/standard/service.yaml
```

## Sicherheitsmonitoring

### Falco

Open-Source-Tool zur Erkennung von abnormalem Verhalten.

```yaml
# falco-rules.yaml
- rule: Terminal shell in container
  desc: A shell was spawned by a non-shell program in a container
  condition: container and proc.name = sh
  output: Shell spawned in a container (user=%user.name container=%container.id)
  priority: WARNING
```

### Wazuh

Umfassende Sicherheitsplattform für Bedrohungserkennung.

```yaml
# ossec.conf
<ossec_config>
  <client>
    <server>
      <address>wazuh-manager</address>
      <port>1514</port>
      <protocol>udp</protocol>
    </server>
  </client>
</ossec_config>
```

## Kostenüberwachung für Cloud-Ressourcen

### AWS Cost Explorer

```bash
# AWS CLI Beispiel
aws ce get-cost-and-usage \
    --time-period Start=2023-01-01,End=2023-01-31 \
    --granularity MONTHLY \
    --metrics "BlendedCost" "UnblendedCost" "UsageQuantity" \
    --group-by Type=DIMENSION,Key=SERVICE
```

### Cloudability / Apptio

SaaS-Lösungen für Cloud-Kostenmanagement und -optimierung.

```bash
# Typische Integration über Tags
aws ec2 create-tags --resources i-1234567890abcdef0 --tags Key=CostCenter,Value=Marketing
```

## Anomalieerkennung und automatisierte Reaktion

### Anomalie-Erkennung mit Prometheus

```yaml
# Prometheus Alert für Anomalien
groups:
- name: anomaly
  rules:
  - alert: AnomalousLatency
    expr: abs(rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m]) - avg_over_time(rate(http_request_duration_seconds_sum[1h]) / rate(http_request_duration_seconds_count[1h])[1d:1h])) > 0.2
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "Anomalous latency detected"
```

### Auto-Remediation mit AWS Lambda

```python
# AWS Lambda-Funktion zum automatischen Neustart eines Services
import boto3

def lambda_handler(event, context):
    ec2_client = boto3.client('ec2')
    instance_id = event['detail']['instance-id']
    
    # Instanz neustarten
    ec2_client.reboot_instances(InstanceIds=[instance_id])
    
    return {
        'statusCode': 200,
        'body': f'Rebooted instance {instance_id}'
    }
```

## Zusammenfassung

Ein effektives Monitoring-Setup sollte:

1. **Proaktiv** sein, nicht nur reaktiv
2. **Kontextreich** sein, mit korrelierenden Daten
3. **Automatisiert** sein, wo möglich
4. **Skalierbar** sein, mit der Infrastruktur mitwachsen
5. **Business-relevante** Metriken erfassen, nicht nur technische
