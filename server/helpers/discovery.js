const fs = require("fs");
const credentials = require("../common/config/discovery-credentials.json");
const DiscoveryV2 = require("ibm-watson/discovery/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const { sleep } = require("./helpers");

const discovery = new DiscoveryV2({
  version: credentials.version,
  authenticator: new IamAuthenticator({
    apikey: credentials.apikey,
  }),
  serviceUrl: credentials.serviceUrl,
});

const params = {
  projectId: credentials.projectId,
  count: 100,
  tableResults: {
    enabled: true,
  },
};

async function queryDiscovery() {
  return new Promise(async (resolve, reject) => {
    try {
      let collections = await queryCollection();
      params["collectionIds"] = collections;
      discovery.query(params).then((response) => {
        let result = response.result.results;
        resolve(result);
      });
    } catch (error) {
      console.log("error:", error);
      return reject(error);
    }
  });
}

async function queryDocuments() {
  return new Promise(async (resolve, reject) => {
    try {
      let documents = await queryDiscovery();
      let documents_id = [];
      for (let document of documents) {
        documents_id.push(document.document_id);
      }
      resolve(documents_id);
    } catch (error) {
      console.log("error:", error);
      return reject(error);
    }
  });
}

async function queryCollection() {
  return new Promise((resolve, reject) => {
    try {
      discovery.listCollections(params).then((response) => {
        let results = [];
        for (let collection of response.result.collections) {
          if (credentials.collectionName.includes(collection.name)) {
            results.push(collection.collection_id);
          }
        }
        resolve(results);
      });
    } catch (error) {
      console.log("error:", error);
      return reject(error);
    }
  });
}

async function addDocument(filename) {
  const params = {
    projectId: credentials.projectId,
    collectionId: await queryCollection(),
    file: fs.createReadStream(__dirname + "/../uploads/" + filename),
    filename: filename,
    fileContentType: "application/pdf",
  };
  return new Promise((resolve, reject) => {
    try {
      discovery.addDocument(params).then((response) => {
        console.log(4, response.result);
        result = response.result;
        resolve(result.document_id);
      });
    } catch (error) {
      console.log("error:", error);
      return reject(error);
    }
  });
}

async function checkUploadStatus(document_id, index, docsQnt) {
  let discovery_documents_id = await queryDocuments();
  console.log(90, discovery_documents_id);
  while (!discovery_documents_id.includes(document_id)) {
    console.log(
      "Processing - " +
        document_id +
        ". File nº " +
        (index + 1) +
        " of " +
        docsQnt
    );
    discovery_documents_id = await queryDocuments();
    await sleep(10000);
  }
}

module.exports = {
  queryDiscovery,
  queryDocuments,
  queryCollection,
  addDocument,
  checkUploadStatus,
};
