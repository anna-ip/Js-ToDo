const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.querySelector("#todo-list");
const day = document.querySelector("#day");

const time = new Date();
let todoList = [];

addBtn.addEventListener("click", addTodo);
day.addEventListener("click", sortDay);

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");

  const timeStamp = document.createElement("p");
  timeStamp.innerText = time.toLocaleString();

  const title = document.createElement("h3"); //might not be in tje same divv as time and todo
  title.innerText = day.value;

  const todoLi = document.createElement("li");
  todoLi.innerText = userInput.value;

  todoDiv.appendChild(title);
  todoDiv.appendChild(timeStamp);
  todoDiv.appendChild(todoLi);
  list.appendChild(todoDiv);

  const todo = todoLi.innerHTML;
  const timeAndDate = timeStamp.innerText;
  const dayTitle = title.innerText;
  writeToObject(dayTitle, timeAndDate, todo);

  userInput.value = "";
}

// Add a function to filter the todos depending on chosen day
function sortDay() {
  const todos = list.childNodes;
  console.log("childNodes", todos);
}

function writeToObject(dayTitle, timeAndDate, todo) {
  const todoObject = {
    title: dayTitle,
    date: timeAndDate,
    todo: todo,
  };
  todoList.push(todoObject);
  console.log("todoList", todoList);
}
