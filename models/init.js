const Student=require('./studentSchema.js')

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
    student_1.save();
}

initData();