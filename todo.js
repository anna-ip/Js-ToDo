const header = document.getElementById("header");
const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.getElementById("todo-list");
const day = document.getElementById("day");

let id = 0;
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
}
timeStamp();

//**** Render the list ****/
function renderList(todoList) {
  list.innerHTML = "";

  todoList.forEach((todo) => {
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
    ascBtn.classList.add("asc-btn");
    const descBtn = document.createElement("button");
    descBtn.classList.add("desc-btn");

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

// sort the todos inside .day-container via btn in an asc or desc order.
// .sort asc by default
function sortTodosByDate() {
  const dayContainer = document.querySelector(".day-container");
  console.log(dayContainer);

  ascBtn.addEventListener("click", function () {
    dayContainer.sort(function (a, b) {
      let aDate = a.dateAdded;
      let newA = aDate.getTime();
      // console.log(newA);
      let bDate = b.dateAdded;
      let newB = bDate.getTime();
      // console.log(newB);
      return newA - newB;
    });
  });
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
  console.log("todoList in addTodo:", todoList);
  userInput.value = "";
  renderList(sortListByDay(todoList));
  //? renderList(sortTodosByDate(todoList));
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
      todo.remove();
    });
  }
}
