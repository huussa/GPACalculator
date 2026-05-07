loadSubjects();

document.addEventListener("input", saveSubjects);

function subject(subjectName = "", counter = 1){

    return `
        <p>
            subject 
            <span class="number-of-subjects">${counter}</span>
        </p>

        <div class="input-group subject-name">
            <h3>subject name</h3>

            <input 
                type="text"
                name="subject-name"
                value="${subjectName}"
                placeholder="Enter subject name"
            >
        </div>

        <div class="input-group">
            <h3>Hours</h3>

            <select name="hours" class="hours" required>

                <option value="" selected disabled hidden>
                    Choose hours
                </option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>

            </select>
        </div>

        <div class="input-group">

            <h3>Grade</h3>

            <select name="grade" class="grade" required>

                <option value="" selected disabled hidden>
                    Choose Grade
                </option>

                <option value="4.00">A+</option>
                <option value="3.75">A</option>
                <option value="3.50">B+</option>
                <option value="3.00">B</option>
                <option value="2.50">C+</option>
                <option value="2.00">C</option>
                <option value="1.50">D+</option>
                <option value="1.00">D</option>
                <option value="0.00">F</option>

            </select>
        </div>
    `;
}

function addSubject(subjectName = ""){

    const subjectsContainer =
    document.querySelector('.subjects-container');

    const newSubject =
    document.createElement('div');

    const counter =
    document.querySelectorAll('.subject').length + 1;

    newSubject.classList.add('subject');

    newSubject.innerHTML =
    subject(subjectName, counter);

    subjectsContainer.append(newSubject);
}

function deleteSubject(){

    const subjects =
    document.querySelectorAll(".subject");

    if(subjects.length > 1){

        subjects[subjects.length - 1].remove();

        saveSubjects();
    }
}

function showResult(){

    let totalHours = 0;
    let totalPoints = 0;
    let gpa = 0;

    const subjects =
    document.querySelectorAll(".subject");

    subjects.forEach(subject => {

        const subjecthours =
        subject.querySelector(".hours").value;

        const subjectgrade =
        subject.querySelector(".grade").value;

        totalHours += parseFloat(subjecthours);

        totalPoints +=
        parseFloat(subjectgrade) *
        parseFloat(subjecthours);
    });

    gpa = totalPoints / totalHours;

    let system =
    document.querySelector(
        'input[name="system"]:checked'
    ).value;

    if (totalHours === 0 || isNaN(gpa)) {

        document.getElementById("gpa").textContent =
        "don't forget to add hours and grades";

        return;
    }

    if(system == 1){
        gpa += 1;
    }

    document.getElementById("gpa").textContent =
    gpa.toFixed(2);

    saveSubjects();
}

function saveSubjects(){

    const subjectsName =
    document.querySelectorAll(
        'input[name="subject-name"]'
    );

    let subjects = [];

    subjectsName.forEach(subject => {

        subjects.push(subject.value);

    });

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}

function loadSubjects(){

    const savedSubjects =
    JSON.parse(localStorage.getItem("subjects"));

    if(!savedSubjects || savedSubjects.length === 0){
        return;
    }

    const subjectsContainer =
    document.querySelector('.subjects-container');

    subjectsContainer.innerHTML = "";

    savedSubjects.forEach(subjectName => {

        addSubject(subjectName);

    });
}