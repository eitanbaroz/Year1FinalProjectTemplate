import Cookies from "./_cookies";
import { send } from "./_utils";

/**@type {HTMLInputElement} */
let usernameInput = document.getElementById("usernameInput");

/**@type {HTMLInputElement} */
let passwordInput = document.getElementById("passwordInput");

/**@type {HTMLButtonElement} */
let submitButton = document.getElementById("submitButton");

submitButton.onclick = async function () {
    /**@type {string} */
    console.log(usernameInput.value);
    console.log(passwordInput.value);
    let id = await send("/logIn", {
        username: usernameInput.value,
        password: passwordInput.value,
    });
    
    if (id == null) {
        usernameInput.value = "";
        passwordInput.value = "";
        alert("username or password are incorrect");
    }
    else {
        Cookies.set("id", id);
        top.location.href = "index.html";
    }
}