const TaskContainer = document.querySelector('.list-Container');

class CreatetodoList {
  constructor(description, completed, id) {
    this.description = description;
    this.completed = completed;
    this.id = id;
  }

  static displayTasks = (task) => {
    const listItem = document.createElement('li');
    listItem.id = task.id;
    listItem.className = 'lists';
    listItem.innerHTML = `
      <div class="list-Container">
        <input type="checkbox" name="" id="${task.id}">
        <p id="${task.id}">${task.description}</p>
      </div>
          
      <div class="trash">
        <i id="pen" class="fa-solid fa-pen"></i>
        <i id="delete" class="fa-solid fa-trash-can"></i>
      </div>
    `;
    TaskContainer.appendChild(listItem);
  };

  static loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('TasksInfo');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  static displayTasksOnPage() {
    const Tasks = CreatetodoList.loadFromLocalStorage();

    Tasks.forEach((task) => {
      CreatetodoList.displayTasks(task);
    });
  }

  static removeBookFromPage(target) {
    if (target.classList.contains('trash')) {
      target.parentElement.remove();
    }
  }

  static removeFromLocalStorage(element) {
    const Tasks = CreatetodoList.loadFromLocalStorage();

    const idd = element.parentElement.id;
    const newID = Number(idd);
    const updatedTasks = Tasks.filter(task => task.id !== newID);

    let X = 1;
    updatedTasks.forEach((task) => {
      task.id = X;
      X += 1;
    });

    localStorage.setItem('TasksInfo', JSON.stringify(updatedTasks));
  }
}

export const removeItem = (e) => {
  CreatetodoList.removeBookFromPage(e.target.parentElement);
  CreatetodoList.removeFromLocalStorage(e.target.parentElement);
};

export const displayTasksOnWebPage = () => {
  CreatetodoList.displayTasksOnPage();
};

export const addItem = () => {
  const addInput = document.querySelector('.add-input');

  if (addInput.value) {
    const complete = false;

    const loadTasks = CreatetodoList.loadFromLocalStorage();
    const count = loadTasks.length + 1;  // Increment the count to start from 1
    const newTask = new CreatetodoList(addInput.value, complete, count);

    loadTasks.push(newTask);

    CreatetodoList.displayTasks(newTask);
    localStorage.setItem('TasksInfo', JSON.stringify(loadTasks));

    // Reset input fields
    addInput.value = '';
  }
};

export const storageInfo = CreatetodoList.loadFromLocalStorage;
