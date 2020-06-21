function getWeather(numInput) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${numInput}&,=usa&appid=4c2c8c79b7c3a9598be47c0b836bfd42`)
        .then(response => response.json())
        .then(responseJson => displayWeatherResults(responseJson))
        .catch(error =>console.log(error));  
}   

function displayWeatherResults(responseJson) {
        console.log(responseJson);
        $('.weatherResults').append(`
           <p>${responseJson.name}</p>
           <p>${responseJson.weather[0].description}</p>
           `);
    }

function getQuotes() {
        fetch(`https://type.fit/api/quotes`)
        .then(response => response.json())
        .then(responseJson => displayQuoteResults(responseJson))
        .catch(error =>console.log(error));
    
}   

function displayQuoteResults(responseJson) {
        console.log(responseJson);
      for (let i = 0; i <responseJson.length; i++){
        //console.log(i);
        let output = responseJson[i];
        //console.log(output);
        $('.quoteResults').append(`
          <p>${output.text}</p>
          <p>${output.author}</p>
           `);
        }
    }

 $(getWeather('07650'));
 //$(getQuotes());