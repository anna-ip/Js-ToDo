const header = document.getElementById("header");
const addForm = document.getElementById("add-form");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");
const editForm = document.getElementById("edit-form");

let id = 0;
// GLOBAL STATE
// ----------------
let todoList = [];
let listSortOrder = {};
// ----------------

addForm.addEventListener("submit", addTodo);
list.addEventListener("click", deleteTodo);
list.addEventListener("click", openEditForm);
list.addEventListener("click", setSortOrder);
list.addEventListener("click", toggleCheckBox);
editForm.addEventListener("submit", saveTodo);

function timeStamp() {
  const time = new Date();
  const timeParagraph = document.createElement("p");
  timeParagraph.setAttribute("class", "timestamp");
  timeParagraph.innerText = time.toDateString();
  header.appendChild(timeParagraph);
}
timeStamp();

//----- Update and render the list -----
function refreshList() {
  list.innerHTML = "";

  const todosAsObject = todoList.reduce((todoListObject, todoItem) => {
    const currentTodoList = todoListObject[todoItem.title] ?? [];
    currentTodoList.push(todoItem);

    return {
      ...todoListObject,
      [todoItem.title]: currentTodoList,
    };
  }, {});

  ["monday", "tuesday", "wednesday", "thursday", "friday", "weekend"].forEach(
    (day) => {
      const todosForDay = todosAsObject[day] ?? [];

      renderDay(todosForDay, listSortOrder[day]);
    }
  );
}

//----- Render each day -----
function renderDay(todos, sortOrder) {
  todos.sort((a, b) => {
    const order = sortOrder === "desc" ? -1 : 1;
    return (a.dateAdded.getTime() - b.dateAdded.getTime()) * order;
  });

  if (todos.length === 0) {
    return;
  }

  const dayContainer = document.createElement("div");
  dayContainer.classList.add("day-container");

  const title = document.createElement("h2");
  title.classList.add("title");
  title.innerText = todos[0].title;
  title.setAttribute("id", title.innerText);
  dayContainer.classList.add(title.innerText);

  const container = document.createElement("div");
  container.classList.add("container");
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const sortBtnDiv = document.createElement("div");
  sortBtnDiv.classList.add("sort-btn-container");
  const ascBtn = document.createElement("button");
  ascBtn.classList.add("sort-order-btn");
  ascBtn.classList.add("asc");
  const descBtn = document.createElement("button");

  container.appendChild(todoContainer);
  dayContainer.appendChild(container);
  dayContainer.appendChild(title);

  todos.forEach((todo) => {
    timeParagraph = document.createElement("p");
    timeParagraph.innerText = todo.dateAdded.toLocaleString();

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("id", todo.id);
    todoDiv.classList.add("todo");

    const todoLi = document.createElement("li");
    const todoLabel = document.createElement("label");
    todoLabel.innerText = todo.todo[0].toUpperCase() + todo.todo.slice(1);

    const checkbox = document.createElement("input");
    todoLi.prepend(checkbox);
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.checked;
    checkbox.classList.add("checkbox");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");

    todoLi.appendChild(todoLabel);
    todoDiv.appendChild(todoLi);
    todoLi.appendChild(timeParagraph);
    todoDiv.appendChild(editBtn);
    todoDiv.appendChild(deleteBtn);
    todoContainer.appendChild(todoDiv);
  });

  if (todos.length >= 2) {
    descBtn.classList.add("sort-order-btn");
    descBtn.classList.add("desc");
    sortBtnDiv.appendChild(ascBtn);
    sortBtnDiv.appendChild(descBtn);
  }
  container.appendChild(sortBtnDiv);
  container.appendChild(todoContainer);
  dayContainer.appendChild(container);
  list.appendChild(dayContainer);
}

//----- Sort the todos asc or desc -----
function setSortOrder(event) {
  let day;
  let sortOrder;
  const item = event.target;

  if (item.classList[0] === "sort-order-btn") {
    sortOrder = item.classList[1];
    day = item.closest(".day-container").classList[1];
    listSortOrder[day] = sortOrder;
    refreshList();
  }
}

//----- Add a Todo -----
function addTodo(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  let time = new Date();
  const newId = "" + id++;
  const todo = {
    id: newId,
    todo: data.todo,
    dateAdded: time,
    title: data.title,
    checked: false,
  };
  todoList.push(todo);
  userInput.value = "";

  refreshList();
}

//----- Toggle the checkbox -----
function toggleCheckBox(event) {
  const item = event.target;

  if (item.classList[0] === "checkbox") {
    const checkbox = item;
    const todoId = item.closest(".todo").id;
    const index = todoList.findIndex((todo) => todo.id === todoId);
    const todo = todoList[index];
    todo.checked = checkbox.checked;

    refreshList();
  }
}

// ----- Open/click to edit a todo -----
function openEditForm(event) {
  const item = event.target;

  if (item.classList[0] === "edit-btn") {
    const showform = document.getElementById("edit-form");
    const hideAddForm = document.getElementById("add-form");
    showform.classList.remove("hidden");
    hideAddForm.classList.add("hidden");

    const todoId = item.closest(".todo").id;
    const index = todoList.findIndex((todo) => todo.id === todoId);
    const todo = todoList[index];

    showform.querySelector("input[name=todo]").value = todo.todo;
    showform.querySelector("select[name=title]").value = todo.title;
    showform.querySelector("input[name=id]").value = todo.id;
  }
}

//---- Save the edited todo ----
function saveTodo(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const index = todoList.findIndex((todo) => todo.id === data.id);
  const todo = todoList[index];

  //If the item is removed add a new one
  if (index === -1) {
    const todo = {
      id: data.id,
      todo: data.todo,
      dateAdded: new Date(),
      title: data.title,
      checked: false,
    };
    todoList.push(todo);
  } else if (index >= 0) {
    todo.title = data.title;
    todo.todo = data.todo;
    todo.id = data.id;
  }
  refreshList();

  document.getElementById("edit-form").classList.add("hidden");
  document.getElementById("add-form").classList.remove("hidden");
}

//---- Delete todos ----
function deleteTodo(event) {
  const item = event.target;
  if (item.classList[0] === "delete-btn") {
    const todoId = item.parentElement.id;
    const index = todoList.findIndex((todo) => todo.id === todoId);
    todoList.splice(index, 1);

    refreshList();
  }
}
