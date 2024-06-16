const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ dest: "uploads/" });

// In-memory storage for simplicity
let tasks = [];

// Load tasks from file if exists
try {
  if (fs.existsSync("tasks.json")) {
    const tasksData = fs.readFileSync("tasks.json", "utf8");
    tasks = JSON.parse(tasksData);
  }
} catch (error) {
  console.error("Error reading tasks.json:", error);
}

// Load users from file if exists
let users = [];
const usersFilePath = "users.json";

try {
  if (fs.existsSync(usersFilePath)) {
    const usersData = fs.readFileSync(usersFilePath, "utf8");
    users = JSON.parse(usersData);
  }
} catch (error) {
  console.error("Error reading users.json:", error);
}

// Routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true, idUser: user.id });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // // Проверка, существует ли пользователь с таким именем
  // const existingUser = users.find((u) => u.username === username);
  // if (existingUser) {
  //   return res.json({ success: false, message: "Username already taken" });
  // }

  // Создание нового пользователя
  const newUser = {
    id: Date.now(), // Используем текущую метку времени как ID
    username,
    password,
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.json({ success: true, idUser: newUser.id });
});

app.post("/api/add", upload.single("photo"), (req, res) => {
  const { idUser, text, description, lastDate } = req.body;
  const formattedDescription = description.replace(/\r\n/g, "\n");
  const newTask = {
    idTask: Date.now(),
    idUser: parseInt(idUser),
    text,
    description: formattedDescription,
    lastDate,
    photo: req.file ? `/uploads/${req.file.filename}` : null,
    answer: "",
  };
  tasks.push(newTask);
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  res.json({ success: true, idTask: newTask.idTask });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/del", (req, res) => {
  const { idUser, idTask } = req.body;
  const taskIndex = tasks.findIndex(
    (task) => task.idTask === idTask && task.idUser === idUser
  );
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "No rights to delete this task" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
