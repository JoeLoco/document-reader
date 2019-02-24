# Document Reader

Document reader is a lambda that use aws rekognition to read
documents and return parsed/expected information from any document.

### How it works

1. Lambda receive **document_type** and **s3** file location
2. DocumentReader **download** s3 file
3. DocumentReader **rotate image** to make a vertical version o file
4. DocumentReader invoke **AWS Rekognition** to recognize vertical and horizontal buffer.
5. DocumentReadar invoke **DataReader** using passed **document_type**
6. DataReader try to get values from recognized data.

### Requirements

1. Node JS
2. AWS CLI
3. AWS Account

### How to Install

1. Install serverless framework
   
```sh 
sudo npm install -g serverless
```

2. Install dependencies

```sh 
sudo npm install
```

3. Export your aws profile to env

```sh 
export AWS_PROFILE=default
```

4. Run a local test

```sh 
serverless invoke local --function read -p sample-payload.json
```

### Implemented documents

* CNH

### Development Bucket

Put sample documents on **doc-reader** bucket

### Lambda return example

```json
{
    "statusCode": 200,
    "body": {
        "data":{
            "number":false,
            "name":"AROLDO MEDINA",     
            "birthDate":"31/03/1964",
            "issueDate":"14/02/2007",
            "activationDate":"01/03/1983",
            "expireDate":"12/01/2012",
            "category":"AB",
            "cpf":false,
            "verificationNumber":"861649874"
        }
    }
}
```

### To-do

1. Create data reader for RG document
2. Create data reader for CPF document


```
Created By:
       __              __                   
      / /___  ___     / /   ____  _________ 
 __  / / __ \/ _ \   / /   / __ \/ ___/ __ \
/ /_/ / /_/ /  __/  / /___/ /_/ / /__/ /_/ /
\____/\____/\___/  /_____/\____/\___/\____/                                          
```
