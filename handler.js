'use strict';

const DocumentReader = require('./document-reader');

module.exports.read = async (event, context, callback) => {
  
  const q = event.queryStringParameters;
  const documentReader = new DocumentReader();
  const data  = await documentReader.read(q.document_type,q.s3_bucket,q.s3_bucket_key);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    }),
  };

  callback(null, response);

};