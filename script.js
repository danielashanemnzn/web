document.addEventListener('DOMContentLoaded', function() {
  const imagesContainer = document.getElementById('images');
  const images = Array.from(imagesContainer.querySelectorAll('img'));
  
  // Initialize z-index values (first image on top with highest z-index)
  images.forEach((img, index) => {
    // First image (index 0) gets highest z-index, last gets lowest
    img.style.zIndex = images.length - index;
  });
  
  // Add click/tap event listener to images
  images.forEach((img) => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Find the image with the highest z-index (top image)
      let topImage = images[0];
      let maxZ = 0;
      
      images.forEach(currentImg => {
        const z = parseInt(window.getComputedStyle(currentImg).zIndex) || 0;
        if (z > maxZ) {
          maxZ = z;
          topImage = currentImg;
        }
      });
      
      // Only move if this is the top image
      if (topImage === img) {
        // Get current z-index
        const currentZ = parseInt(window.getComputedStyle(img).zIndex) || images.length;
        
        // Prevent further clicks during transition
        img.style.pointerEvents = 'none';
        
        // Add transition class
        img.classList.add('moving-to-back');
        
        // After transition completes, move to back and reset
        setTimeout(() => {
          // Find the lowest z-index
          let minZ = parseInt(window.getComputedStyle(images[0]).zIndex) || images.length;
          images.forEach(i => {
            const z = parseInt(window.getComputedStyle(i).zIndex) || images.length;
            if (z < minZ) minZ = z;
          });
          
          // Set this image to the back (lowest z-index - 1)
          img.style.zIndex = minZ - 1;
          
          // Update all other images to shift up
          images.forEach(otherImg => {
            if (otherImg !== img) {
              const otherZ = parseInt(window.getComputedStyle(otherImg).zIndex) || 0;
              if (otherZ > currentZ) {
                otherImg.style.zIndex = otherZ - 1;
              }
            }
          });
          
          // Remove transition class and restore normal state
          img.classList.remove('moving-to-back');
          // Reset inline styles to let CSS handle the rotation
          img.style.opacity = '';
          img.style.transform = '';
          img.style.pointerEvents = '';
          
          // Force a reflow to ensure the transform resets properly
          void img.offsetWidth;
        }, 800);
      }
    });
  });

  // Button and Modal functionality
  const messageButton = document.getElementById('messageButton');
  const modal = document.getElementById('messageModal');
  const closeBtn = document.querySelector('.close');
  const messageText = document.getElementById('messageText');

  // Messages array - you can customize these
  const messages = [
    "Happy Monthsary po Baby! I love you and thank you for staying with me through everything.❤️",
  ];

  // Open modal when button is clicked
  messageButton.addEventListener('click', function() {
    // Get a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageText.textContent = randomMessage;
    modal.style.display = 'block';
  });

  // Close modal when X is clicked
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
