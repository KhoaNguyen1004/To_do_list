"use strict";
let tasks = [];
let taskIdCounter = 0;
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
taskForm.addEventListener('submit', addTask);
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: taskIdCounter++,
            text: taskText,
        };
        tasks.push(newTask);
        renderTasks();
        taskInput.value = '';
    }
}
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
              <button class="edit" onclick="editTask(${task.id})">Edit</button>
              <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
          </div>
      `;
        taskList.appendChild(li);
    });
}
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newTaskText = prompt('Edit task:', task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            renderTasks();
        }
    }
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
// Attach functions to window to make them accessible in inline event handlers
window.editTask = editTask;
window.deleteTask = deleteTask;
