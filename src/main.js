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