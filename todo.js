const header = document.getElementById("header");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");
const day = document.getElementById("day");

let id = 0;
const time = new Date();
let todoList = [];

addBtn.addEventListener("click", addTodo);
list.addEventListener("click", deleteTodo);

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
  return timeParagraph;
}
timeStamp();

//**** Render the list ****/
function renderList(todoList) {
  list.innerHTML = "";

  todoList.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    todoDiv.setAttribute("id", todo.id);
    timeParagraph = document.createElement("p");
    timeParagraph.innerText = todo.dateAdded;
    //? Need some kind of checking here or if statement
    const title = document.createElement("h3");
    title.innerText = todo.title;
    title.setAttribute("id", title.innerText);

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("todo");

    const todoLi = document.createElement("li");
    const todoLabel = document.createElement("label");
    todoLabel.innerText = todo.todo;
    const checkbox = document.createElement("input");
    todoLi.prepend(checkbox);
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "checkbox");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");

    const titleExist = document.getElementById(title.innerText);
    if (!titleExist) {
      todoDiv.appendChild(title);
    }
    todoLi.appendChild(todoLabel);
    innerDiv.appendChild(todoLi);
    innerDiv.appendChild(timeParagraph);
    innerDiv.appendChild(deleteBtn);
    todoDiv.appendChild(innerDiv);
    list.appendChild(todoDiv);
  });
}

function sortListByDay(todoList) {
  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "weekend",
  ];
  return todoList.sort((item1, item2) => {
    return daysOrder.indexOf(item1.title) - daysOrder.indexOf(item2.title);
  });
}

//****** Add Todo function ******
function addTodo(event) {
  event.preventDefault();
  const newId = id++;
  const todo = {
    id: newId,
    todo: getUserInput(),
    dateAdded: time.toLocaleString(),
    title: day.value,
  };
  todoList.push(todo);
  console.log("todoList in addTodo:", todoList);
  userInput.value = "";
  renderList(sortListByDay(todoList));

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
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    delete todoList[item.parentElement.id];
    todo.classList.add("delete-todo");
    todo.addEventListener("deleteTodo", function () {
      console.log("delete function");
      todo.remove();
    });
  }
}
