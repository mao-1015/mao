const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const badge = document.querySelector("#countBadge");
const dateText = document.querySelector("#dateText");

const todos = [
  { text: "整理今天的学习计划", done: false },
  { text: "完成一个前端小页面", done: true },
  { text: "喝水并休息 10 分钟", done: false },
];

dateText.textContent = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(new Date());

function renderTodos() {
  list.innerHTML = "";
  badge.textContent = `${todos.length} 项`;

  if (todos.length === 0) {
    list.innerHTML = `<li class="empty">暂无任务，添加一个试试吧！</li>`;
    return;
  }

  todos.forEach((todo, index) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.done ? " done" : ""}`;

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.title = "点击切换完成状态";
    text.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      renderTodos();
    });

    const remove = document.createElement("button");
    remove.className = "delete-btn";
    remove.textContent = "删除";
    remove.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    item.append(text, remove);
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  todos.unshift({ text, done: false });
  input.value = "";
  renderTodos();
});

renderTodos();
