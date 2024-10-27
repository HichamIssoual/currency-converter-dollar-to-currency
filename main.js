// hunt the element
let amount = document.querySelector("#usd");
let madConvert = document.querySelector(".mad span span");
let currencyContainer = document.getElementById("currencyId");
let amountConvertSpan = document.querySelector(".mad span > span");
// lets give the data from the api
fetch(
  "https://api.currencylayer.com/live?access_key=df287d846262e886f41f7a736cc7d718"
)
  .then((currency) => {
    return currency.json();
  })
  .then((res) => {
    let objectKeys = Object.keys(res.quotes);
    objectKeys.forEach((ele, index) => {
      let option = document.createElement("option");
      option.innerText = ele.substring(3);
      currencyContainer.append(option);
      if (index === 0) {
        option.setAttribute("selected", "");
      }
    });
    currencyContainer.onblur = () => {
      madConvert.innerHTML = `${(
        res.quotes[`USD${currencyContainer.value}`] * +amount.value
      ).toFixed(2)}<span>${currencyContainer.value}</span>`;
      amountConvertSpan.style.padding = "5px";
    };
    amount.oninput = () => {
      if (+amount.value < 0) {
        amount.value = "0";
      }
    };
  })
  .catch((reason) => {
    madConvert.textContent = `${reason.message}`;
  });
