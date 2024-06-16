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
 * @property {bool} done
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
let previews = await send("/getPreviews", Cookies.get("id"));
console.log(previews);
console.log(Cookies.get("id"));

for (let i = 0; i < previews.length; i++) {
    if (previews[i].done == true) {
        let previewDiv = document.createElement("div");
        previewDiv.classList.add("task");

        let titleDiv = document.createElement("div");
        titleDiv.innerText = previews[i].Title;
        previewDiv.appendChild(titleDiv);
        titleDiv.classList.add("task-title");

        let dateDiv = document.createElement("div");
        dateDiv.innerText = previews[i].date;
        previewDiv.appendChild(dateDiv);
        dateDiv.classList.add("task-date");


        let descriptionDiv = document.createElement("div");
        descriptionDiv.innerText = previews[i].Description;
        previewDiv.appendChild(descriptionDiv);
        descriptionDiv.classList.add("task-description");


        let button = document.createElement("button");
        previewDiv.appendChild(button);
        button.innerText = "DONE"
        button.classList.add("add-task-btn");

        previewsContainerDone.appendChild(previewDiv);
    }

    else {
        let previewDiv = document.createElement("div");
        previewDiv.classList.add("task");

        let titleDiv = document.createElement("div");
        titleDiv.innerText = previews[i].Title;
        previewDiv.appendChild(titleDiv);
        titleDiv.classList.add("task-title");

        let dateDiv = document.createElement("div");
        dateDiv.innerText = previews[i].date;
        previewDiv.appendChild(dateDiv);
        dateDiv.classList.add("task-date");


        let descriptionDiv = document.createElement("div");
        descriptionDiv.innerText = previews[i].Description;
        previewDiv.appendChild(descriptionDiv);
        descriptionDiv.classList.add("task-description");


        let button = document.createElement("button");
        previewDiv.appendChild(button);
        button.innerText = "DONE"
        button.classList.add("add-task-btn");

        previewsContainer.appendChild(previewDiv);
    }
}

