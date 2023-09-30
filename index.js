import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://admin:test012@todolistdb.15cuhfr.mongodb.net/listDB',{useNewUrlParser: true});
const itemsSchema = {
    sentence: String
}

const Item = mongoose.model("Item",itemsSchema);

let itemData = [];



app.get("/", async (req, res) => {
    
    const foundItems = await Item.find({});

    res.render("index.ejs",{Data: foundItems});     
});


app.post("/",(req,res)=>{
    
    let text = req.body["txt"];
    if(text==""){
        res.redirect("/");
    }
    const newItem = new Item({
        sentence: text
    });
    newItem.save();
    res.redirect("/");
});     
    

app.post("/delete",async (req,res)=>{
    const checkItemId = req.body.delItem;
    console.log(checkItemId);
    const del = await Item.findByIdAndRemove(checkItemId);
    res.redirect("/");
});


app.listen(port,(req,res)=>{
    console.log("Listening on "+port);
});