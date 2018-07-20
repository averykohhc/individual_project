var clicked = true;

function changeColour() {
  if (clicked == true) {
    document.getElementById("button").style.background = "red";
    clicked = false;
  }
  else if (clicked == false){
    document.getElementById("button").style.background = "linear-gradient(180deg, #39C2C9 0%, #3FC8C9 80%, #3FC8C9 100%)";
    clicked = true;
  }

}
