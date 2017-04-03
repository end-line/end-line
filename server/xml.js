"use strict";

const tagPattern = /^[<]([a-zA-Z]{1,20}\/?|[a-zA-Z]{1,20}\s([a-zA-Z]{1,20}\/?|[a-zA-Z]{1,10}[:]?[a-zA-Z]{1,10}\/?)[=]["].{1,2000}["]\/?)[>]$/;

exports.validate = function (orig, xml, cb) {
  if(orig.length < xml.length) {
    for (let i=0;i<xml.length;i++) {
      if (xml[i] === "<") {
        let nextIndex = 0;
        let startTag = xml[i];
        for (let j=i+1;j<xml.length;j++) {
          if (xml[j] === ">") {
            startTag += xml[j];
            nextIndex = j+1;
            break;
          }
          startTag += xml[j];
        }
        if (!tagPattern.test(startTag)) { return cb(false, "Failed to match TEI pattern for " + startTag); }
        let longForm = startTag.indexOf(" ");
        let endTag = longForm > -1 ? "</" + startTag.substring(1, longForm) + ">" : startTag.replace("<","</");
        if(startTag[startTag.length-2] !== '/') {
          if (xml.substring(nextIndex).indexOf(endTag) > -1) {
            xml = xml.replace(startTag, "").replace(endTag, "");
            i--;
          }
          else {
            return cb(false, "Failed to find end tag for " + startTag);
          }
        }
      }
    }
    return cb(true, "Valid TEI XML");
  }
  return cb(false, "Encoding is smaller than original poem")
}
