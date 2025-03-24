require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Create Schemas & Models
const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  email: String,
  password: String,
});

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const CommitteeSchema = new mongoose.Schema({
  name: String,
  email: String,
  post_id: String,
  password: String,
});

const Student = mongoose.model("Student", StudentSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);
const Committee = mongoose.model("Committee", CommitteeSchema);

// API Routes
app.post("/signup/student", async (req, res) => {
  try {
    const { name, rollNo, email, password } = req.body;
    const newStudent = new Student({ name, rollNo, email, password });
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving student" });
  }
});

app.post("/signup/teacher", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newTeacher = new Teacher({ name, email, password });
    await newTeacher.save();
    res.status(201).json({ message: "Teacher registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving teacher" });
  }
});

app.post("/signup/committee", async (req, res) => {
  try {
    const { name, email, post_id, password } = req.body;
    const newCommittee = new Committee({ name, email, post_id, password });
    await newCommittee.save();
    res.status(201).json({ message: "Committee member registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving committee member" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
