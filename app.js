let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

// change List
const changeList = document.getElementById("change-list");

for (let change of cid) {
  changeList.innerHTML += `<p>${
    change[0][0].toUpperCase() + change[0].slice(1).toLowerCase()
  }: ${change[1].toFixed(2)}</p>`;
}

// set total
const total = document.getElementById("total-amount");
total.innerHTML = price.toFixed(2);
