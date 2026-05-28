const cgpaBtn = document.querySelector('.cgpa-container input[name="cgpa"]');
const textBox = document.querySelectorAll(".cgpa-container .textbox");
let isShown = false;
cgpaBtn.addEventListener("click", () => {
  textBox.forEach((box) => {
    box.classList.toggle("show");
    isShown = box.classList.contains("show") ? true : false;
  });
  document.querySelector(".result .p-CGPA").style.display = isShown
    ? "inline"
    : "none";
});
loadSubjects();

document.addEventListener("input", saveSubjects);
document.addEventListener("change", saveSubjects);

function subject(subjectName = "", subjectHours = "", counter = 1) {
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

                <option value="" disabled hidden>
                    Choose hours
                </option>

                <option value="1"
                ${subjectHours == "1" ? "selected" : ""}>
                    1
                </option>

                <option value="2"
                ${subjectHours == "2" ? "selected" : ""}>
                    2
                </option>

                <option value="3"
                ${subjectHours == "3" ? "selected" : ""}>
                    3
                </option>

                <option value="4"
                ${subjectHours == "4" ? "selected" : ""}>
                    4
                </option>

                <option value="5"
                ${subjectHours == "5" ? "selected" : ""}>
                    5
                </option>

                <option value="6"
                ${subjectHours == "6" ? "selected" : ""}>
                    6
                </option>

                <option value="7"
                ${subjectHours == "7" ? "selected" : ""}>
                    7
                </option>

                <option value="8"
                ${subjectHours == "8" ? "selected" : ""}>
                    8
                </option>

                <option value="9"
                ${subjectHours == "9" ? "selected" : ""}>
                    9
                </option>

                <option value="10"
                ${subjectHours == "10" ? "selected" : ""}>
                    10
                </option>

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

function addSubject(subjectName = "", subjectHours = "") {
  const subjectsContainer = document.querySelector(".subjects-container");

  const newSubject = document.createElement("div");

  const counter = document.querySelectorAll(".subject").length + 1;

  newSubject.classList.add("subject");

  newSubject.innerHTML = subject(subjectName, subjectHours, counter);

  subjectsContainer.append(newSubject);
}

function deleteSubject() {
  const subjects = document.querySelectorAll(".subject");

  if (subjects.length > 1) {
    subjects[subjects.length - 1].remove();

    saveSubjects();
  }
}

function showResult() {
  let totalHours = 0;
  let totalPoints = 0;
  let gpa = 0;

  const subjects = document.querySelectorAll(".subject");

  subjects.forEach((subject) => {
    const subjecthours = subject.querySelector(".hours").value;

    const subjectgrade = subject.querySelector(".grade").value;

    totalHours += parseFloat(subjecthours);

    totalPoints += parseFloat(subjectgrade) * parseFloat(subjecthours);
  });

  gpa = totalPoints / totalHours;

  let system = document.querySelector('input[name="system"]:checked').value;

  if (totalHours === 0 || isNaN(gpa)) {
    document.querySelector(".result p #gpa").textContent =
      "don't forget to add hours and grades";

    return;
  }

  if (system == 1) {
    gpa += 1;
  }
  document.querySelector(".result p #gpa").textContent = gpa.toFixed(2);

  if (isShown) {
    const cgpaResult = document.querySelector(".result p #cgpa");
    const currentCGPA = Number(textBox[0].value);
    const totalHoursCGPA = Number(textBox[1].value);
    if (
      isNaN(currentCGPA) ||
      isNaN(totalHoursCGPA) ||
      currentCGPA === totalHoursCGPA
    ) {
      cgpaResult.textContent =
        "don't forget to add the 'number' of total hours and your current CGPA";
      return;
    }
    let newCGPA =
      (currentCGPA * totalHoursCGPA + gpa * totalHours) /
      (totalHoursCGPA + totalHours);
    cgpaResult.textContent = newCGPA.toFixed(2);
  }

  saveSubjects();
}

function saveSubjects() {
  const subjects = document.querySelectorAll(".subject");

  let subjectsData = [];

  subjects.forEach((subject) => {
    const subjectName = subject.querySelector(
      'input[name="subject-name"]',
    ).value;

    const subjectHours = subject.querySelector(".hours").value;

    subjectsData.push({
      name: subjectName,

      hours: subjectHours,
    });
  });

  localStorage.setItem("subjects", JSON.stringify(subjectsData));
}

function loadSubjects() {
  const savedSubjects = JSON.parse(localStorage.getItem("subjects"));

  if (!savedSubjects || savedSubjects.length === 0) {
    return;
  }

  const subjectsContainer = document.querySelector(".subjects-container");

  subjectsContainer.innerHTML = "";

  savedSubjects.forEach((subject) => {
    addSubject(subject.name, subject.hours);
  });
}
