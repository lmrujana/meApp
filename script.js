
//This function generates a quote
function quoteGenerator() {
    $.ajax({
        url: 'https://type.fit/api/quotes',
        method: "GET"
    }).then(function (response) {
        var quotesArray = JSON.parse(response);
        var randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        var quoteBody = $('<p>');
        var quoteAuthor = $('<small>');
        quoteBody.text(randomQuote.text);
        quoteBody.addClass('has-text-weight-bold is-size-3');
        quoteAuthor.text(randomQuote.author);
        quoteAuthor.addClass('is-pulled-right');
        $('#quote-container').append(quoteBody);
        $('#quote-container').append(quoteAuthor);
    })
}

// This Function asks the User if we can use current location and runs the showPosition function which gets the LAT and LON var
    function getLocation() {
        (navigator.geolocation); {
        navigator.geolocation.getCurrentPosition(showPosition);} 
    }
    function showPosition(position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=816992ff6a89882120cc71140b076bef&units=imperial"
  
          $.ajax({
          url: queryURL,
          method: "GET"
          }).then(function(response) {
              console.log(response)
              var cityName = response.name;
              var cityTemp = Math.floor(response.main.temp)
              var cityHumidity = response.main.humidity
              var clouds = response.weather[0].icon;
              var iconURL = "http://openweathermap.org/img/w/" + clouds + ".png"
              var weatherImage = $("<img>").attr("src", iconURL);
              $('#weather-container').prepend(cityName);
              $('#weather-container').append("<br>Temp(F): " + cityTemp + "&deg");
              $('#weather-container').append("<br>Humidity: " + cityHumidity + "%");
              $('#image').append(weatherImage);
          })
  }

    getLocation(); 
    quoteGenerator();

    // Adding Date and Time element to header
    function timeCheck() {
        var timeUTC = new Date();
        $("#date").append(timeUTC.toLocaleDateString("en-US"))
        $("#time").append(timeUTC.toLocaleTimeString("en-US"));
        }
        timeCheck ();