//------question container-----//


function hideDiv(){
  $("#weather-Info").hide();
  $(" #pomodoro-Timer, #pomodoro-clock-action").hide();
};
//--------------------------------------//
var storeButton;
$('#bad').on('click', function() { 
  console.log("bad was clicked");
  $(".question-box").hide(500);
  $("#pomodoro-Timer, #pomodoro-clock-action").show();
  $("#minutes").html(leadingZero(10));
  storeButton = 10;
   
  return minutes = $("#bad").val();
 

});
$('#good').on('click', function () { 
  console.log("good was clicked");
  $(".question-box").hide(500);
  $("#pomodoro-Timer, #pomodoro-clock-action").show();
  $("#minutes").html(leadingZero(20));
  storeButton = 25;
  return minutes = $("#good").val();

 
 
  
});
$('#excellent').on('click', function() { 
  console.log("excellent was clicked");
  $(".question-box").hide(500);
  $("#pomodoro-Timer, #pomodoro-clock-action").show();
  $("#minutes").html(leadingZero(40));
  storeButton = 40;
  return minutes = $("#excellent").val();

});







//----------------weather api --------------------------------//
//-----still need to fix 1) Show error message for user -----// 
//-----------------------2) Load only 1 weather info -------//
const appidCode ="4c2c8c79b7c3a9598be47c0b836bfd42";
const metricUnit ="imperial";
function getWeather(numInput) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${numInput}&,=usa&appid=${appidCode}&units=${metricUnit}`
  )
    .then(response => response.json())
    .then(responseJson => displayWeatherResults(responseJson))
    .catch(error=>alert(error));

}

function displayWeatherResults(responseJson) {
  
  console.log(responseJson);
  $(".weatherResults").append(`
           <p>${responseJson.name}</p>
           <p>${responseJson.weather[0].description}</p>
           <p>${responseJson.main.temp}<br>F</p>
           `);
}



function zipForm() {
  $('.zip-Info').submit(event => {
    event.preventDefault();
    let userNumInput = $("#zip-num").val();
    //This will put the userNumInput to getWeather
    getWeather(userNumInput);
  });
}




//-----------------Quote Function---------------------------------------//
function getQuotes() {
  fetch(`https://type.fit/api/quotes`)
    .then(response => response.json())
    .then(responseJson => displayQuoteResults(responseJson))
    .catch(error => console.log(error));
}

function displayQuoteResults(responseJson) {
  console.log(responseJson);
  for (let i = 0; i < responseJson.length; i++) {
    //console.log(i);
    let output = responseJson[i];
    //console.log(output);
    $(".quoteResults").append(`
          <p>${output.text[0]}</p>
          <p>${output.author}</p>
           `);
  }
}

//---------------------pomodora Interval Timer------------------------//



// let minutes="";

let stopButton = false;
let seconds = 00;
let minutes_interval;
let seconds_interval;
let click = new Audio("bell.mp3");
let started= false //pause is off
let pauseTimer_interval = false;


function templates(){
  $("#minutes").html(leadingZero(minutes));
  $("#seconds").html(leadingZero(seconds));
}


function handleClicks(){
  templates(); 

  $('#pomodoro-start').on('click', ()=>{ 
    if (started===false && stopButton ===true){
      restartClock();
      console.log("restart");
  
    }else if (started ===false && stopButton === false){
      startClock();
    click.play();
    }
})

$('#pomodoro-pause').on('click', function() { 
    console.log("pomodoro-pause clicker");
    pauseTimer_interval = true;
    console.log(" pauseTimer_interval = true");
    pauseTimer();
  })

$('#pomodoro-stop').on('click', function() { 
    console.log("pomodoro-stop clicker");
    stopClock();
})
};




//start of the click after the click
function startClock(){
 
 console.log(minutesTimer);
  
minutes_interval = setInterval(minutesTimer, 60000);
seconds_interval = setInterval(secondsTimer, 1000);
$("#minutes").html(leadingZero(minutes));//print the minutes
  $("#seconds").html(leadingZero(seconds));//print the seconds
started =true;
};


function minutesTimer(){
    minutes = minutes - 1; 
    $("#minutes").html(leadingZero(minutes));

  
}
function secondsTimer(){
  seconds = seconds - 1; 
  $("#seconds").html(leadingZero(seconds));
  if (seconds<=0){
    minutes = minutes -1;
    $("#minutes").html(leadingZero(minutes));//print the minutes
    seconds=59;//when countdown is complete to 0 it will turn it back to 60
    
    $("#seconds").html(leadingZero(seconds));
  }
  if (minutes <=0){
    seconds=0;
    $("#seconds").html(leadingZero(seconds));
    minutes=0;
    $("#minutes").html(leadingZero(minutes));
    
    clearInterval(seconds_interval);
    clearInterval(minutes_interval);
    // breakTimer();//function for break timer
  }
 }



// function breakTimer(){
//   minutes = 5;
//   seconds = 9;
//   $("#minutes").html(minutes);//print the minutes
//   $("#seconds").html(seconds);//print the seconds
// }

function pauseTimer(){
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    console.log(minutes_interval);
    console.log(minutes);  
    console.log(seconds); 
    started = false;
    stopButton = false;
   
}

 


function restartClock(){
console.log(storeButton);

};
 
 
  
  



function stopClock() {
  clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    $("#minutes").html(leadingZero(00));
    $("#seconds").html(leadingZero(00));
  
    started = false;
    stopButton = true;
    
    
    
  
}

function leadingZero(n){
  if (n < 10 && n >= 0)
      return '0' + n;
  else
      return n;
};



//--------------------start----------------//
$(handleClicks());//for interval timer
$(zipForm());//for weather api
$(hideDiv());

