const importantList = document.getElementById('important-list');
const inProgressList = document.getElementById('in-progress-list');
const completedList = document.getElementById('completed-list');
const allList = document.getElementById('all-list');

let untitledTask = 0;

function addTask() {
    const title = document.getElementById('task-title-input');
    const desc = document.getElementById('task-desc-input');
    const newTask = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDesc = document.createElement('p');

    if (title == '') {
        untitledTask++;
        taskTitle.innerHTML = `Untitled task #${untitledTask}`
    } else
        taskTitle.innerHTML = title.value.trim();

    if (desc == '')
        taskDesc.innerHTML = 'No description';
    else
        taskDesc.innerHTML = desc.value.trim();

    // check task button
    const checkTask = document.createElement('i');
    checkTask.classList.add('fa-regular', 'fa-circle');
    newTask.appendChild(checkTask);

    taskTitle.classList.add('task-title');
    taskDesc.classList.add('task-desc');
    newTask.appendChild(taskTitle);
    newTask.appendChild(taskDesc);

    // expand task button
    const expandTask = document.createElement('i');
    expandTask.classList.add('fa-solid', 'fa-angle-down');
    newTask.appendChild(expandTask);

    allList.appendChild(newTask);
    inProgressList.appendChild(newTask.cloneNode(true));
}