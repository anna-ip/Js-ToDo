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
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    timeParagraph = document.createElement("p");
    timeParagraph.innerText = todo.dateAdded;

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

    const titleExist = document.getElementById(title.innerText);

    if (!titleExist) {
      dayContainer.appendChild(title);
    }

    todoLi.appendChild(todoLabel);
    todoDiv.appendChild(todoLi);
    todoLi.appendChild(timeParagraph);
    todoDiv.appendChild(deleteBtn);

    //append todoDiv to daycontainer with sam className as the id of the todo (todo.id)

    dayContainer.appendChild(todoDiv);
    list.appendChild(dayContainer);
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

//! Not working at the moment and need to add if no todos are left remove the title as well.
function deleteTodo(event) {
  console.log("Should show event ", event);
  const item = event.target;
  console.log(item.classList[0]);
  if (item.classList[0] === "delete-btn") {
    //might be that the id is further up in the node list?
    const todo = item.parentElement;
    console.log(todo.id);
    delete todoList[item.parentElement.id];
    console.log(todoList[item.parentElement.id]);
    todo.classList.add("delete-todo");
    todo.addEventListener("deleteTodo", function () {
      console.log("delete function");
      todo.remove();
    });
  }
}
