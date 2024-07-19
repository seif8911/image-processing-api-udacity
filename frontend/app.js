document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const resizeForm = document.getElementById('resizeForm');
  const imageNameInput = document.getElementById('imageNameInput');
  const resizeResult = document.getElementById('resizeResult');

  if (!gallery) {
    console.error('Gallery element not found');
    return;
  }

  if (!resizeForm) {
    console.error('Resize form element not found');
    return;
  }

  if (!imageNameInput) {
    console.error('Image name input element not found');
    return;
  }

  if (!resizeResult) {
    console.error('Resize result element not found');
    return;
  }

  document
    .getElementById('uploadForm')
    .addEventListener('submit', async function (event) {
      event.preventDefault();
      const fileInput = document.getElementById('fileInput');
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Image uploaded successfully');
        loadGallery();
      } else {
        alert('Failed to upload image');
      }
    });

  async function loadGallery() {
    const response = await fetch('/api/images/list');
    const images = await response.json();

    gallery.innerHTML = '';

    images.forEach(image => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image');

      const imgElement = document.createElement('img');
      const imgSrc = `/api/images?filename=${image}`; // Adjust the path if needed
      imgElement.src = imgSrc;

      imgElement.onerror = () => {
        console.error(`Failed to load image: ${imgSrc}`);
      };

      const imageInfo = document.createElement('div');
      imageInfo.classList.add('image-info');

      const imageText = document.createElement('p');
      imageText.textContent = image;

      imageInfo.appendChild(imageText);
      imageContainer.appendChild(imgElement);
      imageContainer.appendChild(imageInfo);

      imageContainer.addEventListener('click', () => {
        imageNameInput.value = image; // Auto-fill the input with the selected image filename
        resizeForm.style.display = 'block';
      });

      gallery.appendChild(imageContainer);
    });
  }

  resizeForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const imageName = imageNameInput.value;
    const width = document.getElementById('widthInput').value;
    const height = document.getElementById('heightInput').value;

    const response = await fetch(
      `/api/images?filename=${imageName}&width=${width}&height=${height}`
    );
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    if (response.ok) {
      resizeResult.innerHTML = `Your Resized Image is here: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;

      // Display the image itself
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      resizeResult.appendChild(imgElement);
    } else {
      resizeResult.textContent = `Failed to resize image: ${response.statusText}`;
    }
  });

  loadGallery();
});
