const importantList = document.getElementById('important-list');
const inProgressList = document.getElementById('in-progress-list');
const allList = document.getElementById('all-list');
const popupContainer = document.getElementById('popup-container');
const popupBoard = document.getElementById('popup-board');

inProgressList.style.display = 'none';
allList.style.display = 'none';

let selectingTask = false;
let selectingAll = false;
let untitledTask = 0;

function addTask() {
    const title = document.getElementById('task-title-input');
    const desc = document.getElementById('task-desc-input');
    const newTask = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDesc = document.createElement('p');
    const taskInfoWrap = document.createElement('div');
    const editBtn = document.createElement('i');
    const pinBtn = document.createElement('i');
    const deleteBtn = document.createElement('i');
    const actionBtnWrap = document.createElement('div');

    if (title.value === '') {
        untitledTask++;
        taskTitle.innerText = `Untitled task #${untitledTask}`
    } else
        taskTitle.innerText = title.value.trim();

    if (desc.value === '')
        taskDesc.innerText = 'No description';
    else
        taskDesc.innerText = desc.value.trim();

    // check task button
    const checkTask = document.createElement('i');
    checkTask.classList.add('fa-regular', 'fa-circle');
    newTask.appendChild(checkTask);

    // add info to taskInfo
    taskTitle.classList.add('task-title');
    taskDesc.classList.add('task-desc');
    taskInfoWrap.appendChild(taskTitle);
    taskInfoWrap.appendChild(taskDesc);

    // add task info
    taskInfoWrap.classList.add('task-info');
    newTask.appendChild(taskInfoWrap);

    // expand task button
    const expandTask = document.createElement('i');
    expandTask.classList.add('fa-solid', 'fa-angle-down');
    newTask.appendChild(expandTask);
    newTask.classList.add('task-container');

    // edit button
    editBtn.classList.add('fa-solid', 'fa-pen-to-square');
    actionBtnWrap.appendChild(editBtn);

    // pin button
    pinBtn.classList.add('fa-solid', 'fa-thumbtack');
    actionBtnWrap.appendChild(pinBtn);

    // delete button
    deleteBtn.classList.add('fa-solid', 'fa-trash');
    actionBtnWrap.appendChild(deleteBtn);

    newTask.appendChild(actionBtnWrap);

    // add task to task list
    allList.appendChild(newTask);
    inProgressList.appendChild(newTask.cloneNode(true));

    showAllTask();
    actionButtonFunction();
}
function showAllTask() {
    allList.style.display = 'block';
    importantList.style.display = 'none';
    inProgressList.style.display = 'none';
}

function showInProgressTask() {
    inProgressList.style.display = 'block';
    importantList.style.display = 'none';
    allList.style.display = 'none';
}

function showImportantTask() {
    importantList.style.display = 'block';
    allList.style.display = 'none';
    inProgressList.style.display = 'none';
}

function actionButtonFunction() {
    document.querySelectorAll('.task-container').forEach(task => {
        task.addEventListener('click', event => {

            const clickedElement = event.target;

            // edit task
            if (clickedElement.classList.contains('fa-pen-to-square')) {
                popupContainer.style.display = 'flex';

                const taskTitleInput = document.createElement('input');
                const taskDescInput = document.createElement('textarea');
                const submitButton = document.createElement('button');
                const cancelButton = document.createElement('button')
                const oldTitle = task.querySelector('.task-title');
                const oldDesc = task.querySelector('.task-desc');
                const formWrap = document.createElement('div');
                const buttonWrap = document.createElement('div')
                const popupHeader = document.createElement('p');

                taskTitleInput.id = 'new-task-title';
                taskDescInput.id = 'new-task-desc';
                taskTitleInput.placeholder = 'Enter new title';
                taskDescInput.placeholder = 'Enter new description';
                submitButton.id = 'submit-new-info';
                submitButton.innerText = 'Submit';
                cancelButton.id = 'cancel-new-info';
                cancelButton.innerText = 'Cancel';
                popupHeader.innerText = 'Edit Task';
                formWrap.classList.add('form-wrap');
                buttonWrap.classList.add('button-wrap');

                popupBoard.appendChild(popupHeader);
                formWrap.appendChild(taskTitleInput);
                formWrap.appendChild(taskDescInput);
                buttonWrap.appendChild(submitButton);
                buttonWrap.appendChild(cancelButton);
                popupBoard.appendChild(formWrap);
                popupBoard.appendChild(buttonWrap);

                cancelButton.addEventListener('click', () => {
                    formWrap.remove();
                    buttonWrap.remove();
                    popupHeader.remove();
                    popupContainer.style.display = 'none';
                });
                document.querySelector('.fa-xmark').addEventListener('click', () => {
                    formWrap.remove();
                    buttonWrap.remove();
                    popupHeader.remove();
                    popupContainer.style.display = 'none';
                })
                submitButton.addEventListener('click', () => {
                    const newTitle = taskTitleInput.value.trim();
                    const newDesc = taskDescInput.value.trim();

                    if (newTitle !== '' || newDesc !== '') {
                        oldTitle.textContent = newTitle;
                        oldDesc.textContent = newDesc;

                    }
                    formWrap.remove();
                    buttonWrap.remove();
                    popupHeader.remove();
                    popupContainer.style.display = 'none';
                });
            }
        })
    })
}