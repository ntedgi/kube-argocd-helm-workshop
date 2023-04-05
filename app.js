const express = require("express");
const fs = require("fs");
const { appName } = require("./config/setup.json");
const app = express();
const healthCheckCounts = 5;
const tasksCount = 6;
const demandHost = process.env.FRIEND_HOST
const PORT = process.env.PORT;

let healthCheck = 0

if (!PORT) {
    console.error("PORT is not set");
    process.exit(1);
}

async function fetchDemand() {
    try {
        const response = await fetch(demandHost + "/test/version")
        response.ok ? console.log("Demand is up") : console.log("Demand is down")
        return true
    } catch (e) {
        console.error(e)
    }

    return false
}

const marker = (bool) => {
    return bool ? "✅" : "❌"
}

const allDone = (server, hc, demand, cmap, secretFileExists) => {
    return server && hc && demand && cmap && secretFileExists ?
        `
    <div>
        <img src="https://media2.giphy.com/media/doUu2ByZDbPYQ/giphy.gif?cid=ecf05e470eulqmthdu36rqfrloolut7ofzvvir8a8khj64ac&rid=giphy.gif&ct=g" alt="Trulli" width="500" height="333">
        <img src="https://media0.giphy.com/media/StKiS6x698JAl9d6cx/200w.webp?cid=ecf05e47e6iokvc176c2uqh2pbw367detjfi9q9zkr2p4ull&rid=200w.webp&ct=g" alt="Trulli" width="500" height="333">
        <img src="https://media2.giphy.com/media/JlpjgShzDsrMIyFu5U/200.webp?cid=ecf05e471th7xkb7w1g1fbu866r6yvg58su8q2y7yf2zotr5&rid=200.webp&ct=g" alt="Trulli" width="500" height="333">
    <div>
    `:
        "<div/>"
}

const httpWrapper = (server, hc, demand, cmap, secretFileExists) => {
    return `
        <!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Allerta+Stencil">
            <div class="w3-container">
    

            <style>
                * {margin: 0; padding: 0}
                body {background: #000;}
                canvas {
                    display: block;
                    position:absolute;
                    left:0;
                    top:0;
                    z-index:-1;
                }
                body {
                    display: flex;
                    flex-direction: column;
                    background-color: black;
                    font-family: "Allerta Stencil", Sans-serif;
                    color: white;
                    align-items: center;
                    width: 100%;
                }

                h2 {
                    font-size: 2rem;
                    margin: 0;
                    padding: 10px;
                }
                table{
                    padding: 30px;
                }
                td,th {
                    text-align: left;
                    padding: 8px;
                    font-size: 1.5rem;
                    margin: 0;
                    padding: 2px;
                    font-family: "Allerta Stencil", Sans-serif;

                }
                .x{
                    display: flex;
                    margin-top: 100px;
                }
                .container-wrapper{
                    z-index:10000;
                    padding:100px;
                }
            </style>
        </head>
      <html>
        <body>
            <div class="container-wrapper">
                <h2>Naor's (Abu Emma) - Kube Workshop</h2>
                <div class="w3-light-grey">
                    <div class="w3-blue" style="height:24px;width:${[server, server, server, hc, cmap, demand].filter(it => it).length * 100 / (tasksCount)}%"></div>
                </div>

                <table>
                    <tr>
                        <th>Create new UAT Enviorment</th>
                        <th>(${marker(server)}) </th>
                    </tr>
                    <tr>
                        <th>Update image tag to latest</th>
                        <th>(${marker(server)}) </th>
                    </tr>
                    <tr>
                        <th>Server Up and Runing on port ${PORT} </th>
                        <th>(${marker(server)}) </th>
                    </tr>
                    <tr>
                        <th>Health Check Working ( /health ) | Ping ${healthCheck} times</th>
                        <th>(${marker(hc)}) </th>
                    </tr>
                    <tr>
                        <th>Config Map Injected Succefully | Your App Name Is: ${appName}) </th>
                        <th>(${marker(cmap)} </th>
                    </tr>
                    <tr>
                        <th>Kubectl exec it and connect to your POD | (dont forget to delete the secret)  </th>
                        <th>(${marker(secretFileExists)}) </th>
                    </tr>
                    <tr>
                        <th>Demand Connection Enabled ( process.env.FRIEND_HOST set to ${process.env.FRIEND_HOST} )</th>
                        <th>(${marker(demand)}) </th>
                    </tr>
                </table>
                ${allDone(server, hc, demand, cmap, secretFileExists)}
            <div>
        </body>
        <canvas></canvas>
        <script defer>
            var canvas = document.querySelector('canvas'),
                ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
            letters = letters.split('');

            var fontSize = 10,
                columns = canvas.width / fontSize;

            var drops = [];
            for (var i = 0; i < columns; i++) {
                drops[i] = 1;
            }

            function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, .1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < drops.length; i++) {
                    var text = letters[Math.floor(Math.random() * letters.length)];
                    ctx.fillStyle = '#0f0';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    drops[i]++;
                    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
                    drops[i] = 0;
                    }
                }
            }
            setInterval(draw, 33);
        </script>
    </html>
   `
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application started and Listening on port ${PORT}`);
});

app.get("/health", (req, res) => {
    if (healthCheck < healthCheckCounts) console.log("Health Check!");
    healthCheck++;
    res.status(200).send("OK");
});

app.get("/test/version", (req, res) => {
    res.status(200).send("1.0.0");
});


app.get("/", async (req, res) => {
    const server = true;
    const hc = healthCheck > healthCheckCounts;
    const demand = await fetchDemand();
    const secretFileExists = await fs.existsSync("./SECRET.txt");
    const cmap = appName !== 'argo-master'
    res.send(httpWrapper(server, hc, demand, cmap, !secretFileExists));
});