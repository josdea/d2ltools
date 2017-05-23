var currentTip;
var updateInterval = 30000;
var updateTimer;

function updateView(tipnumber){
  console.log("entered update view " + tipnumber );
   document.getElementById("tiptitle").innerHTML =
  jsonarray[tipnumber].tipTitle;

document.getElementById("tipcontent").innerHTML = (tipnumber+1) + ". " +
  jsonarray[tipnumber].tipContent;

document.getElementById('url').href =
  jsonarray[tipnumber].url;
  
 
}

function getRandomTip(){

  console.log("entered getrandom tip");
 var xRandom = Math.floor((Math.random() * (jsonarray.length)) + 0);
  currentTip = xRandom;
  updateView(currentTip);
}

function nextTip(){
  clearInterval(updateTimer);
  console.log("current tip is " + currentTip);
  console.log("array length is " + jsonarray.length);
  if (currentTip == (jsonarray.length -1)){
   console.log("last tip in array");
    currentTip = 0;
  }else{
    currentTip = currentTip + 1;
    console.log("adding 1 to current tip");
  }
  updateView(currentTip);
  
}

function previousTip(){
  clearInterval(updateTimer);
  console.log("current tip is " + currentTip);
  console.log("array length is " + jsonarray.length);
  if (currentTip == 0){
   console.log("first tip in array");
    currentTip = jsonarray.length - 1;
  }else{
    currentTip = currentTip - 1;
    console.log("subtracting 1 from current tip");
  }
  updateView(currentTip);
  
}

getRandomTip();
updateTimer = setInterval(getRandomTip, updateInterval);