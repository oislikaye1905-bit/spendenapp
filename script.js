let amount = 0;
const goal = 5000;

window.onload = function () {
  const saved = localStorage.getItem("amount");

  if (saved !== null) {
    amount = Number(saved);
  }

  updateDisplay();
};

function updateDisplay() {
  const display = document.getElementById("amount");
  const progressFill = document.getElementById("progressFill");
  const percentText = document.getElementById("percentText");

  display.innerText = amount + " CHF";

  let percent = (amount / goal) * 100;
  if (percent > 100) {
    percent = 100;
  }

  progressFill.style.width = percent + "%";
  percentText.innerText = Math.round(percent) + "%";

  localStorage.setItem("amount", amount);
}

function changeAmount(value) {
  amount += value;
  updateDisplay();

  const display = document.getElementById("amount");
  display.style.transform = "scale(1.08)";

  setTimeout(() => {
    display.style.transform = "scale(1)";
  }, 180);
}

function resetAmount() {
  const confirmReset = confirm("Möchtest du den Betrag wirklich zurücksetzen?");

  if (confirmReset) {
    amount = 0;
    updateDisplay();
  }
}