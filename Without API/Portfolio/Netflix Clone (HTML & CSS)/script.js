// Select all FAQ sections
const faqs = document.querySelectorAll(".faq");
const infoContainers = document.querySelectorAll(".info-container");
// Function to toggle the info container
function toggleInfo(targetId) {
  // Hide all info containers
  infoContainers.forEach((container) => {
    if (container.id !== targetId) {
      container.classList.remove("active");
    }
  });

  // Toggle the display of the selected info container
  const targetContainer = document.getElementById(targetId);
  targetContainer.classList.toggle("active");
}

// Add click event listeners to each FAQ section
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    const targetId = faq.getAttribute("data-target");
    const add = faq.querySelector(".material-symbols-outlined");
    toggleInfo(targetId);
    if (add) {
      add.classList.toggle("active");
    }
  });
});
