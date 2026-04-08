const API_URL = "http://localhost:3001/api/students";

document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const student = {
        name: document.getElementById("name").value,
        rollNo: document.getElementById("rollNo").value,
        course: document.getElementById("course").value,
        marks: document.getElementById("marks").value
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });
    loadStudents();
});

async function loadStudents() {
    const res = await fetch(API_URL);
    const students = await res.json();
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";
    students.forEach(s => {
        const row = `<tr>
            <td>${s.name}</td>
            <td>${s.rollNo}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td>
                <button onclick="deleteStudent(${s.id})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

async function deleteStudent(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadStudents();
}

loadStudents();