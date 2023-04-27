const express = require("express");
const bpeh = require('express-body-parser-error-handler')
const app = express();
const PORT = process.env.PORT;

if (!PORT) {
    console.error("PORT is not set");
    process.exit(1);
}

const httpWrapper = () => {
    return `
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
                </style>
            </head>
            <html>
    
            <body>
                <h2>Naor's (Abu Emma) - Kube Workshop</h2>
    
                <div>
                    <img src="https://media4.giphy.com/media/haZOqHKz9tTfW/giphy.gif?cid=ecf05e47x1n1aqehi0uk6hwzx2pmvj0018zeiww7aruw4www&rid=giphy.gif&ct=g">
                <div>
                
                <div class="x">
                    <img src="https://github.com/ntedgi/kube-helm-workshop/blob/main/images/6ed3f654-53ab-4188-95a1-567e5d7218d6@3x.png?raw=true" alt="argo">
                    <img src="https://github.com/ntedgi/kube-helm-workshop/blob/main/images/helm-icon-white.png?raw=true" width="300" height="300" alt="argo">
                </div>
            </body>
        </html>
       `

}

app.listen(PORT, () => {
    console.log(`Application started and Listening on port ${PORT}`);
});

app.use(bpeh())
app.get("/", async (req, res) => {
    res.send(httpWrapper());
});