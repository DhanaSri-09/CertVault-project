const express = require('express');
const sqlite = require('sqlite3');
const CORS = require('cors')

const app = express();
const Port = 3000;
const db = new sqlite.Database('D:/Training/Project/CertVault.db');
app.use(CORS());

app.get('/api/:employeeId/certs', (req, res) =>{
    const employeeId = req.params.employeeId;
    db.all('SELECT * FROM Certificate WHERE EmployeeId = ?', [employeeId], (err, rows) => {
        if (err) 
        {
            res.status(500).json({ error: 'Error retrieving certificates' });
        } 
        else 
        {
            res.json(rows);
        }
    });
});


app.post('/api/:employeeId/certs/addCert', (req, res) =>{
    const employeeId = req.params.employeeId;
    const { EmployeeId, CertificateId, CertificateName, IssuingOrganization, IssueDate, ExpireDate, CertificateUrl } = req.query; 
    db.run('INSERT INTO Certificate (EmployeeId, CertificateId, CertificateName, IssuingOrganization, IssueDate, ExpireDate, CertificateUrl) VALUES (?, ?, ?, ?, ?, ?, ?)', 
           [EmployeeId, CertificateId, CertificateName, IssuingOrganization, IssueDate, ExpireDate, CertificateUrl], 
           function(error) {
        if (error) {
            return res.status(500).json({ error: 'Error adding certificate' });
        } else {
            return res.status(200).json({ message: 'Certificate added successfully' });
        }
    });
});


app.put('/api/:employeeId/certs/editCert', (req, res) => {
    res.send("")
});


app.delete('api/:employeeId/certs/deleteCert', (req, res) =>{
    res.send("")
})

app.get('api/:employeeId/certs/searchCert ', (req, res) =>{
    res.send("")
})

app.listen(Port, () =>{
    console.log(`Server is running on port ${Port}`);
})