
   let motivation_div = document.querySelector('.motivation_box');
   let mDisplay=false;
   let isTimer = false;
   let timer_div = document.querySelector('.timer-app');
    let motivation_btn = document.querySelector('#motivation_tag');
    let timer_btn = document.querySelector('#timer_tag');
   
   
    //  const theme = localStorage.getItem('selectedTheme');
    // if (theme) {
    //   document.getElementById('main-body').classList.add(theme);
    // }
     const quotes = [
    "Don’t watch the clock; do what it does. Keep going.” — Sam Levenson",

    "“Success doesn’t come from what you do occasionally, it comes from what you do consistently.” — Marie Forleo",

    "Push yourself, because no one else is going to do it for you.",

    "Study while others are sleeping. Work while others are loafing. Prepare while others are playing. Dream while others are wishing.” — William A. Ward",

     "“The secret of getting ahead is getting started.” — Mark Twain",

    "“You don’t have to be great to start, but you have to start to be great.” — Zig Ziglar",

    "“Hard work beats talent when talent doesn’t work hard.” — Tim Notke",

     "“Discipline is doing what needs to be done, even if you don’t want to do it.”",

    "“Focus on progress, not perfection.”",

    "“One day, all your hard work will pay off.”",

    "“Wake up with determination. Go to bed with satisfaction.”",

"“Small steps every day lead to big results.”",

"“Success is the sum of small efforts repeated day in and day out.” — Robert Collier",

"“Motivation gets you going, but discipline keeps you growing.” — John C. Maxwell",

"“Winners are not people who never fail, but people who never quit.”",
];

function fetchQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote-box").innerText = quotes[random];
  console.log(random);
}
   document.querySelector('#quote_btn').addEventListener('click',fetchQuote);
   function motivationPopup(){
    if(!mDisplay){
      motivation_div.classList.remove('hide');
      mDisplay=true;
    }
    else{
       motivation_div.classList.add('hide');
        mDisplay=false;
    }

    
      
   }
   function timerPopup(){
    if(!isTimer){
      timer_div.classList.remove('hide');
      isTimer=true;
    }
    else{
    
       timer_div.classList.add('hide');
       isTimer=false;
    }

    
      
   }

  
   motivation_btn.addEventListener('click',motivationPopup);

   
   timer_btn.addEventListener('click',timerPopup);
  
   