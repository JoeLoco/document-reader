'use strict';
const DataReader = require('./data-reader');

module.exports = class CnhReader extends DataReader{
    
    read() {
        return {
            number: this.findNumber(this.data.horizontalData),
            name: this.findName(this.data.horizontalData),
            birthDate: this.findBirthDate(this.data.horizontalData),
            issueDate: this.findIssueDate(this.data.horizontalData),
            activationDate: this.findActivationDate(this.data.horizontalData),
            expireDate: this.findExpireDate(this.data.horizontalData),
            category: this.findCategory(this.data.horizontalData),
            cpf: this.findCpf(this.data.horizontalData),
            verificationNumber: this.findVerificationNumber(this.data.verticalData)
        }
    }

    findName(data){
    
        var result = false;
    
        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "LINE") {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Top > 0.2) {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Left > 0.3) {
                return;
            }
            
            result = entry.group?this.joinTextByGroup(data,entry.group):entry.DetectedText;
    
        });
    
        return result;
    };
    
    findBirthDate(data){
        
        var result = false;
    
        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Top > 0.3) {
                return;
            }
    
            if(!entry.DetectedText.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
                return;
            }
    
            result = entry.DetectedText;
    
        });
    
        return result;
    };
    
    findIssueDate(data){
        
        var result = false;
    
        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Top < 0.70) {
                return;
            }
    
            if(!entry.DetectedText.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
                return;
            }
    
            result = entry.DetectedText;
        });
    
        return result;
    };
    
    findActivationDate(data){
        
        var result = false;
    
        data.TextDetections.forEach((entry) =>{
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(!entry.DetectedText.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
                return;
            }
    
            if(!this.between(entry.Geometry.BoundingBox.Top, 0.3 , 0.7)) {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Left < 0.55) {
                return;
            }
        
            result = entry.DetectedText;
    
        });
    
        return result;
    };
    
    findExpireDate(data){
        
        var result = false;
    
        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(!entry.DetectedText.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
                return;
            }
    
            if(!this.between(entry.Geometry.BoundingBox.Top, 0.3 , 0.70)) {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Left > 0.55) {
                return;
            }
    
            result = entry.DetectedText;
    
        });
    
        return result;
    };
    
    findNumber(data){
        
        var result = false;
    
        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(!entry.DetectedText.match(/^(\d{11})$/)) {
                return;
            }
    
            if(entry.Geometry.BoundingBox.Left > 0.3) {
                return;
            }
    
            result = entry.DetectedText;
    
        });
    
        return result;
    };

    findCategory(data){
        
        var result = false;

        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(!entry.DetectedText.match(/^([A-E]{1,2})$/)) {
                return;
            }

            if(!this.between(entry.Geometry.BoundingBox.Top, 0.3 , 0.5)) {
                return;
            }

            if(entry.Geometry.BoundingBox.Left < 0.7) {
                return;
            }
    
            result = entry.DetectedText;
    
        });

        return result;

    }

    findCpf(data){
        
        var result = false;

        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(!entry.DetectedText.match(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-?[0-9]{2}$/)) {
                return;
            }

            if(entry.Geometry.BoundingBox.Top > 0.3) {
                return;
            }
    
            result = entry.DetectedText;
    
        });        
    
        return result;
    };

    findVerificationNumber(data){
        
        var result = false;

        data.TextDetections.forEach((entry) => {
            
            if(entry.Type != "WORD") {
                return;
            }
    
            if(!entry.DetectedText.match(/^(\d{9,11})$/)) {
                return;
            }

            if(entry.Geometry.BoundingBox.Top > 0.2) {
                return;
            }

            if(entry.Geometry.BoundingBox.Left > 0.2) {
                return;
            }
    
            result = entry.DetectedText;
    
        });        
    
        return result;
    };
}
