export function createPreview() {
  const posterLink = document.querySelector("#link");
  const preview = document.querySelector(".img-preview");
  const previewImg = preview.querySelector("img");
  console.log(previewImg);
  posterLink.addEventListener("keyup", (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.length > 7) {
      preview.innerHTML = `
      <img class="preview-img" src="${posterLink.value}" alt="Preview">
      `;
    } else {
      preview.innerHTML = `
      <img class="preview-img" src="https://dummyimage.com/341%E2%80%8Ax447/000000/fff.jpg&text=Image" alt="Preview">`;
    }
  });
}
