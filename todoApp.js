// // const { put } = require("../back-end/routes/userroutes");

// // 👤 الانتقال إلى البروفايل
// document.getElementById("accountIcon").addEventListener("click", () => {
//   window.location.href = "profile.html";
// });

// const token = localStorage.getItem('token')

// //! get all tasks from api
// async function getAllTasks() {
// const res = await fetch("https://todo-app-backend-production-3ef7.up.railway.app//api/tasks", {
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   })

//   const tasks = await res.json()
//   renderTasks(tasks)
// }
// getAllTasks()

// // 🖊️ عرض المهام
// function renderTasks(tasks) {
//   const container = document.getElementById("tasksContainer");
//   container.innerHTML = ""
//   tasks.forEach((task, index) => {
//     const div = document.createElement("div");
//     div.classList.add("task");
//     if (task.done) div.classList.add("done");

//     div.innerHTML = `
//       <div>
//         <span class="status-toggle" onclick="toggleTask(${task._id})">
//           ${task.done ? "✅" : "⬜"}
//         </span>
//         <span>${task.title}</span>
//       </div>
//       <button onclick="deleteTask(${index})">🗑️</button>
//     `;
//     container.appendChild(div);
//   });
// }

// async function toggleTask(id) {
//   await fetch(`http://localhost:4000/api/tasks/${id}`, {
//     method: 'put',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//   getAllTasks()
// }

// // 🗑️ حذف مهمة
// async function deleteTask(id) {
//   await fetch(`http://localhost:4000/api/tasks/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   });
//   getAllTasks();
// }

// // ➕ إضافة مهمة
// document.getElementById("addTaskBtn").addEventListener("click", async () => {
//   const input = document.getElementById("taskInput");
//   const title = input.value.trim()
//   if(!title) return

//   const res = await fetch("http://localhost:4000/api/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify({ title })
//   });

//   const newTask = await res.json()
//   renderTasks(newTask)
//   input.value = "";
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // جِيب اسم المستخدم من localStorage
//   const userName = localStorage.getItem("userName") || "User";

//   // غيّر النص بتاع الترحيب
//   const heading = document.querySelector("h1");
//   heading.textContent = `Welcome back, ${userName} 👋`;

//   renderTasks();
// });

// move for your profile
document.getElementById("accountIcon").addEventListener("click", () => {
  window.location.href = "profile.html";
});

const token = localStorage.getItem("token");

// get all the tasks from api
async function getAllTasks() {
  const res = await fetch("http://localhost:4000/api/tasks", {
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
    if (task.completed) div.classList.add("done"); // ✅ لاحظ: في الـ backend الحقل اسمه completed مش done

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
  await fetch(`http://localhost:4000/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  getAllTasks();
}

// delete a task
async function deleteTask(id) {
  await fetch(`http://localhost:4000/api/tasks/${id}`, {
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

  const res = await fetch("http://localhost:4000/api/tasks", {
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

document.addEventListener("DOMContentLoaded", async () => {
  const userRes = await fetch("http://localhost:4000/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = await userRes.json();

  const heading = document.querySelector("h1");
  heading.textContent = `Welcome back, ${userData.data.firstName} 👋`;

  getAllTasks();
});
