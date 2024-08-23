const { MongoClient } = require("mongodb");
require("dotenv").config();

// Get MongoDB URI from .env file
const mongoDB_URL = process.env.MONGODB_URL;

// Define a function to initialize the data
async function initData(client) {
    const database = client.db();  // Use the default database specified in the URI
    const studentsCollection = database.collection("students");  // Replace "students" with your collection name

    const student_1 = {
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
    };

    try {
        // Insert the student data into the collection
        const result = await studentsCollection.insertOne(student_1);
        console.log(`Student data saved successfully with _id: ${result.insertedId}`);
    } catch (err) {
        console.error("Error saving student data:", err);
    }
}

async function main() {
    const client = new MongoClient(mongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB");

        // Initialize data
        await initData(client);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    } finally {
        // Close the connection to MongoDB
        await client.close();
        console.log("Connection to MongoDB closed");
    }
}

// Run the main function to connect to the database and initialize data
main();
