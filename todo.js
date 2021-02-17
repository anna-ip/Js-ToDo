const header = document.getElementById("header");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.querySelector("#todo-list");
const day = document.querySelector("#day");

const time = new Date();
let todoList = [];

addBtn.addEventListener("click", addTodo);
day.addEventListener("click", sortOnDay);

function timeStamp() {
  const time = new Date();
  const timeParagraph = document.createElement("p");
  timeParagraph.setAttribute("class", "timestamp");
  timeParagraph.innerText = time.toDateString();
  header.appendChild(timeParagraph);
  return timeParagraph;
}
timeStamp();

function addTodo(event, timeParagraph) {
  event.preventDefault();

  const todoDiv = document.createElement("div");

  timeParagraph = document.createElement("p");
  timeParagraph.innerText = time.toLocaleString();

  const title = document.createElement("h3"); //? might take this away
  title.innerText = day.value; //Todo make the char uppercase

  const todoLi = document.createElement("li");
  const todoLabel = document.createElement("label");
  todoLabel.innerText = userInput.value;

  const checkbox = document.createElement("input");
  todoLi.prepend(checkbox);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "checkbox");

  todoLi.appendChild(todoLabel);
  todoDiv.appendChild(title);
  todoDiv.appendChild(timeParagraph);
  todoDiv.appendChild(todoLi);
  list.appendChild(todoDiv);

  const todo = todoLabel.innerHTML;
  const timeAndDate = timeParagraph.innerText;
  const dayTitle = day.value;
  writeToObject(dayTitle, timeAndDate, todo);
  toggleCheckBox(checkbox);

  userInput.value = "";
}

function toggleCheckBox() {
  const toggleBox = document.querySelector("#checkbox");
  toggleBox.addEventListener("click", (event) => {
    if (event.currentTarget.checked) {
      toggleBox.classList.toggle("checked");
    } else {
      toggleBox.classList.toggle("checked");
    }
  });
}

// Add a function to filter the todos depending on chosen day
function sortOnDay(event) {
  const todos = list.childNodes;
  console.log("childNodes", todos);

  //const dayDiv = document.createElement("div");
  // let title = document.createElement("h3");
  // title.innerText = day.value;
  // console.log("title in sortOnDay", title);
  //dayDiv.appendChild('');
  for (let i = 1; i < todos.length; i++) {
    switch (event.target.value) {
      case "monday":
        todos[i].classList.add("filter-day");
        break;
      case "tuesday":
        todos[i].classList.add("filter-day");
        break;
      case "wednesday":
        todos[i].classList.add("filter-day");
        break;
      case "thursday":
        todos[i].classList.add("filter-day");
        break;
      case "friday":
        todos[i].classList.add("filter-day");
        break;
      case "weekday":
        todos[i].classList.add("filter-day");
    }
  }
}

function writeToObject(dayTitle, timeAndDate, todo) {
  const todoObject = {
    title: dayTitle,
    dateAdded: timeAndDate,
    todo: todo,
  };
  todoList.push(todoObject);
  console.log("todoList", todoList);
  return todoList;
}
