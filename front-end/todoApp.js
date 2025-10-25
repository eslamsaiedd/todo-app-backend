// // move for your profile
// document.getElementById("accountIcon").addEventListener("click", () => {
//   window.location.href = "profile.html";
// });

// const token = localStorage.getItem("token");

// // get all the tasks from api
// async function getAllTasks() {
//   const res = await fetch("https://todo-app-backend-production-3ef7.up.railway.app/api/tasks", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const tasks = await res.json();
//   renderTasks(tasks);
// }

// // display all tasks
// function renderTasks(tasks = []) {
//   const container = document.getElementById("tasksContainer");
//   container.innerHTML = "";

//   tasks.forEach((task) => {
//     const div = document.createElement("div");
//     div.classList.add("task");
//     if (task.completed) div.classList.add("done"); // ✅ لاحظ: في الـ backend الحقل اسمه completed مش done

//     div.innerHTML = `
//       <div>
//         <span class="status-toggle" onclick="toggleTask('${task._id}')">
//           ${task.completed ? "✅" : "⬜"}
//         </span>
//         <span>${task.title}</span>
//       </div>
//       <button onclick="deleteTask('${task._id}')">🗑️</button>
//     `;

//     container.appendChild(div);
//   });
// }

// // change status for tasks
// async function toggleTask(id) {
//   console.log("🔹 toggling task id:", id);
//   await fetch(`https://todo-app-backend-production-3ef7.up.railway.app/api/tasks/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   getAllTasks();
// }

// // delete a task
// async function deleteTask(id) {
//   await fetch(`https://todo-app-backend-production-3ef7.up.railway.app/api/tasks/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   getAllTasks();
// }

// // add new task
// document.getElementById("addTaskBtn").addEventListener("click", async () => {
//   const input = document.getElementById("taskInput");
//   const title = input.value.trim();
//   if (!title) return;

//   const res = await fetch("https://todo-app-backend-production-3ef7.up.railway.app/api/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ title }),
//   });

//   const newTask = await res.json();
//   getAllTasks();
//   input.value = "";
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   const userRes = await fetch("https://todo-app-backend-production-3ef7.up.railway.app/api/users/me", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const userData = await userRes.json();

//   const heading = document.querySelector("h1");
//   heading.textContent = `Welcome back, ${userData.data.firstName} 👋`;

//   getAllTasks();
// });

//!

// move to your profile
document.getElementById("accountIcon").addEventListener("click", () => {
  window.location.href = "profile.html";
});

const token = localStorage.getItem("token");



// get all the tasks from api
async function getAllTasks() {
  const res = await fetch("https://todo-app-backend-production-3ef7.up.railway.app/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tasks = await res.json();
  renderTasks(tasks);
}

// display all tasks
function renderTasks(tasks = []) {
  const container = document.getElementById("tasksContainer");
  container.innerHTML = "";

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    if (task.completed) div.classList.add("done"); // ✅ في الـ backend الحقل اسمه completed

    div.innerHTML = `
      <div>
        <span class="status-toggle" onclick="toggleTask('${task._id}')">
          ${task.completed ? "✅" : "⬜"}
        </span>
        <span>${task.title}</span>
      </div>
      <button onclick="deleteTask('${task._id}')">🗑️</button>
    `;

    container.appendChild(div);
  });
}

// change status for tasks
async function toggleTask(id) {
  console.log("🔹 toggling task id:", id);
  await fetch(`https://todo-app-backend-production-3ef7.up.railway.app/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  getAllTasks();
}

// delete a task
async function deleteTask(id) {
  await fetch(`https://todo-app-backend-production-3ef7.up.railway.app/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  getAllTasks();
}

// add new task
document.getElementById("addTaskBtn").addEventListener("click", async () => {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  const res = await fetch("https://todo-app-backend-production-3ef7.up.railway.app/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  const newTask = await res.json();
  getAllTasks();
  input.value = "";
});

// DOMContentLoaded: fetch user info and tasks
document.addEventListener("DOMContentLoaded", async () => {
  const userRes = await fetch("https://todo-app-backend-production-3ef7.up.railway.app/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Date.now() / 1000;

  if (payload.exp < currentTime) {
    localStorage.removeItem("token"); 
    window.location.href = "index.html"; 
  }

  const userData = await userRes.json();
  const heading = document.querySelector("h1");
  heading.textContent = `Welcome back, ${userData.data.firstName} 👋`;

  getAllTasks();
});
