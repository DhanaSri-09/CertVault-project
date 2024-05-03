let token = localStorage.getItem('Token');
let fields = ["CertificateName", "IssuingOrganization", "IssueDate", "ExpireDate", "CertificateID", "CertificateUrl"];

showCertificates();
createLogoutButton();


async function loadCerts() {
    let options = {
        method: "GET",
        headers: { "Content-Type": "text/javascript", "Token": token }
    };
    const response = await fetch("http://localhost:3000/api/certs", options);
    let certs = await response.json();
    return certs;
}


function createLogoutButton() {
    const logoutButton = document.createElement('button');
    logoutButton.innerHTML = "Logout";
    logoutButton.style.float = "right";
    logoutButton.style.top = "1px";
    logoutButton.onclick = () => {
        logout(token);
    };
    document.getElementById('Certs').appendChild(logoutButton);
}

async function logout(pToken) {
    if (confirm("Do you want to logout?")) {
        localStorage.removeItem(pToken);
        alert("Logged out");
        window.location.assign('./login.html');
    } else {
        alert("Cancelled");
    }
}

async function showCertificates() {
    document.getElementById("Certs").innerHTML = "";
    await insertdata();
    try {
        let htmlElements = ["h2", "span", "span", "span", "span", "span"];

        let response = await loadCerts();
        let certs = response.certificates;
        let block = document.getElementById("Certs");
        for (let certCounter = 0; certCounter < certs.length; certCounter++) {
            let div = document.createElement("div");
            div.id = "cert";
            for (let counter = 0; counter < htmlElements.length; counter++) {
                if (counter >= 1) {
                    let label = document.createElement("label");
                    label.innerText = fields[counter] + ": ";
                    div.appendChild(document.createElement("br"));
                    div.appendChild(label);
                }
                let element = document.createElement(htmlElements[counter]);
                element.innerText = certs[certCounter][fields[counter]];
                div.appendChild(element);
            }
            block.appendChild(div);
            div.appendChild(document.createElement("br"));
            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.addEventListener("click", function () {
                editCert(div);
            });
            div.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteCertificate(div);
            });
            div.appendChild(deleteButton);
        }
    } catch (error) {
        console.error("Error displaying certificates:", error);
    }
}

function insertdata() {
    let cert = document.getElementById("Certs");
    let insertButton = document.createElement("button");
    insertButton.innerHTML = "+";
    insertButton.onclick = () => {
        CreateElements();
    }
    cert.appendChild(insertButton);
}

function CreateElements() {
    for (let counter = 0; counter < fields.length; counter++) {
        const Label = document.createElement('label');
        Label.textContent = fields[counter] + ": ";
        document.body.appendChild(Label);
        const TextBox = document.createElement('input');
        TextBox.type = (fields[counter] === "IssueDate" || fields[counter] === "ExpireDate") ? "date" : "text";
        TextBox.name = fields[counter];
        TextBox.id = fields[counter];
        TextBox.placeholder = 'Enter ' + fields[counter];
        document.body.appendChild(TextBox);

        const BreakLine = document.createElement('br');
        document.body.appendChild(BreakLine);
    }
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        insertCertificate();
    });
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener("click", function (event) {
        event.preventDefault();
        updateCertificate();
    });
    document.body.appendChild(submitButton);
    document.body.appendChild(updateButton);
}

function getCertificateData() {
    let cert = {};
    for (let counter = 0; counter < fields.length; counter++) {
        let fieldName = fields[counter];
        let element = document.getElementById(fieldName);
        if (element) {
            cert[fieldName] = element.value;
        } else {
            console.log(`Element with ID '${fieldName}' not found.`);
        }
    }
    console.log(cert);
    return cert;
}

async function insertCertificate() {
    let certificate = getCertificateData();
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificate)
    };
    try {
        console.log(token);
        const response = await fetch(`http://localhost:3000/api/certs`, options);
        const data = await response.json();
        console.log(data);
        if (data.Status == true) {
            alert("certificate added successfully!");
            clearInputFields();
        } else {
            alert(`Failed to add. ${data.Data}`);
        }
        showCertificates();
    }
    catch (error) {
        console.log(error);
    }
}

function addButtons(certBlock) {
    let buttons = ["Edit", "Delete"];
    let functions = ["editCert", "deleteCert"];
    certBlock.appendChild(document.createElement("br"));
    for (let counter = 0; counter < buttons.length; counter++) {
        let button = document.createElement("button");
        button.innerText = buttons[counter];
        button.addEventListener("click", function () {
            window[functions[counter]](certBlock);
        });
        certBlock.appendChild(button);
    }
}

function populateInputBoxes(cert) {
    for (let counter = 0; counter < fields.length; counter++) {
        document.getElementById(fields[counter]).value = cert[fields[counter]];
    }
}

async function editCert(certBlock) {
    const cert = {};
    certBlock.childNodes.forEach(child => {
        if (child.tagName === 'SPAN') {
            const label = child.previousElementSibling.textContent.replace(':', '').trim();
            const value = child.textContent.trim();
            cert[label] = value;
        }
    });
    populateInputBoxes(cert);
}

async function updateCertificate() {
    let certificate = getCertificateData();
     const certId = certBlock.querySelector('span[data-field="CertificateID"]').innerText;
    let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificate)
    };
    try {
        console.log(token);
        const response = await fetch(`http://localhost:3000/api/certs/${certId}`, options);
        const data = await response.json();
        if (data.Status == true) {
            alert("certificate updated successfully!");
            clearInputFields();
        } else {
            alert(`Failed to update. ${data.Data}`);
        }
        showCertificates();
    }
    catch (error) {
        console.log(error);
    }
}



async function deleteCertificate(certBlock) {
    if (confirm("Are you sure you want to delete this certificate?")) {
        const certId = certBlock.querySelector('span[data-field="CertificateID"]').innerText;
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Token': token }
        };
        try {
            const response = await fetch(`http://localhost:3000/api/certs/${certId}`, options);
            const data = await response.json();
            if (data.Status == true) {
                alert("Certificate deleted successfully!");
                certBlock.parentNode.removeChild(certBlock);
            } else {
                alert(`Failed to delete. ${data.Data}`);
            }
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }
    }
}


function clearInputFields() {
    for (let counter = 0; counter < fields.length; counter++) {
        let element = document.getElementById(fields[counter]);
        if (element) {
            element.value = "";
        }
    }
}