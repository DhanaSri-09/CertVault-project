const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const Port = 3000;
app.use(cors());
let db;

(async () => {
    db = await sqlite.open({
        filename: 'D:/Training/Project/CertVault.db',
        driver: sqlite3.Database
    });
})();

app.get('/api/:employeeId/certs', async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const rows = await db.all('SELECT * FROM Certificate WHERE EmployeeId = ? ', [employeeId]);
        res.json(rows);
    } 
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/:employeeId/certs/:certificateId', async (req, res) => {
    const employeeId = req.params.employeeId;
    const certificateId = req.params.certificateId;
    const { certificateName, issuingOrganization, issueDate, expireDate, certificateUrl } = req.query;
    try {
        await db.run(
            'Insert into Certificate (EmployeeId, CertificateId, CertificateName, IssuingOrganization, IssueDate, ExpireDate, CertificateUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [employeeId, certificateId, certificateName, issuingOrganization, issueDate, expireDate, certificateUrl]
        );
        res.status(200).json({ message: 'Certificate added successfully' });
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error adding certificate' });
    }
});

const getCertificate = async (employeeId, certificateId) => {
        const certificate = await db.get('SELECT * FROM Certificate WHERE EmployeeId = ? AND CertificateId = ?', [employeeId, certificateId]);
        return certificate;
};


app.put('/api/:employeeId/certs/:certificateId', async (req, res) => {
    const employeeId = req.params.employeeId;
    const certificateId = req.params.certificateId;
    const { certificateName, issuingOrganization, issueDate, expireDate, certificateUrl } = req.query;
    try {
        const certificate = await getCertificate(employeeId, certificateId);
        if (!certificate) 
        {
            return res.status(404).json({ error: 'Certificate not found' });
        }
        await db.run(
            `Update Certificate 
            set CertificateName = ?, IssuingOrganization = ?, IssueDate = ?, ExpireDate = ?, CertificateUrl = ? 
            where EmployeeId = ? AND CertificateId = ?`,
            [certificateName, issuingOrganization, issueDate, expireDate, certificateUrl, employeeId, certificateId]
        );
        res.status(200).json({ message: 'Certificate updated successfully' });
    } 
    catch (error)
    {
        res.status(500).json({ error: 'Error updating certificate' });
    }
});


app.delete('/api/:employeeId/certs/:certificateId', async (req, res) => {
    const employeeId = req.params.employeeId;
    const certificateId = req.params.certificateId;
    try 
    {
        const certificate = await getCertificate(employeeId, certificateId);
        if (!certificate) 
        {
            return res.status(404).json({ error: 'Certificate not found' });
        }
        await db.run('Delete from Certificate where EmployeeId = ? AND CertificateId = ?', [employeeId, certificateId]);
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error deleting certificate' });
    }
});


app.get('api/:employeeId/certs/searchCert/:certificateID ', (req, res) =>{
    const employeeId = req.params.employeeId;
    const certificateId = req.params.certificateId;
    try 
    {
        const certificate = await getCertificate(employeeId, certificateId);
        if (!certificate) 
        {
            return res.status(404).json({ error: 'Certificate not found' });
        }
        res.status(200).json({certificate});
})

app.listen(Port, () =>{
    console.log(`Server is running on port ${Port}`);
})
