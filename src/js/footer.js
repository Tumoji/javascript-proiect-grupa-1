// fOOTER.JS
document.querySelector('.footer-currentYear').textContent = new Date().getFullYear();

(() => {
  const footerRefs = {
    openModalBtn: document.querySelector(".footer-data-modal-open"),
    closeModalBtn: document.querySelector(".footer-modal-close"),
    footerModal: document.querySelector(".footer-modal"),
    cover: document.querySelector(".footer-modal-cover"),
  };
  
  function openFooterModal() {
    // console.log("Open Modal");
    footerRefs.footerModal.classList.remove("footer-is-hidden");
    footerRefs.cover.classList.remove("footer-is-hidden");
  }
  
  function closeFooterModal() {
    // console.log("Close Modal");
    footerRefs.footerModal.classList.add("footer-is-hidden");
    footerRefs.cover.classList.add("footer-is-hidden");
  }


  footerRefs.openModalBtn.addEventListener("click", openFooterModal);
  footerRefs.closeModalBtn.addEventListener("click", closeFooterModal);
  footerRefs.cover.addEventListener("click", closeFooterModal);

  // document.addEventListener('keydown', function (e) {
  //   if (
  //     e.key === 'Escape' &&
  //     !footerRefs.footerModal.classList.contains('footer-is-hidden')
  //   ) {
  //     closeFooterModal();
  //   }
  // });

})();