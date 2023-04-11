![My Image](./images/1680500943-185.220.207.86.png)


## License MIT © 
---
```ts
if (this.repo.isAwesome || this.repo.isHelpful) {
  Star(this.repo);
}
```

# Hands on Kube Workshop

at this workshop were going to pass on all basic usage of helm charts and kuberntis elements .


we going to cover all following :

* Understand Argo->GitOPS->Helm circle
* Update Charts Tags
* Create Helth Check 
* Create Livness check
* Connect To Other Pods 
* KubecTL inside PODS
* Inject Enviorment Veraibls
* Inject Config map


## Step 0 - Create a new UAT enviorment with your name 
* go to platformjs repository https://github.com/ironsource-mobile/platform-js/actions
* click on `Create workshop UAT`
* click `Run workflow`
* At Environment insert `workshop-${your name}` (for exmaple: workshop-orna)
* After job finish you will get 3 urls:
    * Env UI : ( https://ua-workshop.private-lb.ua-dev.us-east-1.ironsrc.mobi/)
    * Argo-CD managment for your current env
    * github branch for `apps-helm-cahrt` repository


## Step 1 - Change Image tag to correct one 
 * i accedently map the service PORT to wrong internal port 3324
  our server need to run on port 5400 please update the service internal port 
 * commit and push your chages and update argo 
  if everything works fine you should see a website at your ENV-UI
  

## Step 2 - Change Image tag to correct one 
 * i accedently create the workshop with the wrong image tag (`not-working`) 
 please update the tag to `latest`
 https://hub.docker.com/repository/docker/naortedgi/workshop/tags?page=1&ordering=last_updated
 * commit and push your chages and update argo 
 * if everything works fine you should see new  website at your ENV-UI

## Step 3 - please add an health check to your workshop POD 
* the pod expose an health check end point `/health`
* use it to configure the health check 
* if you need help check `apps-helm-charts-platform/values/ua/demand-platform/platform-js/values.yaml` for reference 
* make sure your health check pinging more the 5 times 
* if you set it right it will reflect on the ui 

## Step 4 - inject config map 
* please inject a new config map file to `/usr/local/app/config/setup.json`
the new file need to be 
    ```json
    {
        "appName": "YOUR_NAME"
    }
    ```
* don't be a child insert your real name (idan yossi noa meny etc ...) not YOUR_NAME!

## Step 5 - inject enviorment veraible 
open shell into the pod just like `docker exec`
read and delete `SECRET.txt` there you will find the host name for `friend` pod
the command you need is :
`kubectl -n <NAME-SPACE> exec -it <POD>`


## Step 6 - inject enviorment veraible 
* our server need to send request to other POD at the same enviorment 
* add new Enviorment veraible with the `FRIEND_HOST`
with the uri for the friend host and : `http://.../test/version ` 
* what is the host name of pods under the same namespace?

