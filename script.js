// To-Do List with extended fields, form toggle, and calendar panel toggle

document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const showFormBtn = document.getElementById('show-form-btn');
  const todoList = document.getElementById('todo-list');

  // Form fields
  const todoTitle = document.getElementById('task-title');
  const todoDesc = document.getElementById('task-desc');
  const todoSubject = document.getElementById('task-subject');
  const todoTypeRadios = document.getElementsByName('task-type');
  const todoDeadline = document.getElementById('task-deadline');

  // Calendar panel and toggle button
  const calendarPanel = document.querySelector('.right-panel');
  const calendarToggleBtn = document.getElementById('calendar-toggle');

  // Hide form initially
  todoForm.style.display = 'none';

  // Hide calendar panel initially
  if (calendarPanel) {
    calendarPanel.style.display = 'none';
  }

  // Toggle form visibility
  showFormBtn.addEventListener('click', () => {
    if (todoForm.style.display === 'none') {
      todoForm.style.display = 'block';
      todoTitle.focus();
    } else {
      todoForm.style.display = 'none';
    }
  });

  // Toggle calendar panel visibility
  if (calendarToggleBtn && calendarPanel) {
    calendarToggleBtn.addEventListener('click', () => {
      if (calendarPanel.style.display === 'none') {
        calendarPanel.style.display = 'flex';
      } else {
        calendarPanel.style.display = 'none';
      }
    });
  }

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Render tasks
  function renderTasks() {
    todoList.innerHTML = '';
    if (tasks.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = 'No tasks yet';
      emptyMsg.style.color = '#666';
      emptyMsg.style.fontStyle = 'italic';
      todoList.appendChild(emptyMsg);
      return;
    }
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });
      li.appendChild(checkbox);

      // Task title and description
      const span = document.createElement('span');
      span.textContent = task.title + (task.description ? ` - ${task.description}` : '');
      li.appendChild(span);

      // Meta info
      const meta = document.createElement('small');
      meta.textContent = `${task.subject} · ${task.type}` + (task.deadline ? ` · Due: ${task.deadline}` : '');
      li.appendChild(meta);

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }

  // Handle form submit
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = todoTitle.value.trim();
    if (!title) return;
    const description = todoDesc.value.trim();
    const subject = todoSubject.value;
    let type = 'Task';
    for (const radio of todoTypeRadios) {
      if (radio.checked) {
        type = radio.value;
        break;
      }
    }
    const deadline = todoDeadline.value;

    tasks.push({ title, description, subject, type, deadline, completed: false });
    saveTasks();
    renderTasks();
    todoForm.reset();
    todoForm.style.display = 'none';
  });

  // Initial render
  renderTasks();
});
