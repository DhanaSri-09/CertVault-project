import { databaseConnection } from "./dbConnection.js";

const db = await databaseConnection();

export async function getAllCertificates(pEmployeeId)
{
    let response;
    try{
        const certificates = await db.all('Select * from Certificate where EmployeeId = ? ', [pEmployeeId]);
        response = ({ responseCode: 200, data: { certificates: certificates } });
    }
    catch (error)
    {
        response = ({ responseCode: 500, data: { Error: error} });
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
