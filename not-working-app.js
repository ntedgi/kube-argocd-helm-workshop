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
                <div>
                     <img src="https://media4.giphy.com/media/haZOqHKz9tTfW/giphy.gif?cid=ecf05e47x1n1aqehi0uk6hwzx2pmvj0018zeiww7aruw4www&rid=giphy.gif&ct=g">
                <div>
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


app.listen(PORT, () => {
    console.log(`Application started and Listening on port ${PORT}`);
});

app.use(bpeh())
app.get("/", async (req, res) => {
    res.send(httpWrapper());
});