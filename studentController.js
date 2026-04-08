const db = require('../db');

// Get all students
exports.getStudents = (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Add student
exports.addStudent = (req, res) => {
    const { name, rollNo, course, marks } = req.body;
    db.query("INSERT INTO students (name, rollNo, course, marks) VALUES (?, ?, ?, ?)",
        [name, rollNo, course, marks],
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Student added", id: result.insertId });
        });
};

// Update student
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, rollNo, course, marks } = req.body;
    db.query("UPDATE students SET name=?, rollNo=?, course=?, marks=? WHERE id=?",
        [name, rollNo, course, marks, id],
        (err) => {
            if (err) throw err;
            res.json({ message: "Student updated" });
        });
};

// Delete student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM students WHERE id=?", [id], (err) => {
        if (err) throw err;
        res.json({ message: "Student deleted" });
    });
};