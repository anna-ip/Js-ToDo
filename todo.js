const userInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-btn");
let list = document.getElementById("todo-list");

// input text added to a list/array with the submit button
let todoList = [];

//get hold of the input value
function outputValue() {
  let newTodo = userInput.value;
  list = document.getElementById("todo-list").innerHTML = newTodo;
  todoList.push(list)
  console.log('todoList',todoList)
}

// add eventlistner to the btn to update/push to the list/array
addBtn.addEventListener("click", addTodo);

function addTodo(list) {
  //take the user input and add to the todoList
  
}
