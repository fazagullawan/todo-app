const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];

function loadTasks() {
  try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    // storage not available, ignore
  }
}

function render() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) {
      li.classList.add("completed");
    }
    span.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      render();
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";
    del.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      render();
    });

    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });

  const left = tasks.filter(function (t) { return !t.done; }).length;
  counter.textContent = left + (left === 1 ? " task left" : " tasks left");
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }
  tasks.push({ text: text, done: false });
  taskInput.value = "";
  saveTasks();
  render();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
clearBtn.addEventListener("click", function () {
  tasks = tasks.filter(function (t) { return !t.done; });
  saveTasks();
  render();
});

loadTasks();
render();
