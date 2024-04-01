import express from "express";
import path from "path";
import url from "url";
import fs from "fs";
import qr from "qr-image";
import bodyParser from "body-parser";


const filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const app = express();
const port = 3000;



// This code below loads up the css files along with the html.
// this provides the root to serve static files/assets
app.use(express.static('public'));
app.use("/generate-link",bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/generate-link",(req,res)=>{
    let link = req.body["link"];
    let qr_png = qr.image(link,{type:"png",size:8});
    qr_png.pipe(fs.createWriteStream(__dirname+"/public/images/qr_code.png"));
    // because node.js this is server side scripting cannot access dom so cannot use commented code
    // let qr_code = document.querySelector(".qr-code");
    // console.log(qr_code.classList);
    res.sendFile(__dirname+"/public/qr.html");
});



app.listen(port, ()=>{
    console.log(`The server has started running on port ${port}.`);
});







