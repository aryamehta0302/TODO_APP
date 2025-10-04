document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  if (!form) return;

  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("taskDeadline");
  const list = document.getElementById("taskList");
  const markAll = document.getElementById("markAll");
  const clearCompleted = document.getElementById("clearCompleted");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let filter = localStorage.getItem("filter") || "all";

  const save = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("filter", filter);
  };

  const render = () => {
    let data = tasks;
    if (filter === "active") data = tasks.filter(t => !t.done);
    if (filter === "completed") data = tasks.filter(t => t.done);

    list.innerHTML = data.length
      ? data.map((t, i) => `
        <li class="flex justify-between items-center
                   bg-gray-100 dark:bg-gray-700
                   border border-gray-200 dark:border-gray-600
                   p-3 rounded-lg transition-all">
          <div>
            <div class="${t.done ? 'line-through text-gray-400' : ''} font-medium">${t.text}</div>
            <div class="text-xs text-gray-500 dark:text-gray-300 mt-1">
              Deadline: ${t.deadline || 'None'}
            </div>
          </div>
          <div class="flex gap-2">
            ${!t.done ? `
              <button onclick="complete(${i})"
                class="px-3 py-1 text-xs rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition">
                Mark Complete
              </button>` : `
              <span class="text-green-400 text-xs font-semibold">✔ Completed</span>
            `}
            <button onclick="remove(${i})"
              class="px-3 py-1 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition">
              Remove
            </button>
          </div>
        </li>`).join("")
      : `<li class="text-center text-gray-500 text-sm">No tasks ✨</li>`;
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return alert("Enter a task");
    tasks.push({ text, deadline: dateInput.value, done: false });
    input.value = dateInput.value = "";
    save();
    render();
  });

  // ✅ Mark as complete
  window.complete = i => { 
    tasks[i].done = true; 
    save(); 
    render(); 
  };

  // 🗑 Remove
  window.remove = i => { 
    tasks.splice(i, 1); 
    save(); 
    render(); 
  };

  // Bulk actions
  markAll.onclick = () => { 
    tasks = tasks.map(t => ({ ...t, done: true })); 
    save(); 
    render(); 
  };
  clearCompleted.onclick = () => { 
    tasks = tasks.filter(t => !t.done); 
    save(); 
    render(); 
  };

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");
      filter = btn.dataset.filter;
      save(); 
      render();
    });
  });

  render();
});
