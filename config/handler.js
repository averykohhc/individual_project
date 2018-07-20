var separateFive = false;
var separateTwoContinue = false;
var separateTwoConsent = false;
var feelings;


module.exports.show =  function (res) {
  console.log(res);
}

module.exports.logClientInput = function (res) {
  if(res.result.metadata.intentName == "feelings") {
    feelings = res.result.resolvedQuery;
    console.log("feelings is logged as " + feelings);
  }

  if(res.result.metadata.intentName == "separate5-yes") {
    separateFive = true;
    console.log("separateFive is " + separateFive);
  }

  if(res.result.metadata.intentName == "separate2-yes-continuous") {
    separateTwoContinue = true;
    console.log("separateTwoContinue is " + separateTwoContinue);
  }

  if(res.result.metadata.intentName == "separate2-yes-continuous-consent") {
    separateTwoConsent = true;
    console.log("separateTwoConsent is " + separateTwoConsent);
  }

}
