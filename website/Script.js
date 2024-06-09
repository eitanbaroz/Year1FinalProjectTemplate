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

AddTask.onclick = function () {
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
