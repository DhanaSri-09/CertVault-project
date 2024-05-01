import express from 'express';
import cors from "cors";

import { getAllCertificates, insertCertificate, updateCertificate, deleteCertificate, validateLogin, validateToken } from './db.js';

const app = express();
const Port = 3000;
app.use(express.json());
app.use(cors());


app.post('/api/login', async(req, res) =>{
    
        const userName = req.body.userName;
        const password = req.body.password;
    try{
        const response = await validateLogin(userName, password);
        res.status(response.responseCode).send(response.data);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.use(async function(req, res, next){
    let token = req.headers.token;
    let result = await validateToken(token);
    if (result)
    {
        req.employeeId = result;
    }
    next();
});



app.get('/api/certs', async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const sortBy = req.query.sortBy || 'certificateId'; 
        const sortOrder = req.query.sortOrder || 'ASC';
        const response = await getAllCertificates(employeeId, sortBy, sortOrder);
        res.status(response.responseCode).send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



app.post('/api/certs', async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const certificateData = req.body;
        const response = await insertCertificate(employeeId, certificateData);
        res.status(response.responseCode).send(response.data);
    }
    catch (error) 
    {
        res.status(500).send({ error: error.message });
    }
});
    

app.put('/api/certs/:certificateId', async (req, res) => {
    try {
        const employeeId = req.employeeId;
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


app.delete('/api/certs/:certificateId', async (req, res) => {
    try 
    {
        const employeeId = req.employeeId;
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
