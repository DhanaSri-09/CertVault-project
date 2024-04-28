import express from 'express';
import { getAllCertificates, insertCertificate, updateCertificate, deleteCertificate } from './db.js';

const app = express();
const Port = 3000;
app.use(express.json());

app.get('/api/:employeeId/certs', async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const sortBy = req.query.sortBy || 'certificateId'; 
        const sortOrder = req.query.sortOrder || 'ASC';
        const response = await getAllCertificates(employeeId, sortBy, sortOrder);
        res.status(response.responseCode).send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



app.post('/api/:employeeId/certs', async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const certificateData = req.body;
        const response = await insertCertificate(employeeId, certificateData);
        res.status(response.responseCode).send(response.data);
    }
    catch (error) 
    {
        res.status(500).send({ error: error.message });
    }
});
    

app.put('/api/:employeeId/certs/:certificateId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const certificateId = req.params.certificateId;
        const certificateData = req.body;
        const response = await updateCertificate(employeeId, certificateId, certificateData);
        res.status(response.responseCode).send(response.data);
    } 
    catch (error) 
    {
        res.status(500).send({ error: error.message });
    }
});


app.delete('/api/:employeeId/certs/:certificateId', async (req, res) => {
    try 
    {
        const employeeId = req.params.employeeId;
        const certificateId = req.params.certificateId;
        const response = await deleteCertificate(employeeId, certificateId);
        res.status(response.responseCode).send(response.data);
    } 
    catch (error) 
    {
        res.status(500).send({ error: error.message });
    }
});


app.listen(Port, () =>{
    console.log(`Server is running on port ${Port}`);
});
