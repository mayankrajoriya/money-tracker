var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

const DATABASE_URL = "mongodb+srv://mayank601665:mayank601665@cluster0.dxrbe.mongodb.net/money-tracker?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection
db.on('error', ()=> console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/add", (req,res) =>{
    var category_select = req.body.category_select
    var amount_input= req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "Category": category_select,
        "Amount" : amount_input,
        "Info": info,
        "Date": date_input
    }
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")

    })
})
app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000)

console.log("Listening on port 5000")