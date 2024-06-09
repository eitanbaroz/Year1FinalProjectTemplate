import Cookies from "./_cookies";
/**@type {HTMLButtonElement} */
let Logout = document.getElementById("logout");

// Get references to the "Add Task" links
// const addNewTaskLink = document.getElementById('add-new-task');
// const addInProgressTaskLink = document.getElementById('add-in-progress-task');
// const addDoneTaskLink = document.getElementById('add-done-task');


// Add click event listeners to the "Add Task" links
// addNewTaskLink.addEventListener('click', handleAddTask);
// addInProgressTaskLink.addEventListener('click', handleAddTask);
// addDoneTaskLink.addEventListener('click', handleAddTask);


/**@type {HTMLButtonElement} */
let AddTask = document.getElementsByClassName('add-task-btn')[0];

/**
 * @typedef Preview
 * @property {number} id
 * @property {string} title
 * @property {string} imageSource
 * */


/**@type {HTMLDivElement} */
let previewsContainer = document.getElementById("previewsContainer");

AddTask.onclick = function () {
    if (Cookies.get("id") == undefined) {
        alert("log in first");
    }
    else {
        window.location.href = 'AddTask.html';
    }
}

AddTask2.onclick = function () {
    if (Cookies.get("id") == undefined) {
        alert("log in first");
    }
    else {
        window.location.href = 'AddTask.html';
    }
}


AddTask3.onclick = function () {
    if (Cookies.get("id") == undefined) {
        alert("log in first");
    }
    else {
        window.location.href = 'AddTask.html';
    }
}


Logout.onclick = function () {
    window.location.href = 'login.html';
    Cookies.remove('id');
}

/**@type {Preview[]} */
let previews = await send("/getPreviews");


for (let i = 0; i < previews.length; i++) {
    let previewA = createPreviewA(previews[i]);
}

/**
 * @param {Preview} preview
 * @returns {HTMLAnchorElement} 
 */
function createPreviewA(preview) {
    let a = document.createElement("a");
    a.classList.add("preview");
    a.href = "book.html?bookId=" + preview.id;

    let titleDiv = document.createElement("div");
    titleDiv.innerText = preview.title;
    a.appendChild(titleDiv);

    return a;
}


