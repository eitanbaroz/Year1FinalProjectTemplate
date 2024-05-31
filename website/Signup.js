import{send} from "./_utils";
import Cookies  from "./_cookies";

/**@type {HTMLInputElement} */
let usernameInput = document.getElementById("usernameInput");

/**@type {HTMLInputElement} */
let passwordInput = document.getElementById("passwordInput");

/**@type {HTMLInputElement} */
let submitButton = document.getElementById("submitButton");

submitButton.onclick = async function(){
    /**@type {HTMLInputElement} */
    let id = await send("/signUp",{
        username: usernameInput.value,
        password: passwordInput.value,
    })

Cookies.set("id",id);

top.location.href= "index.html";

}

