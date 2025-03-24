const taskList = document.getElementById('task-list');
const popupContainer = document.getElementById('popup-container');
const popupBoard = document.getElementById('popup-board');
const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');
const closePopup = document.querySelector('.fa-xmark');
const toastNotificationContainer = document.getElementById('toast-notification');

let untitledTask = 0;

function checkTaskCount() {
    const inputForm = document.getElementById('input-form');

    if (taskList.childElementCount === 0) {
        // create 'no task found' board
        const title = document.createElement('p');
        const addBtn = document.createElement('button');
        const wrap = document.createElement('div');
        addBtn.classList.add('submit-task');
        addBtn.setAttribute('onclick', 'addTask()');
        addBtn.innerText = 'Add';
        title.innerText = 'No task found, add a new one';
        title.classList.add('notaskfound-title');
        wrap.classList.add('notaskfound-wrap');

        wrap.appendChild(title);
        wrap.appendChild(addBtn);
        taskList.appendChild(wrap);
        inputForm.style.display = 'none';

    } else if (taskList.contains(document.querySelector('.notaskfound-wrap'))) {
        document.querySelector('.notaskfound-wrap').remove();
        inputForm.style.display = 'flex';
    }
}
// add task
function addTask() {
    const title = document.createElement('input');
    const desc = document.createElement('textarea');
    const titleWrap = document.createElement('div');
    const descWrap = document.createElement('div');
    const titleLengthCount = document.createElement('p');
    const descLengthCount = document.createElement('p');
    const newTask = document.createElement('div');
    const taskTitle = document.createElement('p');
    const taskDesc = document.createElement('p');
    const taskInfoWrap = document.createElement('div');
    const editBtn = document.createElement('i');
    const pinBtn = document.createElement('i');
    const deleteBtn = document.createElement('i');
    const actionBtnWrap = document.createElement('div');
    const popupHeader = document.createElement('h2');
    const addBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const buttonWrap = document.createElement('div');

    // show popup
    popupContainer.style.display = 'flex';

    // styling & attributes
    title.maxLength = '50';
    desc.maxLength = '500';
    title.placeholder = 'Enter task title';
    desc.placeholder = 'Enter task description';
    title.autocomplete = 'off';
    titleLengthCount.classList.add('length-count');
    descLengthCount.classList.add('textarea-length-count');
    addBtn.id = 'add-task';
    cancelBtn.classList.add('cancel-button');
    addBtn.innerText = 'Add';
    cancelBtn.innerText = 'Cancel';
    popupHeader.innerText = 'Create a new task';
    popupHeader.style.textAlign = 'center';
    titleWrap.style.position = 'relative';
    descWrap.style.position = 'relative';
    newTask.classList.add('task-container');

    // add input, textarea, buttons to wrap div
    titleWrap.appendChild(title);
    titleWrap.appendChild(titleLengthCount);
    descWrap.appendChild(desc);
    descWrap.appendChild(descLengthCount);
    buttonWrap.appendChild(addBtn);
    buttonWrap.appendChild(cancelBtn);

    // add wrap div to popup
    popupBoard.appendChild(popupHeader);
    popupBoard.appendChild(titleWrap);
    popupBoard.appendChild(descWrap);
    popupBoard.appendChild(buttonWrap);

    getInput();
    getTextarea();

    // close popup on cancel button click
    cancelBtn.addEventListener('click', () => {
        popupHeader.remove();
        titleWrap.remove();
        descWrap.remove();
        buttonWrap.remove();
        popupContainer.style.display = 'none';
    });

    // close popup on close popup button click
    closePopup.addEventListener('click', () => {
        popupHeader.remove();
        titleWrap.remove();
        descWrap.remove();
        buttonWrap.remove();
        popupContainer.style.display = 'none';
    })

    // add task
    addBtn.addEventListener('click', () => {
        // check input vale
        if (title.value === '') {
            untitledTask++;
            taskTitle.innerText = `Untitled task #${untitledTask}` // default if input is empty
        } else {
            untitledTask = 0;
            taskTitle.innerText = title.value.trim(); // set title
        }

        taskDesc.innerText = desc.value === '' ? 'No description' : desc.value.trim(); // set desc, default if textarea is empty

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

        // close popup
        popupHeader.remove();
        titleWrap.remove();
        descWrap.remove();
        buttonWrap.remove();
        popupContainer.style.display = 'none';

        checkTaskCount();
        showToastNotification(`Added "${taskTitle.innerText}"!`, 'fa-note-sticky', 'green');
    });
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
    const taskTitle = taskContainer.querySelector('.task-title');

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
        confimButton.innerText = 'Edit';
        cancelButton.classList.add('cancel-button');
        cancelButton.innerText = 'Cancel';
        popupHeader.innerText = `Edit "${taskTitle.innerText}"`;
        popupHeader.style.textAlign = 'center';
        formWrap.classList.add('input-form');
        buttonWrap.classList.add('button-wrap');
        titleWrap.classList.add('title-wrap');
        descWrap.classList.add('desc-wrap');
        titleLengthCount.classList.add('length-count');
        descLengthCount.classList.add('textarea-length-count');

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
                    oldTitle.innerText = newTitle;
                if (newDesc !== '')
                    oldDesc.innerText = newDesc;

                // show a new toast notification after edit
                showToastNotification(`Edited "${oldTitle.innerText}"!`, 'fa-pen-to-square', 'green');
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
        const message = clickedElement.classList.contains('fa-thumbtack') ?
            `Pinned "${taskTitle.innerText}"!` : `Unpinned "${taskTitle.innerText}"!`;

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
        confirmBtn.innerText = 'Yes';
        cancelBtn.innerText = 'No';
        popupHeader.innerText = `Do you want to delete "${taskTitle.innerText}"?`;
        popupHeader.style.fontSize = '2em';
        popupHeader.style.margin = '0 20px';
        popupHeader.style.textAlign = 'center';
        popupBoard.style.width = '600px';

        buttonWrap.appendChild(confirmBtn);
        buttonWrap.appendChild(cancelBtn);
        popupBoard.appendChild(popupHeader);
        popupBoard.append(buttonWrap);

        // cancel button -> remove elements to close popup
        cancelBtn.addEventListener('click', () => {
            popupContainer.style.display = 'none';
            buttonWrap.remove();
            popupHeader.remove();
            popupBoard.style.width = '700px';
        });

        // close popup button -> remove elements to close popup
        closePopup.addEventListener('click', () => {
            popupContainer.style.display = 'none';
            buttonWrap.remove();
            popupHeader.remove();
            popupBoard.style.width = '700px';
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
            checkTaskCount();
            showToastNotification(`Deleted "${taskTitle.innerText}"!`, 'fa-trash', 'green');
            popupBoard.style.width = '700px';
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
document.querySelector('#theme-switch').addEventListener('click', event => {
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
        if (toast.classList.contains('active')) {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 1000);
            return;
        }
        return;
    }
});
getInput();
getTextarea()
checkTaskCount()