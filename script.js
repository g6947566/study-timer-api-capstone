function getWeather(numInput) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${numInput}&,=usa&appid=4c2c8c79b7c3a9598be47c0b836bfd42`
  )
    .then(response => response.json())
    .then(responseJson => displayWeatherResults(responseJson))
    .catch(error => console.log(error));
}

function displayWeatherResults(responseJson) {
  console.log(responseJson);
  $(".weatherResults").append(`
           <p>${responseJson.name}</p>
           <p>${responseJson.weather[0].description}</p>
           `);
}

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

//pomodora Bad Study Habit
let minutes =15;
let seconds = 00;
let click = new Audio("bell.mp3");
let started= false //pause is off
let pauseTimer_interval = false;
function templates(){
  $("#minutes").html(minutes);
  $("#seconds").html(seconds);
}


function handleClicks(){
  templates();
  $('#pomodoro-start').on('click', ()=>{ 
    if (started===false){
      console.log("pomodoro-start clicker");
    click.play();
    startClock();
 
    console.log('started is false and will turn to true');
    }else{
      restartClock();
      console.log('restartClock wacko');
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
}



let minutes_interval;
let seconds_interval;
//start of the click after the click
function startClock(){
  console.log('stared is true');
  started =true;
  // minutes =5;
  // seconds = 9;
  $("#minutes").html(minutes);//print the minutes
  $("#seconds").html(seconds);//print the seconds
minutes_interval = setInterval(minutesTimer, 60000);
seconds_interval = setInterval(secondsTimer, 1000);
  console.log('startClock()');
  console.log(minutes_interval);
  console.log(seconds_interval);  
 


function minutesTimer(){
  minutes = minutes - 1; 
  $("#minutes").html(minutes);
  
}
function secondsTimer(){
  seconds = seconds - 1; 
  $("#seconds").html(seconds);
  if (seconds<=0){
    minutes = minutes -1;
  $("#minutes").html(minutes);//print the minutes
  console.log('second reached 0');
      
    console.log('seconds reset');
    seconds=5;//when countdown is complete to 0 it will turn it back to 60
    
    $("#seconds").html(seconds);
  }
  if (minutes <=0){
    console.log('minute is 0');
    seconds=0;
    $("#seconds").html(seconds);
    minutes=0;
    $("#minutes").html(minutes);
    
    clearInterval(seconds_interval);
    clearInterval(minutes_interval);
    // breakTimer();//function for break timer
  }
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
   
}

function restartClock(){
  if(minutes===0){
    minutes =5;
  seconds = 9;
    startClock();
  }else if(pauseTimer_interval===true){
    startClock();
    console.log('restart pause');
    pauseTimer_interval= false;
  }else{
    console.log(`doesn't Work`);
  }
}

function stopClock() {
  
  clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    minutes=15;
    seconds=00;
    $("#minutes").html(minutes);//print the minutes
    $("#seconds").html(seconds);//print the seconds
    started=false;
    pauseTimer_interval=false;
    console.log("started=false");
}


$(handleClicks());
// $(getWeather("07675"));
//  $(pomodoro.init());
// $(getQuotes());
