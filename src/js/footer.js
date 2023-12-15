// fOOTER.JS
document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
  const footerRefs = {
    openModalBtn: document.querySelector(".footer-data-modal-open"),
    closeModalBtn: document.querySelector(".footer-data-modal-close"),
    modal: document.querySelector(".footer-data-modal"),
    overlay: document.querySelector(".footer-modal-overlay"),
  };

  footerRefs.openModalBtn.addEventListener("click", toggleModal);
  footerRefs.closeModalBtn.addEventListener("click", toggleModal);
  footerRefs.overlay.addEventListener("click", closeModalOverlay);

  function toggleModal() {
    footerRefs.modal.classList.toggle("footer-is-hidden");
  }

  function closeModalOverlay() {
    footerRefs.modal.classList.add("footer-is-hidden");
  }

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modal) {
  //     footerRefs.modal.close();
  //   }
  // });
})();



  