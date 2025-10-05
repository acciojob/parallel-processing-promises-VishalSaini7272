// Select elements
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Array of image URLs
const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

// Function to download one image (returns a Promise)
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main function to download all images
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  errorDiv.innerHTML = "";

  // Show loading spinner
  loading.style.display = "block";

  // Create array of Promises
  const promises = imageUrls.map(url => downloadImage(url));

  // Use Promise.all to wait for all images to load
  Promise.all(promises)
    .then(images => {
      // Hide loading spinner
      loading.style.display = "none";

      // Append all images to output
      images.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      // Hide loading spinner
      loading.style.display = "none";

      // Show error message
      errorDiv.textContent = err;
    });
}

// Call function on page load
downloadImages();
