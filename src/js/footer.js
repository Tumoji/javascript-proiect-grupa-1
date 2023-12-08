document.querySelector('.currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
    const openModalLink = document.querySelector('[data-modal-open]');
    const closeModal = document.querySelector('[data-modal-close]');
    const modal = document.querySelector('[data-modal]');
  
    openModalLink.addEventListener('click', function () {
        modal.classList.remove('is-hidden');
    });
  
    closeModal.addEventListener('click', function () {
        modal.classList.add('is-hidden');
    });
  });

