const express = require("express");
const app = express();
const PORT = process.env.PORT;
if (!PORT) {
    console.error("PORT is not set");
    process.exit(1);
}

const httpWrapper = () => {
    return `<!DOCTYPE html>
            <html>
                <body>
                    <h2>Naor's (Abu Emma) Kube Workshop</h2>
                    <ul>
                        <li>Server Up and Runing on port ${PORT} ("❌") </li>
                    </ul> 
                    <div>
                        <img src="https://media4.giphy.com/media/haZOqHKz9tTfW/giphy.gif?cid=ecf05e47x1n1aqehi0uk6hwzx2pmvj0018zeiww7aruw4www&rid=giphy.gif&ct=g">
                    <div>
                </body >
            </html >
    `
}

app.listen(PORT, () => {
    console.log(`Application started and Listening on port ${PORT}`);
});


app.get("/", async (req, res) => {
    res.send(httpWrapper());
});