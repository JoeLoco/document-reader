'use strict';

module.exports = class DataReader {
    constructor(data) {
       this.data = data;
       this.data.horizontalData.TextDetections = this.groupTextDetectionsByBoundingBoxTop(this.data.horizontalData.TextDetections);
    }
    
    groupTextDetectionsByBoundingBoxTop(entries) {

        for(var idx in entries)
        {
            if(entries[idx].Type != "LINE") {
                continue;
            }

            if((idx - 1) < 0) {
                continue;
            }

            var thisTop = entries[idx].Geometry.BoundingBox.Top;
            var previousTop = entries[idx-1].Geometry.BoundingBox.Top;
            
            if(Math.floor(thisTop * 100) == Math.floor(previousTop * 100)) {
                var group = this.createGroupId();
                entries[idx].group = group;
                entries[idx-1].group = group;  
            }
        }
        return entries;
    }

    createGroupId(){
       return Math.random().toString(36).substr(2, 9);    
    }

    joinTextByGroup(data, group) {
        var texts = [];
        data.TextDetections.forEach((entry) => {   
            if(entry.group && entry.group == group) {
                texts.push(entry.DetectedText); 
            }
        });
        return texts.join(' ');  
    }

    between(value, min, max) {
        return value >= min && value <= max;
    }
}
