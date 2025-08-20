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
