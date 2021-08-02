var gMemory = 0;

var gNum1 = "";
var gOp = "";
var gNum2 = "";
var gResult = 0;
var gNumSelector = true; // true means num1, false mean num2

// References to the screen and result elements
var elScreenTyping = document.querySelector(".numbers");
var elScreenResult = document.querySelector(".result");




// Add's digits to the numbers (typing)
function addDigit(digit) {
  // gNumSelector determines which gNum to work on
  if (gNumSelector) {
    gNum1 += digit;
    elScreenTyping.innerText += digit;
  } else {
    gNum2 += digit;
    elScreenTyping.innerText += digit;
  }
  renderScreen(false);
}

// Calculates the result of a regular operator, render screen and return result
function calcResult() {
  // Convert gNums from string to number, for calculation
  gNum1 = parseFloat(gNum1);
  gNum2 = parseFloat(gNum2);

  switch (gOp) {
    case "+":
      gResult = gNum1 + gNum2;
      break;
    case "-":
      gResult = gNum1 - gNum2;
      break;
    case "*":
      gResult = gNum1 * gNum2;
      break;
    case "/":
      gResult = gNum1 / gNum2;
      break;
  }

  renderScreen(true);
  return gResult;
}

// Sets gOp to be string of the operator
function setOP(sign) {
  // If gOp already exist, means continues calculation
  // So gNum1 turns to the latest gResult, gNum2 to empty string, and continue calculating
  if (gOp) {
    gNum1 = calcResult();
    gNum2 = "";
  } else {
    gNumSelector = false; // An operator is pressed, so its time to move to gNum2
  }

  gOp = sign;

  renderScreen(false);
}

function renderScreen(ifOp) {
  // Reset the screen, just in case
  elScreenTyping.innerText = "";
  elScreenResult.innerText = "";

  // Render depends on which numbers are already typed
  if (!gNum2) {
    elScreenTyping.innerText = gNum1 + " " + gOp;
  } else if (gNum2) {
    elScreenTyping.innerText = gNum1 + " " + gOp + " " + gNum2;
  }

  // If an other operator is pressed and not the = sign
  // Don't print the result, instead go to continues calculation (as in setOp function)
  if (!ifOp) {
    elScreenResult.innerText = "";
  } else { // If not, show the result on the screen
    if (gResult) {
      elScreenResult.innerText = gResult;
    }
  }
}

// Special operators
function specialOp(sign) {
// SpecialOp will calculate the current result according to the special operator
// It will set the result in gNum1, reset gNum2 and the result and continue to continues calculation
// Also render the screen

  calcResult();

  if (gNum2 && gOp) {
    switch (sign) {
      case "%":
        gResult = calcResult() / 100;
        break;
      case "√":
        gResult = Math.sqrt(calcResult());
        break;
      case "+/-":
        gResult = calcResult() * -1;
        break;
    }
  } else if (!gNum2) {
    switch (sign) {
      case "%":
        gResult = gNum1 / 100;
        break;
      case "√":
        gResult = Math.sqrt(gNum1);
        break;
      case "+/-":
        gResult = gNum1 * -1;
        break;
    }
  }

  gNum1 = gResult;
  gNum2 = "";
  gOp = "";
  gResult = "";

  renderScreen(true);
}

//Memory
function memoryOp(elMemoryCell) {
// Memory operations function

  switch (elMemoryCell) {
    case "MC":
      gMemory = 0;
      break;
    case "MR":
        if(!gNum1){
            gNum1 = gMemory;
        } else if(!gNum2){
            gNum2 = gMemory;
        }
        renderScreen(true);
      break;
    case "MS":
        if ((gNum1 && !gNum2 && !gOp) || (gNum1 && !gNum2 && gOp)) {
            gMemory = parseFloat(gNum1);
          } else if (gNum1 && gNum2 && gOp && !gResult) {
            gMemory = parseFloat(gNum2);
          } else if (gNum1 && gNum2 && gOp && gResult) {
            gMemory = parseFloat(gResult);
          }
      break;
    case "M+":
      if ((gNum1 && !gNum2 && !gOp) || (gNum1 && !gNum2 && gOp)) {
        gMemory += parseFloat(gNum1);
      } else if (gNum1 && gNum2 && gOp && !gResult) {
        gMemory += parseFloat(gNum2);
      } else if (gNum1 && gNum2 && gOp && gResult) {
        gMemory += parseFloat(gResult);
      }
      break;
    case "M-":
      if ((gNum1 && !gNum2 && !gOp) || (gNum1 && !gNum2 && gOp)) {
        gMemory -= parseFloat(gNum1);
      } else if (gNum1 && gNum2 && gOp && !gResult) {
        gMemory -= parseFloat(gNum2);
      } else if (gNum1 && gNum2 && gOp && gResult) {
        gMemory -= parseFloat(gResult);
      }
      break;
  }
}

// DEL -  Delete digit
function removeDigit() {
  if (gNum2) {
    gNum2 = gNum2.substring(0, gNum2.length - 1);
    elScreenTyping.innerText = gNum1 + " " + gOp + " " + gNum2;
  } else if (!gNum2 && gOp) {
    elScreenTyping.innerText = gNum1;
    gOp = "";
  } else if (gNum1) {
    gNum1 = gNum1.substring(0, gNum1.length - 1);
    elScreenTyping.innerText = gNum1;
  }
}

// CE - Clear the latest number written on screen
function clearNum() {
  if (gNum2) {
    gNum2 = "";
    elScreenTyping.innerText = gNum1 + " " + gOp;
  } else if (gNum1 && !gNum2) {
    clearCalc();
  }
}

//C - Clear the screen, numbers and results
function clearCalc() {
  elScreenTyping.innerText = "";
  elScreenResult.innerText = "";
  gNum1 = "";
  gNum2 = "";
  gResult = 0;
  gOp = "";
  gNumSelector = true;
}

// Add option to type numbers , basic operators and equal with keyboard
function keyBoardInput(elKey){
    if((parseInt(elKey) >= 0 && parseInt(elKey) <=9) || elKey === '.'){
        addDigit(elKey);
    }
    if(elKey === 'Enter'){
        calcResult(true);
    }
    if(elKey === '+' || elKey === '-' || elKey === '/' || elKey === '*'){
        setOP(elKey);
    }
}