// fOOTER.JS
document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
  const footerRefs = {
    openModalBtn: document.querySelector(".footer-data-modal-open"),
    closeModalBtn: document.querySelector(".footer-data-modal-close"),
    modal: document.querySelector(".footer-data-modal"),
    cover: document.querySelector(".footer-modal-cover"),
  };

  footerRefs.openModalBtn.addEventListener("click", toggleModal);
  footerRefs.closeModalBtn.addEventListener("click", toggleModal);
  footerRefs.cover.addEventListener("click", closeModalCover);

  function toggleModal() {
    // console.log('toggleModal test');
    footerRefs.modal.classList.toggle("footer-is-hidden");
  }

  function closeModalCover() {
    // console.log('closeModalCover test');
    footerRefs.modal.classList.add("footer-is-hidden");
  }

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modal) {
  //     footerRefs.modal.close();
  //   }
  // });
})();



  