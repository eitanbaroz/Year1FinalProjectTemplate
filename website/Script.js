import Cookies from "./_cookies";
import { send } from "./_utils";
/**@type {HTMLButtonElement} */
let Logout = document.getElementById("logout");

/**@type {HTMLButtonElement} */
let AddTask = document.getElementsByClassName('add-task-btn')[0];

/**
 * @typedef Preview
 * @property {number} Id
 * @property {string} Title
 * @property {string} date
 * @property {string} Description
 * @property {string} UserId
 * @property {bool} Done
 * */

/**@type {HTMLDivElement} */
let previewsContainer = document.getElementById("previewsContainer");

/**@type {HTMLDivElement} */
let previewsContainerDone = document.getElementById("previewsContainerDone");

AddTask.onclick = function () {
    if (Cookies.get("id") == undefined) {
        alert("log in first");
    }
    else {
        window.location.href = 'AddTask.html';
    }
}

logout.onclick = function () {
    window.location.href = 'login.html';
    Cookies.remove('id');
}

/**@type {Preview[]} */
let previews = await send("/getPreviews", Cookies.get("id"));
console.log(previews);
console.log(Cookies.get("id"));

for (let i = 0; i < previews.length; i++) {

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


    if (previews[i].Done) {
        previewsContainerDone.appendChild(previewDiv);
    }
    else {
        previewsContainer.appendChild(previewDiv);
    }


}

