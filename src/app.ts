interface Task {
  id: number;
  text: string;
} // Imagine you hava a task...

let tasks: Task[] = []; // Task array
let taskIdCounter = 0; //Task count

const taskForm = document.getElementById('task-form') as HTMLFormElement; // Input a task
const taskInput = document.getElementById('task-input') as HTMLInputElement; // The task which was input
const taskList = document.getElementById('task-list') as HTMLUListElement; // List of your tasks

taskForm.addEventListener('submit', addTask);

// Add task function
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

// Listing your added tasks and list those out, with two button 'Edit' and 'Delete'
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


// What will happen if you click on 'Edit' 
function editTask(id: number): void {
  const task = tasks.find(task => task.id === id); // Get the selected task through compare the id selected in the Tasks array
  if (task) {
      const newTaskText = prompt('Edit task:', task.text); // Edit you selected task with dialog box - prompt()
      if (newTaskText !== null) {
          task.text = newTaskText.trim();
          renderTasks(); // Display the task which was edited
      }
  }
}

// What will happen if you click on 'Delete'
function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id); // Get the selected task through compare the id selected in the Tasks array and delete it
  renderTasks(); // Display the new tasks list
}

// Attach functions to window to make them accessible in inline event handlers
(window as any).editTask = editTask;
(window as any).deleteTask = deleteTask;
