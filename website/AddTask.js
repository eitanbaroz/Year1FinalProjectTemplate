import { send } from "./_utils";

/**@type {HTMLInputElement} */
let titleInput = document.getElementById("titleInput");

/**@type {HTMLTextAreaElement} */
let descriptionTextarea = document.getElementById("descriptionTextarea");

/**@type {HTMLTextAreaElement} */
let dateinput = document.getElementById("dateinput");

/**@type {HTMLButtonElement} */
let addTask = document.getElementById("addButton");

addButton.onclick = function () {

    let task = {
        title: titleInput.value,
        description: descriptionTextarea.value,
        date: dateinput.value
    };
   

    send("/addTask", task);

    window.location.href = "index.html";
}