let form;
createLoginSignupButtons();


function validateUser() {
    if (localStorage.getItem("Token")) {
        window.location.assign("./homePage.html");
    }
}

function createLoginSignupButtons() {
    let menuBar = document.getElementById("loginPage");
    let loginButton = document.createElement("button");
    loginButton.innerHTML = "login";
    loginButton.onclick = () => {
        createForm();
    }
    let registerButton = document.createElement("button");
    registerButton.innerHTML = "Register";
    registerButton.onclick = () => {
        createRegisterForm();
    }
    menuBar.appendChild(loginButton);
    menuBar.appendChild(registerButton);
    registerButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        register(); 
    });
}

function createForm() {
    clearPage();
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
    form.addEventListener("click", function(event) {
        event.preventDefault();
        userlogin();
    });
    form.appendChild(submitButton);
}



function clearPage() {
    document.getElementById("loginPage").innerHTML = "";
}

async function userlogin() 
{
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let data = { userName: userName, password: password };
    console.log(userName);
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    console.log(options);
    try {
        const response = await fetch("http://localhost:3000/api/login", options);
        console.log(response);
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


function createRegisterForm(){
    clearPage();
    form = document.createElement("form");
    form.id = "registerForm";
    document.getElementById("loginPage").appendChild(form);

    var fieldName = ["EmployeeId", "Name", "Email", "Password"];
  for( let counter= 0; counter< fieldName.length; counter++) {

        let label = document.createElement("label");
        label.innerText = fieldName[counter] + ": ";
        form.appendChild(label);
        let inputElement = document.createElement("input");
        inputElement.type = (fieldName[counter] === "Password") ? "password" : "text"; 
        inputElement.placeholder = "Enter " + fieldName[counter];
        inputElement.id = fieldName[counter]; 
        inputElement.name = fieldName[counter]; 
        form.appendChild(inputElement);
        form.appendChild(document.createElement("br"));
    }
    let registerButton = document.createElement("button");
    registerButton.type = "submit";
    registerButton.innerText = "Register";
    form.addEventListener("click", function(event) {
        event.preventDefault();
        register();
    });
    form.appendChild(registerButton);
}

async function register() {
        let payloadData = getRegistrationData();
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadData)
        };
    try{
        const response = await fetch(`http://localhost:3000/api/signup`, options);

        const data = await response.json();
        console.log(data);
        if (data.Status == true) {
            alert("Registered successfully!");
            window.location.assign("./login.html");
        } else {
            alert(`Failed to register. ${data.Data}`);
        }
    } catch (error) {
        console.log(error);
    }
}


function getRegistrationData() {
    const employeeId = document.getElementById('EmployeeID').value;
    const userName = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    const formData = {
        "EmployeeId": employeeId,
        "Name": userName,
        "Email": email,
        "Password": password
    };

    return formData;
}
