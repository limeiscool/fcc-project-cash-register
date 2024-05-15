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

const cidKey = {
  "ONE HUNDRED": 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};

// change List
const changeList = document.getElementById("change-list");

for (let changeInDrawer of cid) {
  changeList.innerHTML += `<p>${
    changeInDrawer[0][0].toUpperCase() +
    changeInDrawer[0].slice(1).toLowerCase()
  }: ${changeInDrawer[1].toFixed(2)}</p>`;
}

// set total
const total = document.getElementById("total-amount");
total.innerHTML = price.toFixed(2);

// purchase button
const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash");
const drawer = document.querySelector("#change-due");
const changeStat = document.getElementById("change-amount");

drawer.style.display = "none";
purchaseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!cashInput.value) {
    drawer.innerHTML = "Please enter cash given";
    drawer.style.display = "block";
    return;
  }
  const decimalLength = cashInput.value.toString().split(".")[1]?.length || 0;
  if (decimalLength > 2) {
    drawer.innerHTML = "Please enter a valid cash amount";
    drawer.style.display = "block";
    return;
  }
  if (cashInput.value < price) {
    window.alert("Customer does not have enough money to purchase the item");

    return;
  }
  if (cashInput.value == price) {
    drawer.innerHTML = "No change due - customer paid with exact cash";
    drawer.style.display = "block";
    changeStat.innerHTML = 0;
    return;
  }
  // customer is due change
  if (cashInput.value > price) {
    // work with non decimals to ensure accuracy of calculations
    // change needed to be returned to customer
    let change = cashInput.value * 100 - price * 100;
    // array to store change we've given back
    let changeToGive = [];
    // clone cid to not alter original while converting each value to non decimal
    let cidClone = cid.map((x) => [x[0], Math.floor(x[1] * 100)]);
    // set the chagnge in stat bar
    changeStat.innerHTML = (change / 100).toFixed(2);
    // loop through cloned cid
    for (let i = cidClone.length - 1; i >= 0; i--) {
      // name of currency ones, quarters, etc..
      const name = cidClone[i][0];
      // value of currency in non decimal .01 = 1;
      const cidWorth = Math.floor(cidKey[name] * 100);
      // keeps track of number of each coins given out;
      let count = 0;
      // while this can be given and have some to give
      while (change >= cidWorth && cidClone[i][1] > 0) {
        // can't give more than we have
        if (cidClone[i][1] - cidWorth < 0) break;
        // as we give coins
        // change and drawerClone will be updated
        change -= cidWorth;
        cidClone[i][1] -= cidWorth;
        // increment count for each coin
        count++;
      }
      // if we have given out this coin push to changeToGive
      if (count > 0) {
        let valueGiven = (cidWorth / 100) * count;
        changeToGive.push([name, valueGiven]);
      }
    }

    // if we gave out all change
    if (change === 0) {
      let drawerTotal = 0;
      for (let i = 0; i < cidClone.length; i++) {
        drawerTotal += cidClone[i][1];
      }

      // if drawer is empty set status to closed
      let returnStr = drawerTotal === 0 ? "Status: CLOSED" : "Status: OPEN";
      changeList.innerHTML = "";
      cid = cidClone.map((x) => [x[0], x[1] / 100]);
      for (let changeInDrawer of cid) {
        changeList.innerHTML += `<p>${
          changeInDrawer[0][0].toUpperCase() +
          changeInDrawer[0].slice(1).toLowerCase()
        }: ${changeInDrawer[1].toFixed(2)}</p>`;
      }

      for (let i = 0; i < changeToGive.length; i++) {
        returnStr += ` ${changeToGive[i][0]}: $${changeToGive[i][1]}`;
      }
      drawer.innerHTML = returnStr;
      drawer.style.display = "block";
      return;
      // else theres still change to give out but no money in drawer
    } else {
      drawer.innerHTML = "Status: INSUFFICIENT_FUNDS";
      drawer.style.display = "block";
    }

    return;
  }
});

// clear button
const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  changeStat.innerHTML = 0;
  cashInput.value = "";
  drawer.value = "";
  drawer.style.display = "none";
  return;
});
