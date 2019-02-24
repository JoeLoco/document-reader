const AWS = require('aws-sdk');
const sharp = require('sharp');
const CnhReader = require('./lib/data-readers/cnh-reader');
const S3FileDownloader = require('./lib/helpers/s3-file-downloader');


module.exports = class DocumentReader {

    async read(documentType,S3Bucket,S3BubketKey){

        const downloader = new S3FileDownloader();
        const horizontalBuffer = await downloader.download(S3Bucket,S3BubketKey);
        const verticalBuffer = await this.rotate90dg(horizontalBuffer);
    
        const data = {
            horizontalData: await this.detectText(horizontalBuffer),
            verticalData: await this.detectText(verticalBuffer)
        }

        console.log(JSON.stringify(data.horizontalData))

        const chnReader = this.createReaderByDocumentType(documentType,data);
        return chnReader.read();    

    }

    createReaderByDocumentType(documentType, data){
        
        if(documentType=="cnh") {
            return new CnhReader(data);
        }
    }

    async rotate90dg (buffer) {
        return await sharp(buffer).rotate(90).toBuffer();
    }

    async detectText (buffer) {
        
        const rekognition = new AWS.Rekognition({
            region: 'us-east-1'
        });

        const params = {
            Image: {
                Bytes: buffer
            }
        };

        return new Promise((resolve,reject) => {
            rekognition.detectText(params, (err, data) => {
                
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
    
}
