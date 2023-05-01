# to create a new pod we need to define it in 3 diffrent files

### 1) define at `Chart.yaml` the alias will be used as the key in other files and host for connection with other pods

```yaml
- name: base-app
  alias: friend
  repository: https://nexus.service.ironsrc.mobi/repository/mobile-helm-charts
  version: 2.0.44
```


### 2) define at `dev-01.yaml` the tag of the image dev is the name of the cluster and this file is clusterd specific 

```yaml
friend:
  environment: "dev"
  image:
    tag: latest
```

### 3) define at `platform-dev-01.yaml` 

```yaml
friend:
  clusterNum: "01"
  team: platform
```
### 4) define at `values.yaml` 
```yaml
friend:
  appName: friend
  project: demand-platform
  owner: demand
  clusterNum: ""
  team: ua
  image:
    repository: naortedgi/workshop
  service:
    ports:
      http:
        externalPort: 80
        internalPort: 5400
        protocol: TCP
  virtualService:
    enabled: false
  livenessProbe:
    enabled: false
  resources:
    limits:
      cpu: 1
      memory: 256Mi
    requests:
      cpu: 1
      memory: 256Mi


