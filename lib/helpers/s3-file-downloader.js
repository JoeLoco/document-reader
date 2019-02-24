'use strict';
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

module.exports = class S3FileDownloader {

    download(bucket,key) {
        
        var getParams = {
            Bucket: bucket, 
            Key: key
        }

        return new Promise((resolve,reject)=>{
            S3.getObject(getParams, function(err, data) {
                if (err)
                {
                    reject(err);
                }
                resolve(data.Body);
            });    
        });
    }    

}