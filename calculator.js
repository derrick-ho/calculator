const screen = document.querySelector('.calc');
const btns = document.querySelectorAll('.calc-input');
const disp = document.getElementById('calc-form');
const resDisp = document.getElementById('calc-res');
const nums = document.querySelector('.calc-numbers');
const funcs = document.querySelector('.calc-functions');

var awaiting = 0;

// Calculator Scaling
if (window.innerWidth/window.innerHeight > 0.5) { // Wide Screen
   disp.style.width = "70vw";
   resDisp.style.width = "70vw";
   
   screen.style.height = "70vh";
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

function calculate(x, y, func) {
   switch(func) {
      case '+':
         return Number(x) + Number(y);
         break;
      case '-':
         return Number(x) - Number(y);
         break;
      case '*':
         return Number(x) * Number(y);
         break;
      case '/':
         return Number(x) / Number(y);
         break;
   }
   return 0;
}

function operate(dispVal) {
/* Split into array of numbers and operators*/
   var num = dispVal.split(/[\+\-\*\/]/g);
   var func = dispVal.match(/[\+\-\*\/]/g);
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
         else
            i = indA;
      }
      else if (indM < 0)
         i = indD;
      else if (indD < 0)
         i = indM;
      else
         i = indM < indD ? indM : indD;
      
      var solve = calculate(num[i], num[i + 1], func[i]);
      func.splice(i, 1);
      num.splice(i, 2, solve);
   }
   return solve;
}

function setDisp(val) {
   // Keypad
   if (val.match(/[0-9]/g)) {
      if (disp.value == "0")
         disp.value = val;
      else
         disp.value += val;
   }
   // Delete
   else if (val == "DEL") {
      disp.value = disp.value.slice(0,-1);
      
      if (disp.value == "")
         disp.value = "0";
   }
   // Clear
   else if (val == "C") {
      disp.value = 0;
      resDisp.value = 0;
   }
   else if (val == "=") {
      if (disp.value.slice(-1).match(/[0-9]/g)) {
         resDisp.value = operate(disp.value);
         console.log(operate(disp.value));
      }
      //disp.value = 0;
   }
   else if (val.match(/[\+\-\*\/]/g)) {
      if (disp.value.slice(-1).match(/[0-9]/g)) {
         disp.value += val;
      }
      else {
         disp.value = disp.value.substring(0 , disp.value.length - 1) + val;
      }
   }
}

btns.forEach((button) => {
   button.addEventListener('click', (e) => {
      setDisp(button.textContent);
   });
   button.addEventListener('mouseout', (e) => {
      button.style.backgroundColor = "white";
   });
   button.addEventListener('mousedown', (e) => {
      button.style.backgroundColor = "pink";
   });
   button.addEventListener('mouseup', (e) => {
      button.style.backgroundColor = "white";
   });
});


// TODO: Add keydown for #s and functions

/*
   Methods to implement operators
      - save values when operator pressed
      - use split to split up all numbers/operators
*/
