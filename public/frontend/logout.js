 document.querySelector('.logoutBtn').addEventListener('click',function(){
        const confirmation = confirm('Are you sure you want to log out?');
        if(confirmation){
          window.location.href='/logout';
        }
    });