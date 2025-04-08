const taskList = document.getElementById('task-list');
const popupContainer = document.getElementById('popup-container');
const popupBoard = document.getElementById('popup-board');
const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');
const closePopup = document.querySelector('.fa-xmark');
const toastNotificationContainer = document.getElementById('toast-notification');

let untitledTask = 0;

function checkTaskCount() {
    getPreferredTheme();
    getData();
    getUntitledCount();
    const inputForm = document.getElementById('input-form');

    if (taskList.childElementCount === 0) {
        // create 'no task found' board
        const title = document.createElement('p');
        const addBtn = document.createElement('button');
        const wrap = document.createElement('div');
        addBtn.classList.add('submit-task');
        addBtn.setAttribute('onclick', 'addTask()');
        addBtn.innerText = 'Add';
        title.innerText = 'Hiện không có nhiệm vụ cần làm!';
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
    if (popupBoard.querySelector('.input-form'))
        popupBoard.querySelector('.input-form').remove();

    popupContainer.style.display = 'flex';
    popupBoard.innerHTML = `
    <i class="fa-solid fa-xmark" id="close-popup"></i>
    <h2 class="popup-header" style="text-align: center;">Thêm nhiệm vụ mới</h2>
    <div class="input-form">
        <div style="position: relative;">
            <input maxlength="30" placeholder="Nhập tiêu đề" autocomplete="off">
            <p class="length-count">0/30</p>
        </div>
        <div style="position: relative;">
            <textarea maxlength="400" placeholder="Nhập mô tả"></textarea>
            <p class="textarea-length-count">0/400</p>
        </div>
    </div>
    <div class="button-wrap">
        <button id="add-task">Thêm</button>
        <button class="cancel-button">Hủy</button>
    </div>
    `;

    getInput();
    getTextarea();

    // close popup on cancel button click
    popupBoard.querySelector('.cancel-button').onclick = closePopupBoard;

    // close popup on close popup button click
    popupBoard.querySelector('#close-popup').onclick = closePopupBoard;
    
    // add task
    popupBoard.querySelector('#add-task').onclick = function() {

        const newTask = document.createElement('div');
        const title = popupBoard.querySelector('input');
        const desc = popupBoard.querySelector('textarea');
        let taskTitle, taskDesc;

        // check input vale
        if (title.value === '') {
            untitledTask++;
            saveUntitledCount();
            taskTitle = `Không có tiêu đề ${untitledTask}` // default if input is empty
        } else {
            untitledTask = 0;
            saveUntitledCount();
            taskTitle = title.value.trim(); // set title
        }

        taskDesc = desc.value === '' ? 'Không có mô tả' : desc.value.trim(); // set desc, default if textarea is empty

        newTask.innerHTML = `
        <i class="fa-regular fa-circle"></i>
        <div class="task-info">
            <p class="task-title">${taskTitle}</p>
            <p class="task-desc" style="display: none;">${taskDesc}</p>
        </div>
        <div class="action-btn">
            <i class="fa-solid fa-angle-down"></i>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-thumbtack"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
        `;
        newTask.classList.add('task-container');
        // add task to task list
        taskList.appendChild(newTask);
        saveData();

        // close popup
        popupBoard.innerHTML = '';
        popupContainer.style.display = 'none';

        checkTaskCount();
        showToastNotification(`Đã thêm "${taskTitle}"!`, 'fa-note-sticky', 'green');
    };
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
    display.innerText = `${count}/30`;
}

// count textarea length
function countTextareaLength(textareaValue, display) {
    const count = textareaValue.length;
    display.innerText = `${count}/400`;
}

// action buttons logic
taskList.addEventListener('click', event => {
    const clickedElement = event.target;
    const taskContainer = (clickedElement.classList.contains('fa-circle') || clickedElement.classList.contains('fa-circle-check')) ?
        clickedElement.parentElement : clickedElement.parentElement.parentElement;
    const taskTitle = taskContainer.querySelector('.task-title');

    // edit task
    if (clickedElement.classList.contains('fa-pen-to-square')) {

        if (popupBoard.querySelector('.input-form'))
            popupBoard.querySelector('.input-form').remove();
        
        // make popupContainer visible
        popupContainer.style.display = 'flex';

        const oldTitle = taskContainer.querySelector('.task-title');
        const oldDesc = taskContainer.querySelector('.task-desc');

        popupBoard.innerHTML = `
        <i class="fa-solid fa-xmark" id="close-popup"></i>
        <h2 class="popup-header" style="text-align: center;">Chỉnh sửa "${taskTitle.innerText}"</h2>
        <div class="input-form">
            <div class="title-wrap">
                <input id="new-task-title" placeholder="Nhập tiêu đề mới" maxlength="30">
                <p class="length-count">0/30</p>
            </div>
            <div class="desc-wrap">
                <textarea id="new-task-desc" placeholder="Nhập mô tả mới" maxlength="400"></textarea>
                <p class="textarea-length-count">0/400</p>
            </div>
        </div>
        <div class="button-wrap">
            <button class="confirm-button">Chỉnh sửa</button>
            <button class="cancel-button">Hủy</button>
        </div>

        `;
        // cancel button -> remove elements to close popup
        popupBoard.querySelector('.cancel-button').onclick = closePopupBoard;

        // close popup button -> remove elements to close popup
        popupBoard.querySelector('#close-popup').onclick = closePopupBoard;

        // confirm button -> submit new changes
        popupBoard.querySelector('.confirm-button').onclick = function() {
            const taskTitleInput = popupBoard.querySelector('#new-task-title');
            const taskDescInput = popupBoard.querySelector('#new-task-desc');
            const newTitle = taskTitleInput.value.trim();
            const newDesc = taskDescInput.value.trim();
            const oldTitleText = oldTitle.innerText;

            if (newTitle !== '' || newDesc !== '') {
                untitledTask = 0;

                if (newTitle !== '')
                    oldTitle.innerText = newTitle;
                if (newDesc !== '')
                    oldDesc.innerText = newDesc;

                // show a new toast notification after edit
                showToastNotification(`Đã chỉnh sửa "${oldTitleText}"!`, 'fa-pen-to-square', 'green');
            }

            // remove elements to close popup
            popupBoard.innerHTML = '';
            popupContainer.style.display = 'none';
            
            saveData();
        };
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

        saveData();
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
            `Đã ghim "${taskTitle.innerText}"!` : `Đã bỏ ghim "${taskTitle.innerText}"!`;

        showToastNotification(message, icon, 'green');

        // toggle icon
        clickedElement.classList.toggle('fa-thumbtack');
        clickedElement.classList.toggle('fa-thumbtack-slash');

        // toggle 'pinned' class
        taskContainer.classList.toggle('pinned');

        getInput();
        getTextarea();
        saveData();
        return;
    }

    // delete task
    if (clickedElement.classList.contains('fa-trash')) {

        if (popupBoard.querySelector('.input-form'))
            popupBoard.querySelector('.input-form').remove();

        // make popupContainer visible
        popupContainer.style.display = 'flex';

        popupBoard.innerHTML = `
            <i class="fa-solid fa-xmark" id="close-popup"></i>
            <h2 class="popup-header" style="text-align: center;">Xóa "${taskTitle.innerText}"?</h2>
            <div>
                <button class="confirm-button">Xóa</button>
                <button class="cancel-button">Hủy</button>
            </div>
        `;
        popupBoard.classList.add('delete-task-popup');
        
        // cancel button -> remove elements to close popup
        popupBoard.querySelector('.cancel-button').onclick = closePopupBoard;

        // close popup button -> remove elements to close popup
        popupBoard.querySelector('#close-popup').onclick = closePopupBoard;

        // confirm delete task
        popupBoard.querySelector('.confirm-button').onclick = function() {

            // delete task
            taskContainer.remove();
            untitledTask = (untitledTask > 0) ? untitledTask -= 1 : 0;
            saveUntitledCount();
            saveData();

            // remove elements to close popup
            popupBoard.innerHTML = '';
            popupContainer.style.display = 'none';

            // show toast notification
            checkTaskCount();
            showToastNotification(`Đã xóa "${taskTitle.innerText}"!`, 'fa-trash', 'green');
        };
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
    setPreferredTheme();

    if (clickedElement.classList.contains('fa-sun') || clickedElement.classList.contains('fa-moon')) {
        clickedElement.classList.toggle('fa-sun');
        clickedElement.classList.toggle('fa-moon');
    } else {
        const switchBtn = clickedElement.querySelector('i');
        switchBtn.classList.toggle('fa-sun');
        switchBtn.classList.toggle('fa-moon');
    }
});
function closePopupBoard() {
    popupBoard.innerHTML = '';
    popupContainer.style.display = 'none';
}
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
function saveData() {
    localStorage.setItem('data', taskList.innerHTML);
}
function getData() {
    const data = localStorage.getItem('data');
    if (data)
        taskList.innerHTML = data;
}
function saveUntitledCount() {
    localStorage.setItem('untitled-count', untitledTask);
}
function getUntitledCount() {
    const count = parseInt(localStorage.getItem('untitled-count'));
    untitledTask = count ? count : 0;
}
function setPreferredTheme() {
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}
function getPreferredTheme() {
    const theme = localStorage.getItem('theme');
    const switcher = document.querySelector('#theme-switch i');

    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        switcher.classList.add('fa-sun');
        switcher.classList.remove('fa-moon');
    } else if (theme === 'light') {
        switcher.classList.add('fa-moon');
        switcher.classList.remove('fa-sun');
    }

}
const date = new Date();
document.querySelector('.footer-bottom p').innerHTML = `&copy; ${date.getFullYear()} ThengggTapCode. All rights reserved.`

getInput();
getTextarea()
checkTaskCount()