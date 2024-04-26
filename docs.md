## List Certs:

```
Method: GET
Endpoint: /api/:employeeId/certs/:certificateId
Query Params: ?sort=(desc/asc)
Payload:
    Request Payload: None
    Response Payload: It contaians array of certificate objects in JSON format.
Response JSON:
   sucessful- [{
        "certificateId": certificateID,
        "certificateName": certificateName,
        "issuingOrganization": organisationName,
        "issueDate": issueDate,
        "expireDate": expireDate,
        "certificateUrl": certificateURL
    }, {...},...]
    error- { "responseCode": "404", "responseMessage": "Request not found."}  
Response Code: 200(OK)/404(Not Found)
```

## Add Cert:

```
Method: POST
Endpoint: /api/:employeeId/certs
Query Params: 
Payload:
    Request Payload:
            {
            "certificateId": certificateID
            "certificateName": certificateName,
            "certificateDescription" : certificateDescription
            "issuingOrganization": organisationName, 
            "issueDate": issueDate, 
            "expireDate": expireDate,
            "certificateUrl": certificateURL
            }
    Response Payload: It contains response code and message confirming the status of the operation.
Response JSON:
   success- { "responseCode": "200", "responseMessage": "Certificate added sucessfully."}
    error- { "responseCode": "404", "responseMessage": "Request not found."}
Response Code: 201(OK)/404(Not Found)
```

## Edit Cert:

```
Method: PUT
Endpoint: /api/:employeeId/certs/:certificateId
Query Params:
Payload: 
    Request Payload:
        {  
            "certificateName": certificateName, 
            "issuingOrganization": organisationName, 
            "issueDate": issueDate, 
            "expireDate": expireDate,
            "certificateUrl": certificateURL
        }
    Response Payload: It contains response code and message confirming the status of the operation.
Response JSON: 
    success- { "responseCode": "200", "responseMessage": "Certificate updated sucessfully."}
    error- { "responseCode": "404", "responseMessage": "Request not found."}
Response Code: 200(OK)/404(Not Found)
```

## Delete Cert:

```
Method: DELETE
Endpoint: /api/:employeeId/certs/:certificateId
Query Params: 
Payload:
    Request Payload: None
    Response Payload: It contains response code and message confirming the status of the operation.
Response JSON:
   success- { "responseCode": "200", "responseMessage": "Certificate deleted sucessfully."}
    error- { "responseCode": "404", "responseMessage": "Request not found."}
Response Code: 200(OK)/404(Not Found)
```

## Search Cert:

```
Method: GET
Endpoint: /api/:employeeId/certs/searchCert/:certificateId
Query Params: 
Payload: None
Response JSON:
    success-  {
        "certificateId": certificateId,
        "certificateName": certificateName,
        "issuingOrganization": organisationName,
        "issueDate": issueDate,
        "expireDate": expireDate,
        "certificateUrl": certificateURL
    }
    error- { "responseCode": "404", "responseMessage": "Request not found."}  
Response Code: 200(OK)/404(Not Found)
```
