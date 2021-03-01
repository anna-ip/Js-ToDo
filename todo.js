const header = document.getElementById("header");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.querySelector("#todo-list");
const day = document.querySelector("#day");

let id = 0;
const time = new Date();
let todoList = [];

addBtn.addEventListener("click", addTodo);
//day.addEventListener("change", filterByDay);
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

function addTodo(event) {
  event.preventDefault();

  const newId = id++;
  // const todoDiv = document.createElement("div");
  // todoDiv.classList.add("todo-div");
  // todoDiv.setAttribute("id", newId);

  // timeParagraph = document.createElement("p");
  //timeParagraph.innerText = time.toLocaleString();

  // const title = document.createElement("h3");
  // title.innerText = day.value;

  // const todoLi = document.createElement("li");
  // const todoLabel = document.createElement("label");
  // todoLabel.innerText = getUserInput();

  // const checkbox = document.createElement("input");
  // todoLi.prepend(checkbox);
  // checkbox.setAttribute("type", "checkbox");
  // checkbox.setAttribute("id", "checkbox");

  // const deleteBtn = document.createElement("button");
  // deleteBtn.classList.add("delete-btn");

  //todoDiv.appendChild(title);
  // todoLi.appendChild(todoLabel);
  // todoDiv.appendChild(todoLi);
  // todoDiv.appendChild(timeParagraph);
  // todoDiv.appendChild(deleteBtn);
  //list.appendChild(todoDiv);

  const arrayId = newId;
  const todo = getUserInput(); //todoLabel.innerHTML;
  const timeAndDate = time.toLocaleString();
  const dayTitle = day.value;
  writeToObject(arrayId, dayTitle, timeAndDate, todo);

  userInput.value = "";
}

function writeToObject(arrayId, dayTitle, timeAndDate, todo) {
  const todoObject = {
    id: arrayId,
    title: dayTitle,
    dateAdded: timeAndDate,
    todo: todo,
  };
  todoList.push(todoObject);
  console.log("todoList", todoList);
  filterByDay();
  return todoList;
}

//Add a function to filter the todos on title/day and add each todo under specified day(title)
//Maybe use .filter on the todoList instead.

let days = [];
function filterByDay() {
  //This will map through the todoList and create an array for each day/title
  todoList.map((todo) => {
    days[todo.title] = [];
    console.log("map", days);
    return days;
  });

  //This will add the todoList key value to the day "arrays" in the map function above
  for (let i = 0; i < todoList.length; i++) {
    console.log("todoList[i]", todoList[i]);
    days[todoList[i].title].push(todoList[i]);
  }
  console.log("second for loop days", days);
  filterForList();
  return days;
}

function filterForList() {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("day-div");
  const newTitle = document.createElement("h2");

  console.log("filterForList", days);

  days.map((item) => {
    newTitle.innerText = item;
    console.log("newTitle", item);
  });

  // titleDiv.appendChild(newTitle);
  // list.appendChild(titleDiv);

  // switch (days.title) {
  //   case "monday":
  //     const todoDiv = document.createElement("div");
  //     todoDiv.classList.add("todo-div");
  //     todoDiv.setAttribute("id", todo.id);

  //     const todoList = document.createElement("li");
  //     const todoLabel = document.createElement("label");
  //     todoLabel.innerText = getUserInput();

  //     const checkbox = document.createElement("input");
  //     todoList.prepend(checkbox);
  //     checkbox.setAttribute("type", "checkbox");
  //     checkbox.setAttribute("id", "checkbox");

  //     timeParagraph = document.createElement("p");
  //     timeParagraph.innerText = time.toLocaleString();

  //     const deleteBtn = document.createElement("button");
  //     deleteBtn.classList.add("delete-btn");

  //     todoList.appendChild(todoLabel);
  //     todoDiv.appendChild(todoList);
  //     todoDiv.appendChild(timeParagraph);
  //     todoDiv.appendChild(deleteBtn);
  //     titleDiv.appendChild(todoDiv);

  //     break;
  //   case "tuesday":
  //     console.log(todo.todo);
  //     break;
  //   case "wednesday":
  //     console.log(todo.todo);
  //     break;
  //   case "thursday":
  //     console.log(todo.todo);
  //     break;
  //   case "friday":
  //     console.log(todo.todo);
  //     break;
  //   case "next week":
  //     console.log(todo.todo);
  //     break;
  // }
  //});
  //toggleCheckBox(checkbox);
}

function toggleCheckBox() {
  const toggleBoxes = document.querySelectorAll("input[type=checkbox]");
  toggleBoxes.forEach((toggleBox) => {
    toggleBox.addEventListener("click", (event) => {
      if (event.currentTarget.checked) {
        console.log("toggled checkbox", toggleBox);
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
