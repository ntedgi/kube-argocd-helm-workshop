const express = require("express");
const { appName } = require("./config/setup.json");
const app = express();
let healthCheck = 0
const demandHost = process.env.DEMAND_HOST
const PORT = process.env.PORT;
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
const allDone = (server, hc, demand) => {
    return server && hc && demand ?
        `
    <div>
        <img src="https://media2.giphy.com/media/doUu2ByZDbPYQ/giphy.gif?cid=ecf05e470eulqmthdu36rqfrloolut7ofzvvir8a8khj64ac&rid=giphy.gif&ct=g" alt="Trulli" width="500" height="333">
        <img src="https://media0.giphy.com/media/StKiS6x698JAl9d6cx/200w.webp?cid=ecf05e47e6iokvc176c2uqh2pbw367detjfi9q9zkr2p4ull&rid=200w.webp&ct=g" alt="Trulli" width="500" height="333">
        <img src="https://media2.giphy.com/media/JlpjgShzDsrMIyFu5U/200.webp?cid=ecf05e471th7xkb7w1g1fbu866r6yvg58su8q2y7yf2zotr5&rid=200.webp&ct=g" alt="Trulli" width="500" height="333">
    <div>
    `:
        "<div/>"
}
// const httpWrapper = (server, hc, demand, cmap) => {
//     return `<!DOCTYPE html>
//             <html>
//                 <body>
//                     <h2>Naor's (Abu Emma) Kube Workshop</h2>
//                     <ul>
//                         <li>Server Up and Runing on port ${PORT} (${marker(server)}) </li>
//                         <li>Health Check Working ( /health ) | Ping ${healthCheck} times (${marker(hc)}) </li>
//                         <li>Config Map Injected Succefully (${marker(cmap)}) </li>
//                         <li>Demand Connection Enabled ( process.env.DEMAND_HOST set to ${demandHost} )(${marker(demand)}) </li>
//                     </ul>  
//                     ${allDone(server, hc, demand)}
//                 </body >
//             </html >
//     `
// }



const httpWrapper = (server, hc, demand, cmap) => {
    return`
        <!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Allerta+Stencil">
            <div class="w3-container">

            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    background-color: black;
                    font-family: "Allerta Stencil", Sans-serif;
                    color: white;
                    align-items: center;
                }

                h2 {
                    font-size: 2rem;
                    margin: 0;
                    padding: 10px;
                }

                td,th {
                    text-align: left;
                    padding: 8px;
                    font-size: 1.5rem;
                    margin: 0;
                    padding: 2px;
                    font-family: "Allerta Stencil", Sans-serif;

                }
            </style>
        </head>
        <html>

        <body>
            <h2>Naor's (Abu Emma) - Kube Workshop</h2>

            <div class="w3-light-grey">
                <div class="w3-blue" style="height:24px;width:${[server, hc, cmap, demand].filter(it => it).length * 25}%"></div>
            </div>

            <table>
                <tr>
                    <th>Server Up and Runing on port 7777 </th>
                    <th>(${marker(server)}) </th>
                </tr>
                <tr>
                    <th>Health Check Working ( /health ) | Ping 0 times</th>
                    <th>(${marker(hc)}) </th>
                </tr>
                <tr>
                    <th>Config Map Injected Succefully </th>
                    <th>(${marker(cmap)}) </th>
                </tr>
                <tr>
                    <th>Demand Connection Enabled ( process.env.DEMAND_HOST set to undefined )</th>
                    <th>(${marker(demand)}) </th>
                </tr>
            </table>
            ${allDone(server, hc, demand)}
        </body>
    </html>
   `
}


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application started and Listening on port ${PORT}`);
});

app.get("/health", (req, res) => {
    healthCheck++;
    res.status(200).send("OK");
});

app.get("/", async (req, res) => {
    const server = true;
    const hc = healthCheck > 5;
    const demand = await fetchDemand();
    const cmap = appName !== 'your_name'
    res.send(httpWrapper(server, hc, demand));
});