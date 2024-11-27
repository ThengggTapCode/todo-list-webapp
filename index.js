const taskList = document.getElementById('task-list');
const popupContainer = document.getElementById('popup-container');
const popupBoard = document.getElementById('popup-board');
const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');

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

    newTask.classList.add('task-container');

    if (title.value === '') {
        untitledTask++;
        taskTitle.innerText = `Untitled task #${untitledTask}`
    } else {
        untitledTask = 0;
        taskTitle.innerText = title.value.trim();
    }

    taskDesc.innerText = desc.value === '' ? 'No description' : desc.value.trim();

    // check task button
    const checkTask = document.createElement('i');
    checkTask.classList.add('fa-regular', 'fa-circle');
    newTask.appendChild(checkTask);

    // add info to taskInfo
    taskTitle.classList.add('task-title');
    taskDesc.classList.add('task-desc');
    taskInfoWrap.appendChild(taskTitle);
    taskInfoWrap.appendChild(taskDesc);
    taskDesc.style.display = 'none';

    // add task info
    taskInfoWrap.classList.add('task-info');
    newTask.appendChild(taskInfoWrap);

    // expand task button
    const expandTask = document.createElement('i');
    expandTask.classList.add('fa-solid', 'fa-angle-down');
    
    actionBtnWrap.appendChild(expandTask);
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
    title.value = '';
    desc.value = '';
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
        const titleLengthCount = document.createElement('p');
        const titleWrap = document.createElement('div');
        const taskDescInput = document.createElement('textarea');
        const descWrap = document.createElement('div');
        const descLengthCount = document.createElement('p');
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
        taskTitleInput.maxLength = 50;
        taskDescInput.maxLength = 500;
        submitButton.id = 'submit-new-info';
        submitButton.innerText = 'Submit';
        cancelButton.id = 'cancel-new-info';
        cancelButton.innerText = 'Cancel';
        popupHeader.innerText = 'Edit Task';
        formWrap.classList.add('input-form');
        buttonWrap.classList.add('button-wrap');
        popupHeader.style.marginTop = '30px';
        titleWrap.classList.add('title-wrap');
        descWrap.classList.add('desc-wrap');
        titleLengthCount.classList.add('length-count');
        descLengthCount.classList.add('length-count');
        popupBoard.style.paddingBottom = '40px';

        popupBoard.appendChild(popupHeader);
        titleWrap.appendChild(taskTitleInput);
        titleWrap.appendChild(titleLengthCount);
        descWrap.appendChild(taskDescInput);
        descWrap.appendChild(descLengthCount);
        formWrap.appendChild(titleWrap);
        formWrap.appendChild(descWrap);
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
            console.log(newTitle, newDesc);
            
            if (newTitle !== '' || newDesc !== '') {
                untitledTask = 0;

                if (newTitle !== '')
                    oldTitle.textContent = newTitle;
                if (newDesc !== '')
                    oldDesc.textContent = newDesc;

                console.log(oldTitle.textContent, oldDesc.textContent);
            }
            formWrap.remove();
            buttonWrap.remove();
            popupHeader.remove();
            popupContainer.style.display = 'none';

        });
        getInput();
        getTextarea();
        return;
    }

    // pin/unpin task
    if (clickedElement.classList.contains('fa-thumbtack') || clickedElement.classList.contains('fa-thumbtack-slash')) {
        if (clickedElement.classList.contains('fa-thumbtack'))
            taskList.insertBefore(taskContainer, taskList.firstChild);

        clickedElement.classList.toggle('fa-thumbtack');
        clickedElement.classList.toggle('fa-thumbtack-slash');

        taskContainer.classList.toggle('pinned');
        getInput();
        getTextarea();
        return;
    }

    // delete task
    if (clickedElement.classList.contains('fa-trash'))
    {
        taskContainer.remove();
        getInput();
        getTextarea();
        return;
    }

    if (clickedElement.classList.contains('fa-angle-down') || clickedElement.classList.contains('fa-angle-up'))
    {
        const taskDesc = taskContainer.querySelector('.task-desc');
        taskDesc.style.display = clickedElement.classList.contains('fa-angle-down') ? 'block' : 'none';
        
        clickedElement.classList.toggle('fa-angle-down');
        clickedElement.classList.toggle('fa-angle-up');
        taskContainer.classList.toggle('expanded');

        getInput();
        getTextarea();
        return;
    }
});
function getInput() {
    document.querySelectorAll('input').forEach(input => {
        const container = input.parentElement;
        const display = container.querySelector('p');
        countInputLength(input.value, display);
        input.addEventListener('input', () => countInputLength(input.value, display));
    });
}
function getTextarea() {
    document.querySelectorAll('textarea').forEach(textarea => {
        const container = textarea.parentElement;
        const display = container.querySelector('p');

        countTextareaLength(textarea.value, display);
        textarea.addEventListener('input', () => countTextareaLength(textarea.value, display));
    });
}
getInput();
getTextarea()