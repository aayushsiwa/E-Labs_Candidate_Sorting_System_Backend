const mongoose = require("mongoose");

// Defining the Shape of the Document i.e (Schema).

const studentSchema = new mongoose.Schema({
    domain: [
        {
            type: String,
            required: true,
        },
    ],
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
    kiitemail: {
        type: String,
        required: true,
        min: [12, "Enter Valid Email Address"],
    },
    name: {
        type: String,
        required: true,
        min: [2, "Enter Valid Name"],
    },
    email: {
        type: String,
        required: true,
        min: [12, "Enter Valid Email Address"],
    },
    roll: {
        type: Number,
        required: true,
        min: [4, "Enter Valid Roll Number"],
    },
    gender: {
        type: String,
        required: true,
        min: [4, "Enter Your Gender"],
    },
    contactNumber: {
        type: Number,
        required: true,
        min: [10, "Enter Valid Contact Number"],
    },
    yearOfStudy: {
        type: String,
        required: true,
        // enum: ["1st", "2nd", "3rd", "4th"],
        min: [1, "Enter Valid Year of Study"],
    },
    branch: {
        type: String,
        required: true,
        min: [4, "Enter Valid Roll Number"],
    },
    links: {
        resume: {
            type: String,
            required: true,
        },
        github: {
            type: String,
            required: true,
        },
        linkdin: {
            type: String,
            required: true,
        },
    },
    existSocieties: {
        type: String,
        required: true,
    },
    whyElabs: {
        type: String,
        required: true,
    },
    anythingElse: {
        type: String,
    },
    present: {
        type: Boolean,
        default: false,
    },
    interviewed: {
        type: Boolean,
        default: false,
    },
    feedback: {
        type: String,
        default: "", // You can set any default value or keep it empty
    },
    decision: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("student", studentSchema);
// let anddev = new mongoose.Model("anddev", studentSchema);
// let cloud = new mongoose.Model("cloud", studentSchema);
// let javaFB = new mongoose.Model("javaFB", studentSchema);
// let contentCR = new mongoose.Model("contentCR", studentSchema);
// let uiuxGD = new mongoose.Model("uiuxGD", studentSchema);
// let vidEdt = new mongoose.Model("vidEdt", studentSchema);
// let sme = new mongoose.Model("sme", studentSchema);
// let photoVideo = new mongoose.Model("photoVideo", studentSchema);
// let mktPR = new mongoose.Model("mktPR", studentSchema);
// let aiML = new mongoose.Model("aiML", studentSchema);
// let embdS = new mongoose.Model("embdS", studentSchema);
// let iot = new mongoose.Model("iot", studentSchema);
// let arVR = new mongoose.Model("arVR", studentSchema);

// module.exports = { webdev, anddev, cloud, javaFB, contentCR, uiuxGD, vidEdt, sme, photoVideo, mktPR, aiML, embdS, iot, arVR };
