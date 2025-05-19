 const theme = localStorage.getItem('selectedTheme');
 console.log(theme);
 if (theme) {
   const mainBody = document.getElementById('main_body');
   if (mainBody) {
     mainBody.classList.add(theme);
   }
 }
 