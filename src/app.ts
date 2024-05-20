interface Todo {
    id: number;
    content: string;
    completed: boolean;
  }
  
  let todos: Todo[] = [];
  let todoId = 0;
  
  const todoInput = document.getElementById('todo-input') as HTMLInputElement;
  const addTodoButton = document.getElementById('add-todo') as HTMLButtonElement;
  const todoList = document.getElementById('todo-list') as HTMLUListElement;
  
  function addTodo() {
    const content = todoInput.value.trim();
    if (content) {
      const newTodo: Todo = {
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
  
  function toggleTodoCompletion(id: number) {
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