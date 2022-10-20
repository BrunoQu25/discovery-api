const { jsonExtractor } = require("../../helpers/jsonExtractor");
const { addDocument, checkUploadStatus } = require("../../helpers/discovery");
const fs = require("fs");

let getQuery = async (req, res) => {
  res.send(await jsonExtractor());
};

let uploadDocument = async (req, res) => {
  let documents_id = [];
  let docsQnt = req.files.length;
  for (let [index, file] of req.files.entries()) {
    let document_id = await addDocument(file.filename);
    documents_id.push(document_id);
    await checkUploadStatus(document_id, index, docsQnt);
  }
  console.log("Done!");

  res.send(documents_id);
};

let uploadBinary = async (req, res) => {
  let buffer = Buffer.alloc(0);
  let filename = process.env["filename"];
  req.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, Buffer.from(chunk)]);
    fs.writeFileSync(__dirname + "/../../uploads/" + filename, buffer);
  });
  let document_id = await addDocument(filename);
  await checkUploadStatus(document_id, 0, 1);
  console.log("Done!");
  res.send(`${filename} sent!`);
};

let saveFilename = (req, res) => {
  let random = (Math.random() + 1).toString(36).substring(7);
  process.env["filename"] = req.body.filename + "-" + random + ".pdf";
  console.log(process.env["filename"]);
  res.send(process.env["filename"]);
};

module.exports = {
  getQuery,
  uploadDocument,
  uploadBinary,
  saveFilename,
};
