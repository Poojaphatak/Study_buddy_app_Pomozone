const musicPlayer = document.querySelector('.player-container');
const MusicBtn = document.querySelector('#music_btn');
let isClick =false;
MusicBtn.addEventListener('click',()=>{
    if(isClick){
        musicPlayer.classList.add('hide');
        isClick=false;
    }
    else{
        musicPlayer.classList.remove('hide');
        isClick = true;
    }

})