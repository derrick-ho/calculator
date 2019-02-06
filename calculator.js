
const btns = document.querySelectorAll('.calc-input');
const disp = document.getElementById('calc-form');

function setDisp(val) {
disp.value = val;
disp.backgroundColor = "pink";
}

btns.forEach((button) => {
   /*
   button.addEventListener('mouseover', (e) => {
      button.style.backgroundColor = "gray";
   });
   */
   button.addEventListener('mouseout', (e) => {
      button.style.backgroundColor = "white";
   });
   button.addEventListener('mousedown', (e) => {
      button.style.backgroundColor = "pink";
      setDisp(button.textContent);
   });
   button.addEventListener('mouseup', (e) => {
      button.style.backgroundColor = "white";
   });
});




