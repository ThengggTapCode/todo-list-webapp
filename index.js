const taskList = document.getElementById('task-list');
const popupContainer = document.getElementById('popup-container');
const popupBoard = document.getElementById('popup-board');
const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');
const closePopup = document.querySelector('.fa-xmark');
const toastNotificationContainer = document.getElementById('toast-notification');

let untitledTask = 0;

// add task
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

// show toast notification
function showToastNotification(message, icon, color) {
    const toastContainer = document.createElement('div');
    const toastMessage = document.createElement('p');
    const closeToast = document.createElement('i');
    const toastIcon = document.createElement('i');
    const iconWrap = document.createElement('div');

    iconWrap.classList.add('icon-wrap');
    iconWrap.style.backgroundColor = color;
    closeToast.classList.add('fa-solid', 'fa-xmark');
    closeToast.style.padding = '0.3rem 0.5rem';
    closeToast.style.borderRadius = '50%';
    toastContainer.classList.add('toast-container');
    toastMessage.innerText = message;
    toastIcon.classList.add('fa-solid', icon);

    // toastContainer.classList.toggle('active');
    setTimeout(() => toastContainer.classList.toggle('active'), 1);
    iconWrap.appendChild(toastIcon);
    toastContainer.appendChild(iconWrap);
    toastContainer.appendChild(toastMessage);
    toastContainer.appendChild(closeToast);
    toastNotificationContainer.appendChild(toastContainer);

    setTimeout(() => {
        toastContainer.classList.toggle('active');
        setTimeout(() => toastContainer.remove(), 1000);
    }, 5000);
}

// count input length
function countInputLength(inputValue, display) {
    const count = inputValue.length;
    display.innerText = `${count}/50`;
}

// count textarea length
function countTextareaLength(textareaValue, display) {
    const count = textareaValue.length;
    display.innerText = `${count}/500`;
}

