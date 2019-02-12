const screen = document.querySelector('.calc');
const btns = document.querySelectorAll('.calc-input');
const disp = document.getElementById('calc-form');
const resDisp = document.getElementById('calc-res');
const nums = document.querySelector('.calc-numbers');
const funcs = document.querySelector('.calc-functions');

var eqFlag = false;                                      // Used for context after equal pressed

// TODO: Make it work when adjusting window size
// Calculator Scaling
/*
if ((window.innerWidth/window.innerHeight) > 0.5) {      // Wide Screen
   disp.style.width = "70vw";
   resDisp.style.width = "70vw";
   
   screen.style.height = "35vw";
   screen.style.width = "70vw";
   
   nums.style.flex = "1 1 20%"
}
else {
   disp.style.width = "80vh";
   resDisp.style.width = "80vh";
   
   screen.style.height = "80vh";
   screen.style.width = "80vh";
   
   nums.style.flex = "1 1 70%"
}
*/

function calculate(x, y, func) {
   switch(func) {
      case '+':
         return Number(x) + Number(y);
      case '-':
         return Number(x) - Number(y);
      case '*':
         return Number(x) * Number(y);
      case '/':
         if (Number(y) == 0)
            alert("Why on Earth would you attempt to do that?");
            
         return Number(x) / Number(y);
   }
   return 0;
}

// TODO: Prevent # overflows
function operate(dispVal) {
   var num = dispVal.split(/[\+\-\*\/]/g);            // Array of numbers without operators
   var func = dispVal.match(/[\+\-\*\/]/g);           // Array of operators
   var indM, indD, indA, indS, i = 0;
   var solve = dispVal;
   
   while (func) {
      indM = func.indexOf("*");
      indD = func.indexOf("/");
      if (indM  < 0 && indD < 0) {
         indA = func.indexOf("+");
         indS = func.indexOf("-");

         if (indA  < 0 && indS < 0)
            return solve;
         else if (indA < 0)
            i = indS;
         else if (indS < 0)
            i = indA;
         else
            i = indA < indS ? indA : indS;            // Use earliest occurrence of add/subtr
      }
      else if (indM < 0)
         i = indD;
      else if (indD < 0)
         i = indM;
      else
         i = indM < indD ? indM : indD;               // Use earliest occurrence of mult/div
      
      solve = calculate(num[i], num[i+1], func[i]);
      func.splice(i, 1);
      num.splice(i, 2, solve);
   }
   return solve;
}

function setDisp(val) {
   // ==================================Clear===================================
   if (val == 'C') {
      disp.value = 0;
      resDisp.value = 0;
      eqFlag = false;
   }
   // ==============================Answer Context===============================
   else if (eqFlag == true) {
      if (val == "DEL")
         disp.value = '0';
      else if (val.search(/[\+\-\*\/]/g) > -1)
         disp.value = resDisp.value + val;
      else if (val == '=')
         disp.value = resDisp.value;
      else
         disp.value = val;
      eqFlag = false;
   }
   // ==================================Keypad==================================
   else if (val.search(/[0-9]/g) > -1) {
      if (disp.value == "0")
         disp.value = val;
      else
         disp.value += val;
   }
   // ==================================Delete==================================
   else if (val == "DEL") {
      disp.value = disp.value.slice(0,-1);
      
      if (disp.value == "")
         disp.value = "0";
   }
   // ==================================Equal===================================
   else if (val == '=') {
      if (disp.value.slice(-1).search(/[0-9\.]/g) > -1)
         resDisp.value = operate(disp.value);
      eqFlag = true;
   }
   // ================================Operators=================================
   else if (val.search(/[\+\-\*\/]/g) > -1) {
      if (disp.value.slice(-1).search(/[0-9\.]/g) > -1)
         disp.value += val;
      else
         disp.value = disp.value.substring(0 , disp.value.length - 1) + val;
   }
   // =================================Decimal==================================
   else if (val.search(/\./g) > -1) {
      // Only one decimal allowed before another operator
      var lastDec = disp.value.lastIndexOf('.');

      if (lastDec < 0 || disp.value.slice(lastDec).search(/[\+\-\*\/]/g) > -1)
         disp.value += val;
   }
}

btns.forEach((button) => {
   button.addEventListener('click', (e) => {
      setDisp(button.textContent);
   });
   button.addEventListener('mouseover', (e) => {
      button.style.opacity = "0.6";
   });
   button.addEventListener('mouseout', (e) => {
      button.style.opacity = "1.0";
   });
   button.addEventListener('mousedown', (e) => {
      button.style.opacity = "0.4";
      //button.style.backgroundColor = "pink";
   });
   button.addEventListener('mouseup', (e) => {
      button.style.opacity = "1.0";
      //button.style.backgroundColor = "white";
   });
});

screen.addEventListener("keypress", readKey);
screen.addEventListener("keydown", readKeyDown);

function readKeyDown(e) {
   switch(e.which) {
      // Backspace key
      case 8:
      // DEL key
      case 46: 
         return setDisp('DEL');
      // Enter key
      case 13:
         // Prevent form submission with Enter
         e.preventDefault();
         return setDisp('=');
   }
}
function readKey(e) {
   switch(e.which) {
      case 48:
         return setDisp('0');
      case 49:
         return setDisp('1');
      case 50:
         return setDisp('2');
      case 51:
         return setDisp('3');
      case 52:
         return setDisp('4');
      case 53:
         return setDisp('5');
      case 54:
         return setDisp('6');
      case 55:
         return setDisp('7');
      case 56:
         return setDisp('8');
      case 57:
         return setDisp('9');
      case 42:
         return setDisp('*');
      case 43:
         return setDisp('+');
      case 45:
         return setDisp('-');
      case 46:
         return setDisp('.');
      case 47:
         return setDisp('/');
      case 61:
         return setDisp('=');
   }
};