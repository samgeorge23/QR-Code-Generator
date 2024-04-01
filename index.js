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
    res.render(__dirname+"/public/index.ejs");
});
var randomValue = "";

app.post("/generate-link",(req,res)=>{
    randomValue = Math.floor(Math.random()*500000)+1;
    var date = new Date();
    randomValue = date.toLocaleTimeString().split(" ")[0]+":"+date.getMilliseconds()+randomValue;
    randomValue = randomValue.replace(/:/g,"");
    let link = req.body["link"];
    let qr_png = qr.image(link,{type:"png",size:8});
    const imagePath = path.join(__dirname,`public/images/qr_code${randomValue}.png`);
    qr_png.pipe(fs.createWriteStream(imagePath));
    res.render(__dirname+"/public/qr.ejs",{randValue:randomValue});

});

app.get("/delete-qr-code",(req,res)=>{
    const imagePath = path.join(__dirname,`public/images/qr_code${randomValue}.png`);
    fs.unlink(imagePath,(err)=>{
        if(err){
            console.log("The file has already been deleted!");
        }
        res.redirect("/");
    });
});


app.listen(port, ()=>{
    console.log(`The server has started running on port ${port}.`);
});





