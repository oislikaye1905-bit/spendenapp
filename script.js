let amount = 0;
let currentDisplay = 0;
const goal = 5000;
let animationId = null;

window.onload = function () {
  const saved = localStorage.getItem("amount");

  if (saved !== null) {
    amount = Number(saved);
    currentDisplay = amount;
  }

  updateDisplayInstant();
};

function formatNumber(num) {
  return Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'") + " CHF";
}

function updateProgress() {
  const progressFill = document.getElementById("progressFill");
  const percentText = document.getElementById("percentText");
  const amountEl = document.getElementById("amount");

  let percent = (amount / goal) * 100;
  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  percentText.innerText = Math.round(percent) + "%";
  progressFill.style.width = percent + "%";

  amountEl.classList.remove("goal-reached");

  if (percent < 50) {
    progressFill.style.background = "linear-gradient(90deg, #ffffff, #d8ecff)";
  } else if (percent < 100) {
    progressFill.style.background = "linear-gradient(90deg, #7ecbff, #4fa3ff)";
  } else {
    progressFill.style.background = "linear-gradient(90deg, #16e08f, #08c270)";
    amountEl.classList.add("goal-reached");
  }
}

function updateDisplayInstant() {
  document.getElementById("amount").innerText = formatNumber(amount);
  updateProgress();
}

function animateCounter(target) {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  function step() {
    const diff = target - currentDisplay;
    currentDisplay += diff * 0.15;

    if (Math.abs(diff) < 0.5) {
      currentDisplay = target;
      document.getElementById("amount").innerText = formatNumber(target);
      animationId = null;
      return;
    }

    document.getElementById("amount").innerText = formatNumber(currentDisplay);
    animationId = requestAnimationFrame(step);
  }

  step();
}

function changeAmount(value) {
  amount += value;
  if (amount < 0) amount = 0;

  localStorage.setItem("amount", amount);
  updateProgress();
  animateCounter(amount);
}

function resetAmount() {
  if (confirm("Wirklich zurücksetzen?")) {
    amount = 0;
    localStorage.setItem("amount", amount);
    updateProgress();
    animateCounter(amount);
  }
}