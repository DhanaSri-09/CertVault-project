let form;

createForm();
bindEvent();

function validateUser() {
    if (localStorage.getItem("Token")) {
        window.location.assign("./homePage.html");
    }
}

function createForm() {
    form = document.createElement("form");
    form.id = "loginForm";
    document.getElementById("loginPage").appendChild(form);
    
    let label = document.createElement("label");
    label.innerText = "Username:";
    form.appendChild(label);
    let userNameInput = document.createElement("input");
    userNameInput.type = "text";
    userNameInput.id = "userName";
    form.appendChild(userNameInput);
    form.appendChild(document.createElement("br"));

    label = document.createElement("label");
    label.innerText = "Password:";
    form.appendChild(label);
    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    form.appendChild(passwordInput);
    form.appendChild(document.createElement("br"));

    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";
    form.appendChild(submitButton);
}

function bindEvent() {
    form.addEventListener("submit", function(event) {
        userlogin();
    });
}

async function userlogin() 
{
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let data = { userName: userName, password: password };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch("http://localhost:3000/api/login", options);
        let result = await response.json();
        if (result.Token) {
            alert("Login successfully!");
            localStorage.setItem("Token", result.Token);
            window.location.assign("./homePage.html");
        }
    } catch (error) {
        console.error('Unable to fetch:', error);
    }
}
