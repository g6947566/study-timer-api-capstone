function getWeather(numInput) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${numInput}&,=usa&appid=4c2c8c79b7c3a9598be47c0b836bfd42`)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
        .catch(error =>console.log(error));
    
}   

function getQuotes() {
        fetch(`https://type.fit/api/quotes`)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
        .catch(error =>console.log(error));
    
}   


// $(getWeather('07650'));
$(getQuotes());