// Process dotenv file configuration

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const app = express();

let port = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "/views"))

// Requiring Files

const Student = require('./models/studentSchema');
const { log } = require("console");
// const {validation}=require('./schemaValidation');


// Connection with the database

// let mongoDB_URL=process.mongoDB_URL;
let mongoDB_URL = "mongodb://127.0.0.1/ELabs_Recruitment";


main()
    .then(() => {
        console.log("Connected With ELabs_Recruitment Database.");
    })
    .catch((err) => {
        console.log(err);
        console.log("Not Connected.");
    })

async function main() {
    await mongoose.connect(mongoDB_URL);
}


// Schema Validation
// const validation = async (req, res, next) => {
//     let { error } = validation.validate(req.body);
//     if (error) {
//         throw new expressError(404, "Validation Error is there");
//     }
//     else {
//         next();
//     }

// }

// Listening to Port

app.listen(port, (req, res) => {
    console.log(`Listening to Port ${port}`);
})

// Home Route

app.get("/", (req, res) => {
    res.send("Salaam...");
})


// Candidate Form Page Routes

// app.get("/form", (req, res) => {
//     try {
//         res.render("form.ejs");
//     }
//     catch (err) {
//         next();
//     }
// })


// Home Page Route

app.get("/", (req, res) => {
    try {
        res.render("MainPage.ejs");
    }
    catch (err) {
        next(err)
    }
});


// Respective Domain Route


app.get("/domain/:respectiveDomain", async (req, res) => {
    let { respectiveDomain } = req.params;
    let data = await Student.find({ domain: respectiveDomain });
    res.render("DomainPage.ejs", { data })
})



app.get("/domain/:id/attendance", async (req, res) => {
    let { id } = req.params;
    let data = await Student.findByIdAndUpdate(id, { present: true });
    let { domain } = data;
    res.redirect(`/domain/${domain}`);

})



app.get("/domain/:domain/interview", async (req, res) => {
    let { domain } = req.params;
    let data = await Student.find({ $and: [{ present: true }, { interviewed: false }, { domain: domain }] });

    res.render("InterviewPage.ejs", { data, domain });
})


app.get("/domain/:id/interview/openPopup", async (req, res) => {
    let { id } = req.params;
    let data = await Student.findOne({ $and: [{ _id: id }, { present: true }, { interviewed: false }] });
    res.render("interviewPopup.ejs", { data });
})


app.get("/domain/:domain/interview/random", async (req, res) => {

    let { domain } = req.params
    let data = await Student.findOne({ $and: [{ present: true }, { interviewed: false },{domain:domain}] });

    res.render("interviewPopup.ejs", { data });

})

app.get("/domain/:id/interviewed", async (req, res) => {
    let { id } = req.params;
    let data = await Student.findByIdAndUpdate(id, { interviewed: true })
    console.log(data)
    let domain=data.domain[0];
    console.log(domain);
    res.redirect(`/domain/${domain}/interview`)
})

app.get("*",(req,res)=>{
    res.send("Page Not Found")
})

app.use((err,req,res,next)=>{
    console.log("error handling middlerware")
    next(err);
})