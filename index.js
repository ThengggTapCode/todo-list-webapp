const taskList = document.getElementById('task-list');
const popupContainer = document.getElementById('popup-container');
const popupBoard = document.getElementById('popup-board');
const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea')

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
    } else {
        untitledTask = 0;
        taskTitle.innerText = title.value.trim();
    }
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

    actionBtnWrap.classList.add('action-btn');
    newTask.appendChild(actionBtnWrap);

    // add task to task list
    taskList.appendChild(newTask);

}
function countInputLength(inputValue, display) {
    const count = inputValue.length;
    display.innerText = `${count}/50`;
}
function countTextareaLength(textareaValue, display) {
    const count = textareaValue.length;
    display.innerText = `${count}/500`;
}
taskList.addEventListener('click', event => {
    const clickedElement = event.target;
    const taskContainer = clickedElement.parentElement.parentElement;

    // edit task
    if (clickedElement.classList.contains('fa-pen-to-square')) {
        popupContainer.style.display = 'flex';

        const taskTitleInput = document.createElement('input');
        const taskDescInput = document.createElement('textarea');
        const submitButton = document.createElement('button');
        const cancelButton = document.createElement('button')
        const oldTitle = taskContainer.querySelector('.task-title');
        const oldDesc = taskContainer.querySelector('.task-desc');
        const formWrap = document.createElement('div');
        const buttonWrap = document.createElement('div')
        const popupHeader = document.createElement('h2');

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
        popupBoard.style.height = '400px';
        popupHeader.style.marginTop = '30px';

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
                untitledTask = 0;
                oldTitle.textContent = newTitle;
                oldDesc.textContent = newDesc;
            }
            formWrap.remove();
            buttonWrap.remove();
            popupHeader.remove();
            popupContainer.style.display = 'none';

        });
    }

    // pin/unpin task
    else if (clickedElement.classList.contains('fa-thumbtack') || clickedElement.classList.contains('fa-thumbtack-slash')) {
        if (clickedElement.classList.contains('fa-thumbtack'))
            taskList.insertBefore(taskContainer, taskList.firstChild);

        clickedElement.classList.toggle('fa-thumbtack');
        clickedElement.classList.toggle('fa-thumbtack-slash');

        taskContainer.classList.toggle('pinned');
    }

    // delete task
    else if (clickedElement.classList.contains('fa-trash'))
        taskContainer.remove();

    getInput();
    getTextarea();
});
function getInput() {
    inputs.forEach(input => {
        const container = input.parentElement;
        countInputLength(input.value, container.querySelector('p'));
        input.addEventListener('keydown', () => countInputLength(input.value, container.querySelector('p')));
    });
}
function getTextarea() {
    textareas.forEach(textarea => {
        const container = textarea.parentElement;

        countTextareaLength(textarea.value, container.querySelector('p'));
        textarea.addEventListener('keydown', () => countTextareaLength(textarea.value, container.querySelector('p')));
    });
}
getInput();
getTextarea()