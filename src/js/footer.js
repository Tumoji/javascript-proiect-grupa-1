document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
    const refs = {
      openModalBtn: document.querySelector("[footer-data-modal-open]"),
      closeModalBtn: document.querySelector("[footer-data-modal-close]"),
      modal: document.querySelector("[footer-data-modal]"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("footer-is-hidden");
    }
  })();