const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector('select[name="from"]');
const toCurr = document.querySelector('select[name="to"]');
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amountInput = document.querySelector(".Amount input");
  let amountVal = parseFloat(amountInput.value.trim());

  if (!amountVal || amountVal < 1) {
    amountVal = 1;
    amountInput.value = 1;
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const url = `${BASE_URL}${from}.min.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data[from][to];

    const convertedAmount = (amountVal * rate).toFixed(2);

    msg.innerText = `${amountVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error("Error:", error);
  }
});
