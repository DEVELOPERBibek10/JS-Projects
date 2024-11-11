// Select all FAQ sections
const faqs = document.querySelectorAll(".faq");

// Function to toggle the info container
function toggleInfo(targetId) {
  const infoContainers = document.querySelectorAll(".info-container");

  // Hide all info containers
  infoContainers.forEach((container) => {
    if (container.id !== targetId) {
      container.classList.remove("active");
    }
  });

  // Toggle the display of the selected info container
  const targetContainer = document.getElementById(targetId);
  if (targetContainer.classList.contains("active")) {
    targetContainer.classList.remove("active");
  } else {
    targetContainer.classList.add("active");
  }
}

// Add click event listeners to each FAQ section
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    const targetId = faq.getAttribute("data-target");
    toggleInfo(targetId);
  });
});
