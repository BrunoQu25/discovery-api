## About

This asset can query a project in IBM Watson Discovery and extract previous trained data and tables from the files sended.

## Architecture

![Architecture](https://portal-de-demos-imgs.s3.us-south.cloud-object-storage.appdomain.cloud/discovery-api-diagram-local1.png)

The user makes a get request to the API that will query the files that are already in the IBM Discovery.
Then it will return the extracted data from the files, the Entities definied by the IBM Watson Knowledge Studio and the Table Text.

## IBM Cloud Use Cases

![IBMCloud](https://portal-de-demos-imgs.s3.us-south.cloud-object-storage.appdomain.cloud/discovery-api-diagram-local2.png)

- [IBM Watson Knowledge Studio(WKS)](https://www.ibm.com/cloud/watson-knowledge-studio) Group:

  - The user will send **_.txt_** or **_.pdf_** files to train the WKS Instance.
  - First you have to create the Entities that you want to extract, then after training the Machine Learning Model you can save it and export as a **_.zip_** file to use in the IBM Discovery instance to return the Entities from the files you want to query.
  - The documentation and detailed informations about how to create entities, train the machine learning model and export the **_.zip_** file you can see in this [link](https://cloud.ibm.com/docs/watson-knowledge-studio?topic=watson-knowledge-studio-wks_tutintro).

- [IBM Discovery](https://www.ibm.com/cloud/watson-discovery) Group:

  - The user will send the **_.txt_** or **_.pdf_** files batch he wants to extract data from to the Discovery Instance.
  - With the **_.zip_** file from the WKS instance the user will put it as the Machine Learning Model in Discovery, after that the user can return the Entities trained when a file is sended to Discovery.
  - Then using the [Smart Document Understanding(SDU)](https://cloud.ibm.com/docs/discovery?topic=discovery-sdu) built in Discovery the user can configure the tables he wants to extract.
  - After that the user will pass the Discovery Credentials to the API code and start his application.
  - The documentation and detailed informations about Discovery you can see in this [link](https://cloud.ibm.com/docs/discovery?topic=discovery-about) and about it's API in this [link](https://cloud.ibm.com/apidocs/discovery-data?code=node).

## Requirements

- [NodeJS](https://nodejs.org/) installed.
- [IBM Watson Discovery](https://www.ibm.com/cloud/watson-discovery) and [IBM Knowledge Studio](https://www.ibm.com/br-pt/cloud/watson-knowledge-studio) credentials from the Discovery and model **_.zip_** file from Knowledge Studio (WKS).

## Components

This asset has two components:

## 1. Discovery with WKS instances

- Instances in IBM Cloud that make the bridge between each other to achive the correct data to be extracted.

## 2. NodeJS server

- Server that make the query request to Discovery and extract only the data needed from it's JSON.

## How to deploy

Deploying this asset can be done by following the guide below:

- You must have the credentials of your Discovery instance ready and save it in a **_discovery-credentials.json_** file, the example file is in the **_server/common/config path_**, there you can put your own file following the **_discovery-credentials-example.json_** as a example or the example below:

```json
{
  "version": "<DiscoveryVersionDate>",
  "apikey": "<DiscoveryApiKey>",
  "serviceUrl": "<DiscoveryUrlKey>",
  "projectId": "<DiscoveryProjectId>",
  "collectionName": ["<Name1>, <Name2>"]
}
```

Replace only what is between the `<...>`.

After that, you can follow the following steps:

- Install the module dependencies:

  ```
   npm i
  ```

- Run the application:

  ```
   npm start

   or

   npm run dev
  ```

  - After that, the interface will be available at: http://localhost:3000/

## API Guide

### getDiscovery

To run the application you must make a get request to the url http://localhost:3000/getDiscovery, then the result can return as this:
![Response](https://portal-de-demos-imgs.s3.us-south.cloud-object-storage.appdomain.cloud/discovery-query-response.png)

With each object resturning a result similar to this:

```json
"example.pdf": {
"extractedData": [
      {
        "type": "Type1",
        "text": "Type1Text"
      },
      {
        "type": "Type2",
        "text": "Type2Text"
      },
      {
        "type": "Type3",
        "text": "Type3Text"
      }
  ],
"extractedTableText": "TableTextExtracted"
}
```

### addDocument

You can upload a new file with a post request to the url http://localhost:3000/addDocument. You will have to use a `Multipart Form` and the key `file`.

When you select the document and send the request, you will recive the id of the document when the upload finishes.

![addDocument request example](https://portal-de-demos-imgs.s3.us-south.cloud-object-storage.appdomain.cloud/api-discovery-addDocument.png)

### saveFilename

You can also send a Binary file. Before you send a request to add a binary, you have to send a post request to the url http://localhost:3000/saveFilename. The boby of the request has this json template:

```json
{
  "filename": "my_file.pdf"
}
```

![saveFilename request example](https://portal-de-demos-imgs.s3.us-south.cloud-object-storage.appdomain.cloud/api-discovery-saveFilename.png)

The response is the random named used to save in Discovery.

### addBinary

You can also send a file through a post request to the url http://localhost:3000/addBinary, but using a `Binary File`, instead of Multipart Form.

Just select the document and send the resquest. You will recive a response saying that your file was sent.

![addBinary request example](https://portal-de-demos-imgs.s3.us-south.cloud-object-storage.appdomain.cloud/api-discovery-addBinary.png)
