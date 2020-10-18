import Header from "./header";
import Input from "../components/input";

const currency = {
  url: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
  USD: 0,
  EUR: 1
};

export default function App() {
  let uahPerUsdValue = 1;

  const usdSalaryOptions = {
    className: "is-info",
    id: "daySalary",
    title: "Per hour usd:"
  };

  /** Build Elements */
  const button = document.createElement("button");
  button.className = "button is-primary";
  button.textContent = "Click";
  const uahPerUsdBlock = document.createElement("div");
  uahPerUsdBlock.className = "py-3 has-text-light";
  const uahPerEurBlock = document.createElement("div");
  uahPerEurBlock.className = "py-3 has-text-light";
  const resultUah = document.createElement("div");
  resultUah.className = "p-3 has-text-light";
  const resultUsd = document.createElement("div");
  resultUsd.className = "p-3 has-text-light";
  const block = document.createElement("div");
  block.className = "card card-content";

  /** Methods */
  const errorMessage = (element, isError = true) => {
    if (!element) {
      console.warn("Missed element for error message!");
      return;
    }

    const errorBlock = document.createElement("p");
    const lastElem = element.lastChild;

    if (!isError && lastElem.classList.contains("is-danger")) {
      lastElem.remove();
    }

    if (isError && !lastElem.classList.contains("is-danger")) {
      errorBlock.className = "help is-danger";
      errorBlock.textContent = "Invalid value! Should be a Number";
      element.appendChild(errorBlock);
    }
  };

  const getSalaryUsd = (usd) => {
    const hoursDaysWeeks = 8 * 5 * 4;
    const inputField = document.getElementById(usdSalaryOptions.id);
    const field = inputField.parentElement;

    if (isNaN(Number(usd))) {
      return errorMessage(field);
    } else {
      errorMessage(field, false);
      return usd * hoursDaysWeeks;
    }
  };

  const getSalaryUah = (uah, usd) => {
    if (isNaN(Number(uah))) return;

    return uah * usd;
  };

  const displayResult = (usd) => {
    resultUsd.innerHTML = `
      <p>
        Salary per month USD: ${usd} <br>
        Salary per year USD: ${usd * 12}
      </p>
    `;
    resultUah.innerHTML = `
      <p>
        Salary per month UAH: ${getSalaryUah(uahPerUsdValue, usd)} <br>
        Salary per year UAH: ${getSalaryUah(uahPerUsdValue, usd) * 12}
      </p>
    `;
  };

  const handleResult = () => {
    const inputField = document.getElementById(usdSalaryOptions.id);
    const daySalaryValue = inputField.value;
    const salaryUsd = getSalaryUsd(daySalaryValue);

    displayResult(salaryUsd);

    block.append(resultUsd, resultUah);
  };

  button.addEventListener("click", handleResult);

  fetch(currency.url)
    .then((resp) => {
      if (!resp.ok) {
        console.error(`Response error: ${resp.status}`);
      } else {
        return resp.json();
      }
    })
    .then((data) => {
      const result = Math.round(data[currency.USD].sale * 100) / 100;
      uahPerUsdValue = result;

      uahPerUsdBlock.textContent = `UAH per USD: ${uahPerUsdValue}`;
    })
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });

  block.append(Header(), uahPerUsdBlock, Input(usdSalaryOptions), button);

  return document.getElementById("app").appendChild(block);
}
