interface Task {
  id: number;
  text: string;
}

let tasks: Task[] = [];
let taskIdCounter = 0;

const taskForm = document.getElementById('task-form') as HTMLFormElement;
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;

taskForm.addEventListener('submit', addTask);

function addTask(event: Event): void {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
      const newTask: Task = {
          id: taskIdCounter++,
          text: taskText,
      };
      tasks.push(newTask);
      renderTasks();
      taskInput.value = '';
  }
}

function renderTasks(): void {
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

function editTask(id: number): void {
  const task = tasks.find(task => task.id === id);
  if (task) {
      const newTaskText = prompt('Edit task:', task.text);
      if (newTaskText !== null) {
          task.text = newTaskText.trim();
          renderTasks();
      }
  }
}

function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Attach functions to window to make them accessible in inline event handlers
(window as any).editTask = editTask;
(window as any).deleteTask = deleteTask;
