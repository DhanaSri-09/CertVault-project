import express from 'express';
import cors from "cors";

import { getAllCertificates, insertCertificate, updateCertificate, deleteCertificate, validateLogin, validateToken, employeeRegister} from './db.js';

const app = express();
const Port = 3000;
app.use(express.json());
app.use(cors());


app.post('/api/login', async function(req, res) {
    
        const userName = req.body.userName;
        const password = req.body.password;
    try{
        const response = await validateLogin(userName, password);
        console.log(response);
        res.status(response.responseCode).send(response.data);
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid credentials!' });
    }
});

app.post('/api/signup', async function (req, res) {
    let emp = req.body;
    console.log(emp);
    let responseData = await employeeRegister(emp);
    res.status(responseData.ResponseCode).send(responseData.Data);
});

app.use(async function(req, res, next){
    let token = req.headers.token;
    let result = await validateToken(token);
    if (!result)
    {
        res.status(401).send({ error: "unauthorized" });
    }
    req.employeeId = result;
    next();
});



app.get('/api/certs', async function (req, res) {
    try {
        const employeeId = req.employeeId;
        const sortBy = req.query.sortBy || 'CertificateId'; 
        const sortOrder = req.query.sortOrder || 'ASC';
        const response = await getAllCertificates(employeeId, sortBy, sortOrder);
        res.status(response.responseCode).send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



app.post('/api/certs', async function(req, res) {
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
    

app.put('/api/certs/:certificateId', async function(req, res) {
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


app.delete('/api/certs/:certificateId', async function(req, res) {
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
