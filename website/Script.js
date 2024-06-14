import Cookies from "./_cookies";
import { send } from "./_utils";
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
 * @property {number} Id
 * @property {string} Title
 * @property {string} date
 * @property {string} Description
 * @property {string} UserId
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

// AddTask2.onclick = function () {
//     if (Cookies.get("id") == undefined) {
//         alert("log in first");
//     }
//     else {
//         window.location.href = 'AddTask.html';
//     }
// }


// AddTask3.onclick = function () {
//     if (Cookies.get("id") == undefined) {
//         alert("log in first");
//     }
//     else {
//         window.location.href = 'AddTask.html';
//     }
// }


Logout.onclick = function () {
    window.location.href = 'login.html';
    Cookies.remove('id');
}

/**@type {Preview[]} */
let previews = await send("/getPreviews");
for (let i = 0; i < previews.length; i++) {
    console.log(previews);

    let previewDiv = document.createElement("div");
    previewDiv.classList.add("column");

    let titleDiv = document.createElement("div");
    titleDiv.innerText = previews[i].Title;
    previewDiv.appendChild(titleDiv);

    let dateDiv = document.createElement("div");
    dateDiv.innerText = previews[i].date;
    previewDiv.appendChild(dateDiv);

    let descriptionDiv = document.createElement("div");
    descriptionDiv.innerText = previews[i].Description;
    previewDiv.appendChild(descriptionDiv);

    previewsContainer.appendChild(previewDiv);

    console.log(previewDiv);
}

