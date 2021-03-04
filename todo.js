const header = document.getElementById("header");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");
const day = document.getElementById("day");

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

//**** Render the list ****/
function renderList(todo) {
  //****  first empty the HTML list = '' *********
  //? This isn't working, its empty the list for each new todo?
  //document.getElementById("todo-list").innerHTML = "";

  //***** then render the list *******
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  todoDiv.setAttribute("id", todo.id);

  timeParagraph = document.createElement("p");
  timeParagraph.innerText = todo.dateAdded;

  //? Need some kind of checking here or if statement
  const title = document.createElement("h3");
  title.innerText = todo.title;

  const todoLi = document.createElement("li");
  const todoLabel = document.createElement("label");
  todoLabel.innerText = todo.todo;

  const checkbox = document.createElement("input");
  todoLi.prepend(checkbox);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "checkbox");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  todoDiv.appendChild(title);
  todoLi.appendChild(todoLabel);
  todoDiv.appendChild(todoLi);
  todoDiv.appendChild(timeParagraph);
  todoDiv.appendChild(deleteBtn);
  list.appendChild(todoDiv);
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

  renderList(todo);
  filterByDay();
}

//**** Filter the list  ******/
//Todo -Figure out whats the best solution, filter like below or using .filter?
//Todo -If I use .filter, do I need to push it back to the array or another array?
//Todo -If I keep like this where days is my new object alt. array I need to figure out how to render it?
//Add a function to filter or sort the todos on title/day and add each todo under specified day(title)
//Maybe use .filter on the todoList instead.
function filterByDay() {
  let days = {};
  console.log("will arrange this List:", todoList);

  todoList.map((todo) => {
    days[todo.title] = [];
    return days;
  });
  for (let i = 0; i < todoList.length; i++) {
    days[todoList[i].title].push(todoList[i]);
  }
  console.log(days);

  //this render function doesn work with this code ?
  renderList(days);
}

//Todo -This isnt working at the moment
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
