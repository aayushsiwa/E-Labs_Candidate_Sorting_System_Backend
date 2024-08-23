const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config();

let port = 8080;

// Middleware
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Requiring Files
const Student = require("./models/studentSchema");
const { validation } = require("./schemaValidation");

// Connection with the database
let mongoDB_URL = process.env.MONGODB_URL;

main()
    .then(() => {
        console.log("Connected With ELabs_Recruitment Database.");
    })
    .catch((err) => {
        console.log(err);
        console.log("Not Connected.");
    });

async function main() {
    await mongoose.connect(mongoDB_URL);
}

// Schema Validation
const validateSchema = async (req, res, next) => {
    let { error } = validation.validate(req.body);
    if (error) {
        throw new expressError(404, "Validation Error is there");
    } else {
        next();
    }
};

// Routes
app.get("/", (req, res) => {
    res.send("Salaam...");
});

// Home Page Route
app.get("/", (req, res) => {
    try {
        res.render("MainPage.ejs");
    } catch (err) {
        next(err);
    }
});

// Respective Domain Route
app.get("/domain/:respectiveDomain", async (req, res) => {
    let { respectiveDomain } = req.params;
    try {
        let data = await Student.find({ domain: respectiveDomain });
        res.json(data); // Return JSON data for API consumption
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

// app.get("/domain/:respectiveDomain", async (req, res) => {
//     let { respectiveDomain } = req.params;
//     try {
//         let data = await Student.find({ domain: respectiveDomain });

//         if (req.xhr || req.headers.accept.indexOf("json") > -1) {
//             //     // If the request is an XMLHttpRequest or expecting JSON, send JSON response
//             res.json(data);
//             // res.json(data);
//         } else {
//             //     // Otherwise, render the EJS template
//             res.render("DomainPage.ejs", { data });
//         }
//     } catch (err) {
//         res.status(500).send("Error fetching data");
//     }
// });

// app.get("/domain/:id/attendance", async (req, res) => {
//     let { id } = req.params;
//     try {
//         let data = await Student.findByIdAndUpdate(id, { present: true });
//         let { domain } = data;
//         res.redirect(`/domain/${domain}`);
//     } catch (err) {
//         res.status(500).send("Error updating attendance");
//     }
// });

app.post("/domain/:id/attendance", async (req, res) => {
    let { id } = req.params;
    try {
        // Find the student by ID
        let student = await Student.findById(id);

        // Check if student exists
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Toggle the attendance status
        student.present = !student.present;

        // Save the updated student record
        let updatedStudent = await student.save();

        // Respond with the updated student data
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).send("Error updating attendance");
    }
});

// app.get("/domain/:domain/interview", async (req, res) => {
//     let { domain } = req.params;
//     try {
//         let data = await Student.find({
//             $and: [
//                 { present: true },
//                 { interviewed: false },
//                 { domain: domain },
//             ],
//         });
//         res.render("InterviewPage.ejs", { data, domain });
//     } catch (err) {
//         res.status(500).send("Error fetching interview data");
//     }
// });

app.get("/domain/:domain/interview", async (req, res) => {
    let { domain } = req.params;
    try {
        let data = await Student.find({
            $and: [
                { present: true },
                { interviewed: false },
                { domain: domain },
            ],
        });
        res.json(data); // Return JSON data for API consumption
    } catch (err) {
        res.status(500).send("Error fetching interview data");
    }
});

app.get("/domain/:id/interview/openPopup", async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch the candidate data
        const student = await Student.findById(id);

        // Check if the student was found
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Determine if the interview is done
        const interviewDone = student.interviewed; // Assuming `interviewed` is a boolean field indicating interview completion

        // Return both candidate data and interview status
        res.json({
            candidate: {
                name: student.name,
                id: student._id,
                feedback: student.feedback,
                decision: student.decision,
                // Add any other fields you need here
            },
            interviewDone,
        });
    } catch (err) {
        console.error("Error fetching interview data:", err);
        res.status(500).send("Error fetching interview data");
    }
});

// Assuming you are using Express.js and Mongoose
app.post("/domain/:id/interview/toggleDecision", async (req, res) => {
    const { id } = req.params;
    try {
        // Find the student by ID
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Toggle the decision field
        student.decision = !student.decision;
        await student.save();

        res.json({ decision: student.decision });
    } catch (err) {
        console.error("Error toggling decision:", err);
        res.status(500).send("Error toggling decision");
    }
});

// Get current decision status
// Get current decision status
app.get("/domain/:id/interview/currentDecision", async (req, res) => {
    let { id } = req.params;
    try {
        let student = await Student.findById(id);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.json({decision:student.decision});
    } catch (err) {
        console.error("Error fetching current decision:", err);
        res.status(500).send("Error fetching current decision");
    }
});

app.get("/domain/:domain/interview/random", async (req, res) => {
    let { domain } = req.params;
    try {
        let data = await Student.findOne({
            $and: [
                { present: true },
                { interviewed: false },
                { domain: domain },
            ],
        });
        res.render("interviewPopup.ejs", { data });
    } catch (err) {
        res.status(500).send("Error fetching random interview data");
    }
});

app.get("/domain/:id/interviewed", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await Student.findByIdAndUpdate(id, { interviewed: true });
        let domain = data.domain[0];
        res.redirect(`/domain/${domain}/interview`);
    } catch (err) {
        res.status(500).send("Error updating interview status");
    }
});

// Handle interview feedback submission
app.post("/domain/:id/interview/submit", async (req, res) => {
    const { id } = req.params;
    const { feedback } = req.body;

    try {
        // Find the student by ID and update with feedback
        let student = await Student.findById(id);

        if (!student) {
            return res.status(404).send("Student not found");
        }

        // Assuming you want to store feedback directly in the student document
        student.feedback = feedback;
        student.interviewed = true; // Mark as interviewed
        await student.save();

        res.json({ domain: student.domain });
    } catch (err) {
        res.status(500).send("Error submitting feedback");
    }
});

app.get("*", (req, res) => {
    res.send("Page Not Found");
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
});

// Listening to Port
app.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});
