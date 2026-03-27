let amount = 0;
let currentDisplay = 0;
const goal = 1500;
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

  let percent = (amount / goal) * 100;
  if (percent > 100) percent = 100;

  percentText.innerText = Math.round(percent) + "%";
  progressFill.style.width = percent + "%";

  
  if (percent < 100) {
    progressFill.style.background = "linear-gradient(90deg, #4fa3ff, #1e6eff)";
  } else {
    progressFill.style.background = "linear-gradient(90deg, #00ff9c, #00c97b)";
  }
}

function updateDisplayInstant() {
  document.getElementById("amount").innerText = formatNumber(amount);
  updateProgress();
}

function animateCounter(target) {
  if (animationId) cancelAnimationFrame(animationId);

  function step() {
    let diff = target - currentDisplay;
    currentDisplay += diff * 0.15;

    if (Math.abs(diff) < 0.5) {
      currentDisplay = target;
      document.getElementById("amount").innerText = formatNumber(target);
      return;
    }

    document.getElementById("amount").innerText = formatNumber(currentDisplay);
    animationId = requestAnimationFrame(step);
  }

  step();
}

function changeAmount(value) {
  amount += value;

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