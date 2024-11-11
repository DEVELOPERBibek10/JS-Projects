const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const inputUndisabled = document.querySelector("#amount-one");
const inputDisabled = document.querySelector("#amount-two");
const convert = document.querySelector("#btn1");
const Reset = document.querySelector("#btn2");
const selector = document.querySelectorAll(".selector");
const flagOne = document.querySelector("#flag-one");
const flagTwo = document.querySelector("#flag-two");

function displayKeys(data) {
  const allOptions = Object.keys(data.conversion_rates);

  [currencyOne, currencyTwo].forEach((select) => {
    allOptions.forEach((key) => {
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.appendChild(option);
    });
  });

  updateFlag(currencyOne);
  updateFlag(currencyTwo);

  [currencyOne, currencyTwo].forEach((select) => {
    select.addEventListener("change", (event) => {
      updateFlag(event.target);
      inputDisabled.value = "";
    });
  });

  calculate(data);
}

function updateFlag(target) {
  const currencyCode = target.value;
  const countryCode = currencyToCountryCode[currencyCode];
  let flagsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  if (target === currencyOne) {
    flagOne.src = flagsrc;
  } else if (target === currencyTwo) {
    flagTwo.src = flagsrc;
  }
}

function calculate(data) {
  convert.addEventListener("click", (e) => {
    e.preventDefault();
    let amount = inputUndisabled.value;
    if (currencyOne != currencyTwo) {
      let reasult;
      reasult =
        (amount / data.conversion_rates[currencyOne.value]) *
        data.conversion_rates[currencyTwo.value];

      inputDisabled.value = reasult.toFixed(2);
    } else {
      inputDisabled.value = amount;
    }
  });
}

inputUndisabled.value = "";
inputUndisabled.addEventListener("click", () => {
  inputDisabled.value = "";
});

Reset.addEventListener("click", (e) => {
  e.preventDefault();
  inputUndisabled.value = "";
  inputDisabled.value = "";
});

fetch("https://v6.exchangerate-api.com/v6/e098f8c6cc3bd828ee363383/latest/USD")
  .then((res) => res.json())
  .then((data) => {
    displayKeys(data);
  });
