// fOOTER.JS
document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
  const refs = {
    openModalBtn: document.querySelector(".footer-data-modal-open"),
    closeModalBtn: document.querySelector(".footer-data-modal-close"),
    modal: document.querySelector(".footer-data-modal"),
    overlay: document.querySelector(".footer-modal-overlay"), // Adaugă referință către overlay
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.overlay.addEventListener("click", closeModalOverlay); // Adaugă eveniment pentru overlay

  function toggleModal() {
    refs.modal.classList.toggle("footer-is-hidden");
  }

  function closeModalOverlay() {
    refs.modal.classList.add("footer-is-hidden");
  }

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modal) {
  //     refs.modal.close();
  //   }
  // });
})();



  