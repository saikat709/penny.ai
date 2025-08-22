
// Alert all localStorage data when popup is opened
window.addEventListener('DOMContentLoaded', () => {
  let allData = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    allData += `${key}: ${value}\n`;
  }
  if (allData) {
    alert('localStorage data:\n' + allData);
  } else {
    alert('localStorage is empty.');
  }
});

const sendButton = document.getElementById("send");
const cancelButton = document.getElementById("cancel");
const amountInput = document.getElementById("amount");

sendButton.addEventListener("click", () => {
  const amount = amountInput.value;
  if (amount) {
    // TODO: Replace with actual API call
    console.log("Sending amount:", amount);
    window.close();
  }
});

cancelButton.addEventListener("click", () => {
  window.close();
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "q") {
    window.close();
  }
});