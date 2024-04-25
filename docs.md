## List Certs:

```
Method: GET
Endpoint: /api/:employeeId/certs
Query Params: ?sort=(desc/asc)
Payload: None
Response JSON:
    [{
        "certificateId": certificateID,
        "certificateName": certificateName,
        "issuingOrganization": organisationName,
        "issueDate": issueDate,
        "expireDate": expireDate,
        "certificateUrl": certificateURL
    }, {...},...]
Response Code: 200(OK)/404(Not Found)
```

## Add Certs:

```
Method: POST
Endpoint: /api/:employeeId/certs/addCert
Query Params: ?certificateId=certificate ID&certificateName=certificate name&issuingOrganization=organisation name&issueDate=issue date&expireDate=expire date&certificateUrl=certificate URL
Payload: None
Response JSON:
    {
        "responseMessage": message
    }
Response Code: 200(OK)/404(Not Found)
```

## Edit Certs:

```
Method: PUT
Endpoint: /api/:employeeId/certs/editCert
Query Params: ?certificateId=certificate ID(3944)
Payload: 
    Request Payload:
    {  
        "certificateName": certificateName, 
        "issuingOrganization": organisationName, 
        "issueDate": issueDate, 
        "expireDate": expireDate,
        "certificateUrl": certificateURL
    }      
Response JSON:
    {
        "responseMessage": message
    }
Response Code: 200(OK)/404(Not Found)
```

## Delete Certs:

```
Method: DELETE
Endpoint: /api/:employeeId/certs/deleteCert
Query Params: ?certificateId=certificate Id(8364)
Payload: None
Response JSON:
    {
        "responseMessage": message
    }
Response Code: 200(OK)/404(Not Found)
```

## Search Certs:

```
Method: GET
Endpoint: /api/:employeeId/certs/searchCert
Query Params: ?certificateId=certificate ID(7383)
Payload: None
Response JSON:
    {
        "certificateId": certificateId,
        "certificateName": certificateName,
        "issuingOrganization": organisationName,
        "issueDate": issueDate,
        "expireDate": expireDate,
        "certificateUrl": certificateURL
    }
Response Code: 200(OK)/404(Not Found)
```
