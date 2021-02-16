const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
const list = document.querySelector("#todo-list");
const todoDiv = document.createElement("div");
const todoLi = document.createElement("li");

addBtn.addEventListener("click", addTodo);

let todoList = [];

//TODO appendchild is not working correct
function addTodo(event) {
  event.preventDefault();

  todoLi.innerText = userInput.value;
  console.log("todoLi", todoLi); //<li>'milk'</li>

  todoDiv.appendChild(todoLi);
  console.log("todoDiv", todoDiv); //<div><li>'milk'</li></div> */

  list.appendChild(todoDiv);
  console.log("list", list);

  const todo = todoLi.innerHTML;
  console.log("todo", todo); //milk

  todoList.push(todo);
  console.log("todoList", todoList); //['milk']

  userInput.value = "";
}
