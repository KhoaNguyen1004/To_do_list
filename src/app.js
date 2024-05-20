"use strict";
let todos = [];
let todoId = 0;
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
function addTodo() {
    const content = todoInput.value.trim();
    if (content) {
        const newTodo = {
            id: todoId++,
            content,
            completed: false,
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
}
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.content;
        li.addEventListener('click', () => toggleTodoCompletion(todo.id));
        todoList.appendChild(li);
    });
}
function toggleTodoCompletion(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}
addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
