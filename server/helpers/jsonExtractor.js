const { queryDiscovery } = require("./queryDiscovery.js");

let jsonExtractor = async () => {
  let results = await queryDiscovery();
  let finalResult = {};
  let filename;
  let entities;
  let extractedTableText;
  let mainResult;

  for (let resultsIndex in results) {
    mainResult = results[resultsIndex];
    if ((mainResult.table && mainResult.enriched_text) != null) {
      filename = mainResult.extracted_metadata.filename;
      extractedTableText = mainResult.table.table_text;
      entities = mainResult.enriched_text[0].entities;
      finalResult[filename] = {
        extractedData: [],
        extractedTableText,
      };
      for (let entitiesIndex in entities) {
        finalResult[filename]["extractedData"].push({
          type: entities[entitiesIndex].type,
          text: entities[entitiesIndex].text,
        });
      }
    } else {
      if (mainResult.enriched_text == null) {
        filename = mainResult.extracted_metadata.filename;
        finalResult[filename] = {
          extractedData: "Data not found",
          extractedTableText: "Table text not found",
        };
      } else {
        filename = mainResult.extracted_metadata.filename;
        entities = mainResult.enriched_text[0].entities;
        finalResult[filename] = {
          extractedData: [],
          extractedTableText: "Table text not found",
        };
      }
    }
  }
  console.log("Json Extractor Done!");
  return finalResult;
};

module.exports = {
  jsonExtractor,
};
