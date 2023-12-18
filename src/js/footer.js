// fOOTER.JS
document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
  const footerRefs = {
    openModalBtn: document.querySelector(".footer-data-modal-open"),
    closeModalBtn: document.querySelector(".footer-data-modal-close"),
    footerModal: document.querySelector(".footer-data-modal"),
    cover: document.querySelector(".footer-modal-cover"),
  };

  footerRefs.openModalBtn.addEventListener("click", toggleModal);
  footerRefs.closeModalBtn.addEventListener("click", closeFooterModal);
  footerRefs.cover.addEventListener("click", closeModalCover);

  function toggleModal() {
    const isHidden = footerRefs.footerModal.classList.contains("footer-is-hidden");

    if (isHidden) {
      footerRefs.footerModal.classList.remove("footer-is-hidden");
    } else {
      footerRefs.footerModal.classList.add("footer-is-hidden");
    }
  }

  function closeFooterModal() {
    footerRefs.footerModal.classList.add("footer-is-hidden");
  }

  function closeModalCover() {
    footerRefs.footerModal.classList.add("footer-is-hidden");
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !footerRefs.footerModal.classList.contains('footer-is-hidden')) {
      closeFooterModal();
    }
  });

})();


  // document.addEventListener('keydown', function (e) {
  //   if (e.key === 'Escape' && !footerModal.classList.contains('footer-is-hidden')) {
  //     closeFooterModal();
  //   }
  // });