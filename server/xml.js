"use strict";

const tagPattern = /^[<]([a-zA-Z]{1,20}|[a-zA-Z]{1,20}\s([a-zA-Z]{1,20}|[a-zA-Z]{1,10}[:]?[a-zA-Z]{1,10})[=]["].{1,2000}["])[>]$/;

exports.validate = function (str, callback) {

  for (let i=0;i<str.length;i++) {
    if (str[i] === "<") {
      let nextIndex = 0;
      let startTag = str[i];
      for (let j=i+1;j<str.length;j++) {
        if (str[j] === ">") {
          startTag += str[j];
          nextIndex = j+1;
          break;
        }
        startTag += str[j];
      }
      if (!tagPattern.test(startTag)) { return callback(false, "Failed to match TEI pattern for " + startTag); }
      let longForm = startTag.indexOf(" ");
      let endTag = longForm > -1 ? "</" + startTag.substring(1, longForm) + ">" : startTag.replace("<","</");
      if (str.substring(nextIndex).indexOf(endTag) > -1) {
        str = str.replace(startTag, "").replace(endTag, "");
        i--;
      }
      else {
        return callback(false, "Failed to find end tag for " + startTag);
      }
    }
  }

  return callback(true, "Valid TEI XML");

}
