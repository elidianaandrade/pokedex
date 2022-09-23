/* MENU ITEM */ 
const menuItems = document.querySelectorAll('.menu__item');

menuItems.forEach(item => {
  item.addEventListener("click", function() {   
    menuItems.forEach(a=>{
      a.classList.remove("active");
    });
     item.classList.add("active");    
  });  
});
/* MENU ITEM END */ 

/* BUTTON UP */
function showButtonUp () {
  const buttonUp = document.getElementById('buttonUp'); 
  if (window.scrollY > 100) {
    buttonUp.style.display = 'block';
  }   else {
    buttonUp.style.display = 'none';
  }
}

window.addEventListener('scroll', showButtonUp);
/* BUTTON UP END */