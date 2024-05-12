// Get references to the "Add Task" links
const addNewTaskLink = document.getElementById('add-new-task');
const addInProgressTaskLink = document.getElementById('add-in-progress-task');
const addDoneTaskLink = document.getElementById('add-done-task');

// Add click event listeners to the "Add Task" links
addNewTaskLink.addEventListener('click', handleAddTask);
addInProgressTaskLink.addEventListener('click', handleAddTask);
addDoneTaskLink.addEventListener('click', handleAddTask);

// Function to handle the "Add Task" click event
function handleAddTask() {
window.location.href='AddTask.html';
}