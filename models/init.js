const mongoose = require("mongoose");
const Student = require("./studentSchema.js");
require("dotenv").config();

// Connect to MongoDB
// get mogoDB_URI from .env file
const mongoDB_URL = process.env.MONGODB_URL;
// console.log(mongoDB_URL);

mongoose
    .connect(mongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        initData(); // Call initData after successful connection
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

let initData = () => {
    let student_1 = new Student({
        domain: "androiddevelopment",
        kiitemail: "22052736@kiit.ac.in",
        name: "MOHAMMAD DANYAAL",
        email: "mdasifnawaz545@gmail.com",
        roll: "22052736",
        gender: "Male",
        contactNumber: "7761054431",
        yearOfStudy: "2nd",
        branch: "CSE",
        links: {
            resume: "https://drive.google.com/file/d/1H_RMDI9CDBveYyy5w0VNjXymvtnfPHCk/view?usp=drive_link",
            github: "https://github.com/mdasifnawaz545",
            linkdin: "https://www.linkedin.com/in/mdasifnawaz/",
        },
        existSocieties: "Not Yet",
        whyElabs: "Good Society",
        anythingElse: "Nothing",
    });

    student_1
        .save()
        .then(() => console.log("Student data saved successfully"))
        .catch((err) => console.error("Error saving student data:", err))
        .finally(() => mongoose.connection.close()); // Close connection after saving
};

initData();