// action buttons logic
taskList.addEventListener('click', event => {
    const clickedElement = event.target;
    const taskContainer = (clickedElement.classList.contains('fa-circle') || clickedElement.classList.contains('fa-circle-check')) ?
        clickedElement.parentElement : clickedElement.parentElement.parentElement;

    // edit task
    if (clickedElement.classList.contains('fa-pen-to-square')) {
        // make popupContainer visible
        popupContainer.style.display = 'flex';

        // create elements for popup
        const taskTitleInput = document.createElement('input');
        const titleLengthCount = document.createElement('p');
        const titleWrap = document.createElement('div');
        const taskDescInput = document.createElement('textarea');
        const descWrap = document.createElement('div');
        const descLengthCount = document.createElement('p');
        const confimButton = document.createElement('button');
        const cancelButton = document.createElement('button')
        const oldTitle = taskContainer.querySelector('.task-title');
        const oldDesc = taskContainer.querySelector('.task-desc');
        const formWrap = document.createElement('div');
        const buttonWrap = document.createElement('div')
        const popupHeader = document.createElement('h2');

        // set attributes for elements
        taskTitleInput.id = 'new-task-title';
        taskDescInput.id = 'new-task-desc';
        taskTitleInput.placeholder = 'Enter new title';
        taskDescInput.placeholder = 'Enter new description';
        taskTitleInput.maxLength = 50;
        taskDescInput.maxLength = 500;
        confimButton.classList.add('confim-button');
        confimButton.innerText = 'Submit';
        cancelButton.classList.add('cancel-button');
        cancelButton.innerText = 'Cancel';
        popupHeader.innerText = 'Edit Task';
        formWrap.classList.add('input-form');
        buttonWrap.classList.add('button-wrap');
        popupHeader.style.marginTop = '30px';
        titleWrap.classList.add('title-wrap');
        descWrap.classList.add('desc-wrap');
        titleLengthCount.classList.add('length-count');
        descLengthCount.classList.add('textarea-length-count');
        popupBoard.style.paddingBottom = '40px';

        // appending elements
        popupBoard.appendChild(popupHeader);
        titleWrap.appendChild(taskTitleInput);
        titleWrap.appendChild(titleLengthCount);
        descWrap.appendChild(taskDescInput);
        descWrap.appendChild(descLengthCount);
        formWrap.appendChild(titleWrap);
        formWrap.appendChild(descWrap);
        buttonWrap.appendChild(confimButton);
        buttonWrap.appendChild(cancelButton);
        popupBoard.appendChild(formWrap);
        popupBoard.appendChild(buttonWrap);

        // cancel button -> remove elements to close popup
        cancelButton.addEventListener('click', () => {
            formWrap.remove();
            buttonWrap.remove();
            popupHeader.remove();
            popupContainer.style.display = 'none';
        });

        // close popup button -> remove elements to close popup
        closePopup.addEventListener('click', () => {
            formWrap.remove();
            buttonWrap.remove();
            popupHeader.remove();
            popupContainer.style.display = 'none';
        });

        // confirm button -> submit new changes
        confimButton.addEventListener('click', () => {
            const newTitle = taskTitleInput.value.trim();
            const newDesc = taskDescInput.value.trim();

            if (newTitle !== '' || newDesc !== '') {
                untitledTask = 0;

                if (newTitle !== '')
                    oldTitle.textContent = newTitle;
                if (newDesc !== '')
                    oldDesc.textContent = newDesc;

                // show a new toast notification after edit
                showToastNotification('Task edited successfully!', 'fa-pen-to-square', 'green');
            }

            // remove elements to close popup
            formWrap.remove();
            buttonWrap.remove();
            popupHeader.remove();
            popupContainer.style.display = 'none';

        });
        getInput();
        getTextarea();
        return;
    }

    // check/uncheck task
    if (clickedElement.classList.contains('fa-circle') || clickedElement.classList.contains('fa-circle-check')) {
        
        // toggle 'checked' class
        taskContainer.classList.toggle('checked');

        // toggle icon
        clickedElement.classList.toggle('fa-circle');
        clickedElement.classList.toggle('fa-circle-check');

        return;
    }

    // pin/unpin task
    if (clickedElement.classList.contains('fa-thumbtack') || clickedElement.classList.contains('fa-thumbtack-slash')) {

        // pining/unpining task
        if (clickedElement.classList.contains('fa-thumbtack'))
            taskList.insertBefore(taskContainer, taskList.firstChild);

        // create icons for toast notification
        const icon = clickedElement.classList.contains('fa-thumbtack') ? 'fa-thumbtack' : 'fa-thumbtack-slash';
        const message = clickedElement.classList.contains('fa-thumbtack') ? 'Task pinned!' : 'Task unpinned!';
        showToastNotification(message, icon, 'green');

        // toggle icon
        clickedElement.classList.toggle('fa-thumbtack');
        clickedElement.classList.toggle('fa-thumbtack-slash');

        // toggle 'pinned' class
        taskContainer.classList.toggle('pinned');

        getInput();
        getTextarea();
        return;
    }

    // delete task
    if (clickedElement.classList.contains('fa-trash')) {

        // create elements for popup
        const popupHeader = document.createElement('h2');
        const buttonWrap = document.createElement('div');
        const confirmBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');

        // make popupContainer visible
        popupContainer.style.display = 'flex';

        // attributes for elements
        confirmBtn.classList.add('confirm-button');
        cancelBtn.classList.add('cancel-button');
        confirmBtn.innerText = 'Confirm';
        cancelBtn.innerText = 'Cancel';
        popupHeader.innerText = 'Do you want to delete this task?';
        popupHeader.style.fontSize = '2em';
        popupHeader.style.marginTop = '60px';
        popupBoard.style.paddingBottom = '40px';
        buttonWrap.appendChild(confirmBtn);
        buttonWrap.appendChild(cancelBtn);
        popupBoard.appendChild(popupHeader);
        popupBoard.append(buttonWrap);

        // cancel button -> remove elements to close popup
        cancelBtn.addEventListener('click', () => {
            popupContainer.style.display = 'none';
            buttonWrap.remove();
            popupHeader.remove();
        });

        // close popup button -> remove elements to close popup
        closePopup.addEventListener('click', () => {
            popupContainer.style.display = 'none';
            buttonWrap.remove();
            popupHeader.remove();
        });

        // confirm delete task
        confirmBtn.addEventListener('click', () => {

            // delete task
            taskContainer.remove();

            // remove elements to close popup
            popupContainer.style.display = 'none';
            buttonWrap.remove();
            popupHeader.remove();

            // show toast notification
            showToastNotification('Task deleted successfully!', 'fa-trash', 'green');
        });
        return;
    }

    // expand task
    if (clickedElement.classList.contains('fa-angle-down') || clickedElement.classList.contains('fa-angle-up')) {

        const taskDesc = taskContainer.querySelector('.task-desc');
        // toggle taskDesc visibility
        taskDesc.style.display = clickedElement.classList.contains('fa-angle-down') ? 'block' : 'none';

        // toggle icon
        clickedElement.classList.toggle('fa-angle-down');
        clickedElement.classList.toggle('fa-angle-up');
        taskContainer.classList.toggle('expanded');

        getInput();
        getTextarea();
        return;
    }
});

// theme switching
document.querySelector('.theme-switch').addEventListener('click', event => {
    const clickedElement = event.target;
    const body = document.body;

    // toggle 'dark-theme' class
    body.classList.toggle('dark-theme');

    if (clickedElement.classList.contains('fa-sun') || clickedElement.classList.contains('fa-moon')) {
        clickedElement.classList.toggle('fa-sun');
        clickedElement.classList.toggle('fa-moon');
    } else {
        const switchBtn = clickedElement.querySelector('i');
        switchBtn.classList.toggle('fa-sun');
        switchBtn.classList.toggle('fa-moon');
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
toastNotificationContainer.addEventListener('click', event => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('fa-xmark')) {

        const toast = clickedElement.parentElement;
        toast.classList.toggle('active');
        setTimeout(() => toast.remove(), 1000);
        return;
    }
});
getInput();
getTextarea()