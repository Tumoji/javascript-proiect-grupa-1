!function(){let e=document.getElementsByClassName("btn1_container")[0],t=document.querySelector(".fas");function o(o){t.classList.toggle("fa-circle",!o),t.classList.toggle("fa-moon",o),t.classList.toggle("active1",o),e.classList.toggle("changeBg",o),document.body.classList.toggle("dark-mode",o),localStorage.setItem("darkMode",o)}function a(){return"true"===localStorage.getItem("darkMode")}o(a()),e.addEventListener("click",()=>{o(!a())})}();
//# sourceMappingURL=index.d7a7ff74.js.map