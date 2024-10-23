document.addEventListener("DOMContentLoaded", () => {
    // grabbing all elements
    const markCardContainer = document.getElementById("mark-container");
    const markCardTemplate = document.getElementById("mark-card-template");
    const calculateBtn = document.getElementById("calculate-btn");
    const cgpaDisplayTemplate = document.getElementById(
        "cgpa-display-template"
    );
    const resultDisplay = document.getElementById("result-display");
    const calculateAnother = document.getElementById("calculate-another");

    // ALL Subjects
    const subjects = [
        {
            name: "Fundamental Bangla Language",
            credit: 2.0,
            courseCode: "BAN 1101",
            shortName: "FBL",
        },
        {
            name: "Computer Fundamentals and Ethics",
            credit: 1.5,
            courseCode: "CSE 1111",
            shortName: "CFE",
        },
        {
            name: "Programming Fundamentals",
            credit: 3.0,
            courseCode: "CSE 1113",
            shortName: "PF",
        },
        {
            name: "Programming Fundamentals Lab",
            credit: 1.5,
            courseCode: "CSE 1114",
            shortName: "PFL",
        },
        {
            name: "Intro to Electrical Engineering",
            credit: 3.0,
            courseCode: "EEE 1101",
            shortName: "IEE",
        },
        {
            name: "Intro to Electrical Engineering Lab",
            credit: 1.5,
            courseCode: "EEE 1102",
            shortName: "IEEL",
        },
        {
            name: "General English",
            credit: 3.0,
            courseCode: "ENG 1101",
            shortName: "GE",
        },
        {
            name: "Differential and Integral Calculus",
            credit: 3.0,
            courseCode: "MAT 1203",
            shortName: "DIC",
        },
        {
            name: "Mechanical Engineering Drawing",
            credit: 0.75,
            courseCode: "ME 1104",
            shortName: "MED",
        },
    ];

    // rendering the cards
    renderInputCards();

    // adding event listener to btn
    calculateBtn.addEventListener("click", () => {
        // get the input values
        const values = getValues();

        if (values) {
            // calculate the cgpa
            const cgpa = calculateCGPA(values).toFixed(2);

            // display the cgpa
            displayCGPA(cgpa);
        }
    });

    // starting again btn
    calculateAnother.addEventListener("click", () => {
        resultDisplay.innerHTML = "";
        calculateBtn.classList.remove("hidden");
        calculateAnother.classList.add("hidden");
        renderInputCards();
    });

    // calculating the cgpa
    function calculateCGPA(values) {
        let totalCredits = 0;
        let totalGradePoints = 0;

        subjects.forEach((subject) => {
            // looping through all subjects
            const grade = getGrade(values[subject.shortName.toLowerCase()]);
            totalGradePoints += grade * subject.credit;
            totalCredits += subject.credit;
        });

        return totalGradePoints / totalCredits;
    }

    // displaying the final results
    function displayCGPA(cgpa) {
        markCardContainer.innerHTML = "";
        calculateBtn.classList.add("hidden");
        calculateAnother.classList.remove("hidden");

        const resultCard = cgpaDisplayTemplate.content.cloneNode(true);

        const img = cgpa <= 1.5 ? "sad.png" : "happy.png";

        resultCard.querySelector("img").setAttribute("src", `./images/${img}`);
        resultCard.querySelector("#cgpa-num").innerHTML = `${cgpa}/4.00`;

        resultCard.querySelector("#final-grade").innerHTML = cgpaToGrade(cgpa);
        resultDisplay.appendChild(resultCard);
    }

    // converting the mark to grade
    function getGrade(number) {
        if (number >= 80) return 4.0;
        else if (number >= 75) return 3.75;
        else if (number >= 70) return 3.5;
        else if (number >= 65) return 3.25;
        else if (number >= 60) return 3.0;
        else if (number >= 55) return 2.75;
        else if (number >= 50) return 2.5;
        else if (number >= 45) return 2.25;
        else if (number >= 40) return 2.0;
        else return 0.0;
    }

    function cgpaToGrade(cgpa) {
        if (cgpa >= 3.7 && cgpa <= 4.0) return "A+";
        else if (cgpa >= 3.3 && cgpa < 3.7) return "A";
        else if (cgpa >= 3.0 && cgpa < 3.3) return "A-";
        else if (cgpa >= 2.7 && cgpa < 3.0) return "B+";
        else if (cgpa >= 2.3 && cgpa < 2.7) return "B";
        else if (cgpa >= 2.0 && cgpa < 2.3) return "B-";
        else if (cgpa >= 1.7 && cgpa < 2.0) return "C+";
        else if (cgpa >= 1.3 && cgpa < 1.7) return "C";
        else if (cgpa >= 1.0 && cgpa < 1.3) return "C-";
        else return "F";
    }

    // getting values from the input fields
    function getValues() {
        const values = {};

        for (let i = 0; i < subjects.length; i++) {
            const id = subjects[i].shortName.toLowerCase();

            if (document.getElementById(id).value === "") {
                alert(`Please enter the mark of ${subjects[i].name}.`);
                document.getElementById(id).focus();
                return false;
            }

            const valueInNum = Number(document.getElementById(id).value);

            if (!(valueInNum >= 0 && valueInNum <= 100)) {
                alert(`Invalid mark in ${subjects[i].name}. 0 <= mark <= 100 `);
                document.getElementById(id).focus();
                return false;
            }

            values[id] = Number(document.getElementById(id).value);
        }

        return values;
    }

    // rendering the subject mark input cards
    function renderInputCards() {
        subjects.forEach((subject) => {
            // clone the mark card template
            const card = markCardTemplate.content.cloneNode(true);

            // set the name of the course
            card.querySelector("p").textContent = subject.name;

            // set the placeholder of the input
            card.querySelector("input").setAttribute(
                "placeholder",
                `Mark of ${subject.shortName}`
            );

            // setting id
            card.querySelector("input").setAttribute(
                "id",
                `${subject.shortName.toLowerCase()}`
            );

            // append the card to the container
            markCardContainer.appendChild(card);
        });
    }
});
