const header = document.getElementById("header");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");
const day = document.getElementById("day");

let id = 0;
// GLOBAL STATE
// ----------------
let todoList = [];
let listSortOrder = {};
// ----------------

addBtn.addEventListener("click", addTodo);
list.addEventListener("click", deleteTodo);
list.addEventListener("click", setSortOrder);

function getUserInput() {
  let value = userInput.value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function timeStamp() {
  const time = new Date();
  const timeParagraph = document.createElement("p");
  timeParagraph.setAttribute("class", "timestamp");
  timeParagraph.innerText = time.toDateString();
  header.appendChild(timeParagraph);
}
timeStamp();

//**** Render the list ****/
function refreshList() {
  // [ ... ]
  // { monday: { todos: [], sortOrder: "asc"} }

  console.log("Refresh list", todoList.slice());
  // { monday: [], tuesday: []}
  list.innerHTML = "";

  const todosAsObject = todoList.reduce((todoListObject, todoItem) => {
    const currentTodoList = todoListObject[todoItem.title] ?? [];
    currentTodoList.push(todoItem);

    return {
      ...todoListObject,
      [todoItem.title]: currentTodoList,
    };
  }, {});

  console.log(todosAsObject);

  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "weekend",
  ].forEach((day) => {
    const todosForDay = todosAsObject[day] ?? [];
    renderDay(todosForDay, listSortOrder[day]);
  });
}

function renderDay(todos, sortOrder) {
  todos.sort((a, b) => {
    const order = sortOrder === "desc" ? -1 : 1;
    return (a.dateAdded.getTime() - b.dateAdded.getTime()) * order;
  });

  console.log("render day with sort order", sortOrder);

  todos.forEach((todo) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    timeParagraph = document.createElement("p");
    timeParagraph.innerText = todo.dateAdded.toLocaleString();

    const title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = todo.title;
    title.setAttribute("id", title.innerText);
    dayContainer.classList.add(title.innerText);

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("id", todo.id);
    todoDiv.classList.add("todo");

    const todoLi = document.createElement("li");
    const todoLabel = document.createElement("label");
    todoLabel.innerText = todo.todo;

    const checkbox = document.createElement("input");
    todoLi.prepend(checkbox);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "checkbox");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");

    const sortBtnDiv = document.createElement("div");
    sortBtnDiv.classList.add("sort-btn-container");
    const ascBtn = document.createElement("button");
    ascBtn.classList.add("sort-order-btn");
    ascBtn.classList.add("asc");
    const descBtn = document.createElement("button");
    descBtn.classList.add("sort-order-btn");
    descBtn.classList.add("desc");

    const titleExist = document.getElementById(title.innerText);

    if (!titleExist) {
      dayContainer.appendChild(title);
      todoLi.appendChild(todoLabel);
      todoDiv.appendChild(todoLi);
      todoLi.appendChild(timeParagraph);
      todoDiv.appendChild(deleteBtn);
      dayContainer.appendChild(todoDiv);
      list.appendChild(dayContainer);
    } else {
      todoLi.appendChild(todoLabel);
      todoDiv.appendChild(todoLi);
      todoLi.appendChild(timeParagraph);
      todoDiv.appendChild(deleteBtn);
      document.querySelector(`.${title.innerText}`).appendChild(todoDiv);
    }
    // Add a condition later for only showing if there is more than two todoLi
    sortBtnDiv.appendChild(ascBtn);
    sortBtnDiv.appendChild(descBtn);
    dayContainer.appendChild(sortBtnDiv);
  });
}

function setSortOrder(e) {
  let day;
  let sortOrder;
  const item = e.target;

  if (item.classList[0] === "sort-order-btn") {
    sortOrder = item.classList[1];
    day = item.closest(".day-container").classList[1];
    listSortOrder[day] = sortOrder;
    refreshList();
  }
}

//****** Add Todo function ******
function addTodo(event) {
  event.preventDefault();
  let time = new Date();
  const newId = id++;
  const todo = {
    id: newId,
    todo: getUserInput(),
    dateAdded: time,
    title: day.value,
  };
  todoList.push(todo);
  userInput.value = "";

  refreshList();
  toggleCheckBox();
}

function toggleCheckBox() {
  const toggleBoxes = document.querySelectorAll("input[type=checkbox]");
  toggleBoxes.forEach((toggleBox) => {
    toggleBox.addEventListener("click", (event) => {
      if (event.currentTarget.checked) {
        toggleBox.classList.add("checked");
      } else {
        toggleBox.classList.remove("checked");
      }
    });
  });
}

function deleteTodo(event) {
  const item = event.target;
  console.log(item);
  if (item.classList[0] === "delete-btn") {
    const todoId = item.parentElement.id;
    const index = todoList.findIndex((todo) => todo.id === todoId);
    console.log(index);
    todoList.splice(index, 1);

    refreshList();
  }
}
