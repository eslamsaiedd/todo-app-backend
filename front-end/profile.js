document.addEventListener("DOMContentLoaded", async () => {
  const nameEl = document.getElementById("userName");
  const taskCountEl = document.getElementById("taskCount");

  // ✅ Get token
  const token = localStorage.getItem("token");

  if (!token) {
    nameEl.textContent = "Not logged in";
    return;
  }

  try {
    // ✅ Fetch user data
    const userRes = await fetch(
      "https://todo-app-backend-production-3ef7.up.railway.app/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const userData = await userRes.json();

    if (!userRes.ok) throw new Error(userData.message || "Failed to load user");
    nameEl.textContent = `${userData.data.firstName} ${userData.data.lastName}`;

    //! get user's tasks
    const tasksRes = await fetch(
      "https://todo-app-backend-production-3ef7.up.railway.app/api/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const tasks = await tasksRes.json();
    // Show user info
    if (tasks.length == 1) {
      taskCountEl.textContent = `1 Task`;
    } else {
      taskCountEl.textContent = `${tasks.length} Tasks`;
    }

    //! logout

    document.querySelector('.logout-btn').addEventListener('click', () => {
      localStorage.removeItem("token")
      alert("You have been logged out successfully!");
      window.location.href = "index.html";
    })


  } catch (err) {
    console.error("Error loading profile:", err);
    nameEl.textContent = "Error loading user";
  }
});

// document.addEventListener("DOMContentLoaded", async () => {
//   const nameEl = document.getElementById("userName");
//   const taskCountEl = document.getElementById("taskCount");

//   const token = localStorage.getItem("token");
//   if (!token) {
//     nameEl.textContent = "Not logged in";
//     return;
//   }

//   try {
//     // 🟢 Fetch user data
//     const userRes = await fetch("https://todo-app-backend-production-3ef7.up.railway.app//api/users/me", {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     const userData = await userRes.json();
//     if (!userRes.ok) throw new Error(userData.message || "Failed to load user");

//     nameEl.textContent = `${userData.data.firstName} ${userData.data.lastName}`;

//     // 🟢 Fetch user tasks
//     const taskRes = await fetch("https://todo-app-backend-production-3ef7.up.railway.app//api/tasks", {
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     });
//     const tasks = await taskRes.json();

//     // 🧮 Show task count
//     if (tasks.length === 1) {
//       taskCountEl.textContent = `1 Task`;
//     } else {
//       taskCountEl.textContent = `${tasks.length} Tasks`;
//     }

//   } catch (err) {
//     console.error("Error loading profile:", err);
//     nameEl.textContent = "Error loading user";
//   }
// });
