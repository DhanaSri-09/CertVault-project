import { databaseConnection } from "./dbConnection.js";
import randomToken from "random-token";
import md5 from "md5";

const db = await databaseConnection();

export async function getAllCertificates(pEmployeeId, pSortby, pSortOrder) {
    let response;
    try {
        const certificates = await db.all(
            `SELECT * FROM Certificate WHERE EmployeeId = ? ORDER BY ${pSortby} ${pSortOrder};`,
            [pEmployeeId]
        );
        response = { responseCode: 200, data: { certificates: certificates } };
    } catch (error) {
        response = { responseCode: 500, data: { Error: error.message } };
    }
    return response;
}

async function getCertificate(pEmployeeId, pCertificateId)
{
    const certificate = await db.get('Select * from Certificate where EmployeeId = ? and CertificateId = ?', [pEmployeeId, pCertificateId]);
    return certificate;
}

export async function insertCertificate(pEmployeeId, pCertificate)
{
    let response;
    try{
        let result = await db.run(
            'Insert into Certificate (EmployeeId, CertificateId, CertificateName, IssuingOrganization, IssueDate, ExpireDate, CertificateUrl) values (?, ?, ?, ?, ?, ?, ?)',
            [pEmployeeId, pCertificate.certificateId, pCertificate.certificateName, pCertificate.issuingOrganization, pCertificate.issueDate, pCertificate.expireDate, pCertificate.certificateUrl]
        );
        if(result.changes == 1)
        {
            const insertedCertificate= await getCertificate(pEmployeeId, pCertificate.certificateId);
            response = ({ responseCode: 200, data: { certificate: insertedCertificate } });
        }
    }
    catch (error)
    {
        response = ({ responseCode: 500, data: { Error: error} });
    }
    return response;
}

export async function updateCertificate(pEmployeeId, pCertificateId, pCertificate)
{
    let response;
    try{
        let result = await db.run(
            `Update Certificate 
            set CertificateName = ?, IssuingOrganization = ?, IssueDate = ?, ExpireDate = ?, CertificateUrl = ? 
            where EmployeeId = ? and CertificateId = ?`,
            [pCertificate.certificateName, pCertificate.issuingOrganization, pCertificate.issueDate, pCertificate.expireDate, pCertificate.certificateUrl, pEmployeeId, pCertificateId]
        );
        if(result.changes == 1)
        {
            const updatedCertificate = await getCertificate(pEmployeeId, pCertificateId);
            response = ({ responseCode: 200, data: {certificate: updatedCertificate,  message: "Certificate updated successfully"} });
        }
        else{
            response = ({ responseCode: 404, data: {Error: 'Certificate not found'} });
        }
    }
    catch (error)
    {
        response = ({ responseCode: 500, data: { Error: error} });
    }
    return response;
}

export async function deleteCertificate(pEmployeeId, pCertificateId) {
    let response;
    try {
        let result = await db.run('DELETE FROM Certificate WHERE EmployeeId = ? AND CertificateId = ?', [pEmployeeId, pCertificateId]);
        if (result.changes == 1) { 
            response = { responseCode: 200, data: { message: "Certificate deleted successfully" } };
        } else {
            response = { responseCode: 404, data: { Error: 'Certificate not found' } };
        }
    } catch (error) {
        response = { responseCode: 500, data: { Error: error } };
    }
    return response;
}

export async function validateLogin(pUserName, pPassword) {
    try {
        const hashPassword = md5(pPassword); 
        const token = await generateRandomToken(15);
        const result = await db.get(
            `SELECT EmployeeId FROM Employee WHERE Name = ? AND Password = ?`,
            [pUserName, hashPassword]
        );
        if (employeeId.length === 0) {
            return { responseCode: 401, data: { Message: "Incorrect username or password" } };
        } else {
            const token = await generateRandomToken(15);
            let updateToken = await updateEmployee(result.EmployeeId, token);
            return { responseCode: 200, data: { "Token": token  }} ;
        }
    } catch (error) {
        return { responseCode: 500, data: { Error: error.message } };
    }
}


export async function generateRandomToken(length) 
{
    return randomToken(length);
}


async function updateEmployee(pEmployeeId, pToken)
{
    try
    {
        let result = await db.run(`Update Employee SET Token=? WHERE EmployeeId=?;`, [pToken, pEmployeeId]);
        return result.changes;
    }
    catch(error)
    {
        return -1;
    }
}

export async function validateToken(pToken)
{
    try{
        let result = await db.get(`select EmployeeId from Employee where Token=?`, [pToken]);
        return result.EmployeeId;
    }
    catch(error)
    {
        return -1;
    }
}
