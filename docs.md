## List Certs:

```code
Method: GET
Endpoint: /api/:employeeId/certs
Query Params: ?sort=(desc/asc)
Payload: None
Response JSON:
    [{
        "certificateId": "certificate ID",
        "certificateName": "certificate name",
        "issuingOrganization": "organisation name",
        "issueDate": "issue date",
        "expireDate": "expire date",
        "certificateUrl": "certificate URL"
    }, {...},...]
Response Code: 200(OK)/404(Not Found)
```

## Add Certs:

```code
Method: POST
Endpoint: /api/:employeeId/certs
Query Params: ?certificateId=certificate ID&certificateName=certificate name&issuingOrganization=organisation name&issueDate=issue date&expireDate=expire date&certificateUrl=certificate URL
Payload: None
Response JSON:
    {
        "response code": "message based on response code"
    }
Response Code: 200(OK)/404(Not Found)
```

## Edit Certs:

```code
Method: PUT
Endpoint: /api/:employeeId/certs
Query Params: ?certificateId=certificate ID(3944)
Payload: 
    Request Payload:
    { 
        "certificateId": "certificate ID", 
        "certificateName": "certificate name", 
        "issuingOrganization": "organisation name", 
        "issueDate": "issue date", 
        "expireDate": "expire date",
        "certificateUrl": "certificate URL"
    }      
Response JSON:
    {
        "response code": "message based on response code"
    }
Response Code: 200(OK)/404(Not Found)
```

## Delete Certs:

```code
Method: DELETE
Endpoint: /api/:employeeId/certs
Query Params: ?certificateId=certificate Id(8364)
Payload: None
Response JSON:
    {
        "response code": "message based on response code"
    }
Response Code: 200(OK)/404(Not Found)
```

## Search Certs:

```code
Method: GET
Endpoint: /api/:employeeId/certs
Query Params: ?certificateId=certificate ID(7383)
Payload: None
Response JSON:
    {
        "certificateId": "certificate ID",
        "certificateName": "certificate name",
        "issuingOrganization": "organisation name",
        "issueDate": "issue date",
        "expireDate": "expire date",
        "certificateUrl": "certificate URL"
    }
Response Code: 200(OK)/404(Not Found)
```
