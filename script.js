// Elements
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Image URLs to download
const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

// Create a promise that resolves with an <img> element when loaded, rejects on error
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Attach handlers before setting src to avoid race conditions
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));

    // Optional: improve decoding behavior in modern browsers
    if ("decoding" in img) img.decoding = "async";

    // Start loading
    img.src = url;
    // Provide a helpful alt for accessibility
    img.alt = `Image from ${url}`;
  });
}

function showLoading() {
  loading.style.display = "block";
}

function hideLoading() {
  loading.style.display = "none";
}

function clearOutputAndError() {
  output.innerHTML = "";
  errorDiv.textContent = "";
}

function downloadImages() {
  clearOutputAndError();
  showLoading();

  // map urls to promises
  const promises = imageUrls.map((url) => downloadImage(url));

  // wait for all or catch first failure
  Promise.all(promises)
    .then((images) => {
      hideLoading();
      // append all images to output
      images.forEach((img) => {
        // give each image a consistent width (optional)
        img.width = 200;
        output.appendChild(img);
      });
    })
    .catch((err) => {
      hideLoading();
      // display descriptive error message in #error (use .message if Error)
      errorDiv.textContent = err && err.message ? err.message : String(err);
    });
}

// Start downloads after DOM is ready so #loading is present for tests immediately
document.addEventListener("DOMContentLoaded", () => {
  // Ensure loading is visible right away (tests may read it immediately)
  showLoading();
  // Kick off the downloads
  downloadImages();
});
