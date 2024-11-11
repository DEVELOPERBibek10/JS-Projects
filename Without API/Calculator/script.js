let button = document.querySelectorAll("button");
let input = document.querySelector(".input");

let display = Array.from(button);

let errorMsg = "Error";

let calculation = () => {
  if (input.value !== errorMsg) {
    try {
      input.value = eval(input.value);
    } catch {
      input.value = errorMsg;
    }
  }
};

display.forEach((element) => {
  element.addEventListener("click", (e) => {
    let buttonText = e.target.innerHTML;
    if (buttonText == "C") {
      input.value = "";
    } else if (buttonText == "=") {
      calculation();
    } else {
      if (input.value !== errorMsg) {
        input.value += buttonText;
      }
    }
  });
});
