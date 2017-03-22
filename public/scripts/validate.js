var str = "<yes id='yeah'>ff<yes>fgfM</yes>gf</yes> /n <sysy>d<dd><ff>jd</ff><hhh></sysy></dd></hhh>jdjd".replace(/\/n/g, "");
var regex = /<[a-zA-Z]{1,}\s[a-zA-Z]{1,}=['|"][a-zA-Z]{1,}['|"]>/

function validateXML(str) {

  for (var i=0;i<str.length;i++) {
    console.log(str)
    console.log(str[i])
    if (str[i] === "<") {
      var start = 0;
      var basicTag = null;
      var tag = [str[i]];
      for (var j=i+1;j<str.length;j++) {
        if(str[j] === ">") {
          tag.push(str[j]);
          start = j+1;
          break;
        }
        else if(str[j] === " ") {
          basicTag = tag.slice(0);
        }
        else if(isLetter(str[j]) === false && str[j] !== " " && str[j] !== "=" && str[j] !== "'") {
          console.log("char false")
          return false;
        }
        tag.push(str[j]);
        console.log(tag)
      }
      var startTag;
      var startTagComplete;
      if(basicTag !== null) { basicTag.push(">"); }
      if(JSON.stringify(tag) !== JSON.stringify(basicTag) && basicTag !== null) {
        startTag = basicTag.join("");
        startTagComplete = tag.join("");
        if(regex.test(startTagComplete) === false) {
          console.log("failed regex")
          return false;
        }
      }
      else {
        startTag = tag.join("");
        startTagComplete = tag.join("");
      }
      var endTag = startTag.replace("<","</");
      console.log("2 " + startTag)
      console.log("3 "+ endTag)
      if (checkClose(endTag, str.substring(start)) === true) {
        console.log("4 " + str)
        str = str.replace(startTagComplete, "").replace(endTag, "");
        console.log("5 " + str)
        i--;
      }
      else {
        console.log("failed end tag")
        return false;
      }
    }
  }

  return true;

}

function checkClose(tag, str) {
  return str.indexOf(tag) > -1;
}

function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

var valid = validateXML(str);

console.log(valid);
