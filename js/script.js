// Varible
const form = document.querySelector('#form');
const taskInput = document.querySelector('.taskInput');
const btnSubmit = document.querySelector('.btn');
const tasksList = document.querySelector('.tasksList');
const empty = document.querySelector('.emptyList');
// data
let tasks = [];
if(localStorage.getItem('tasks')){
  tasks = JSON.parse(localStorage.getItem('tasks'))
  tasks.forEach(task => renderTask(task));
}

const isEmpty = () => { 
  if(tasks.length === 0){
    empty.classList.remove('none');
  }else{
    empty.classList.add('none');
  }
}
const saveTasksToLS = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
const addTask = (event) => {
  event.preventDefault(); //remove default behavior
  const text = taskInput.value;
  
  const newTask = {
    id: Date.now(),
    text,
    done: false
  };
  tasks.push(newTask);

  saveTasksToLS();

  renderTask(newTask);
  
  taskInput.value = '';
  taskInput.focus();
  isEmpty();
}
const deleteTask = (event) => {
  if(event.target.dataset.action !== 'delete') return;
  const parentNode = event.target.closest('.taskItem');

  const id = Number(parentNode.id);
  const index = tasks.findIndex(task => task.id === id);
  tasks.splice(index, 1);

  saveTasksToLS();

  parentNode.remove();
  isEmpty();
}
const doneTask = (event) => {
  if(event.target.dataset.action !== 'done')return;
  const parentNode = event.target.closest('.taskItem');

  const id = Number(parentNode.id);
  const task = tasks.find(task => task.id === id);
  task.done = !task.done;

  saveTasksToLS();

  const taskTitle = parentNode.querySelector('.taskTitle');
  taskTitle.classList.toggle('taskDone');
}
function renderTask (task){
  const cssClass = task.done ? 'taskTitle taskDone' : 'taskTitle';
  const taskHTML = `
      <li id= '${task.id}'class="taskItem">
      <span class="${cssClass}">${task.text}</span>
      <div class="taskItem__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
      </div>
      </li>
      `
  tasksList.insertAdjacentHTML('beforeend',taskHTML);
}
isEmpty();
form.addEventListener('submit', addTask);
tasksList.addEventListener('click',(event)=>{deleteTask(event); doneTask(event);});
