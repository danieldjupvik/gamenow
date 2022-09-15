export function goBackFunction() {
  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    history.back();
  });
}
