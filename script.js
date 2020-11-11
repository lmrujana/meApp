//This function generates a quote
function quoteGenerator() {
  $.ajax({
    url: "https://type.fit/api/quotes",
    method: "GET",
  }).then(function (response) {
    var quotesArray = JSON.parse(response);
    var randomQuote =
      quotesArray[Math.floor(Math.random() * quotesArray.length)];
    var quoteBody = $("<p>");
    var quoteAuthor = $("<small>");
    quoteBody.text(randomQuote.text);
    quoteBody.addClass("has-text-weight-bold is-size-3");
    quoteAuthor.text(randomQuote.author);
    quoteAuthor.addClass("is-pulled-right");
    $("#quote-container").append(quoteBody);
    $("#quote-container").append(quoteAuthor);
  });
}

// This Function asks the User if we can use current location and runs the showPosition function which gets the LAT and LON var

function getLocation() {
  navigator.geolocation;
  {
    navigator.geolocation.getCurrentPosition(showPosition);

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
              var cityName = $("<p>")
              cityName.addClass("title is-5");
              cityName.text(response.name);
              var cityTemp = Math.floor(response.main.temp)
              var cityHumidity = response.main.humidity
              var clouds = response.weather[0].icon;
              var iconURL = "http://openweathermap.org/img/w/" + clouds + ".png"
              var weatherImage = $("<img>").attr("src", iconURL);
              var sunrise = new Date(response.sys.sunrise * 1000)
              var sunset = new Date(response.sys.sunset * 1000);
              $('#weather-container').prepend(cityName);
              $('#weather-container').append("<br>Temp(F): " + cityTemp + "&deg");
              $('#weather-container').append("<br>Humidity: " + cityHumidity + "%");
              $("#weather-container").append("<br>Sunrise: " + sunrise.toLocaleTimeString("en-us"));
              $("#weather-container").append("<br>Sunset: " + sunset.toLocaleTimeString("en-us"));
              $('#image').append(weatherImage);
          })

  }
}
function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=816992ff6a89882120cc71140b076bef&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var cityName = $("<p>");
    cityName.addClass("title is-4");
    cityName.text(response.name);
    var cityTemp = Math.floor(response.main.temp);
    var cityHumidity = response.main.humidity;
    var clouds = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + clouds + ".png";
    var weatherImage = $("<img>").attr("src", iconURL);
    var sunrise = new Date(response.sys.sunrise * 1000);
    var sunset = new Date(response.sys.sunset * 1000);
    $("#weather-container").prepend(cityName);
    $("#weather-container").append("<br>Temp(F): " + cityTemp + "&deg");
    $("#weather-container").append("<br>Humidity: " + cityHumidity + "%");
    $("#weather-container").append(
      "<br>Sunrise: " + sunrise.toLocaleTimeString("en-us")
    );
    $("#weather-container").append(
      "<br>Sunset: " + sunset.toLocaleTimeString("en-us")
    );
    $("#image").append(weatherImage);
  });
}

getLocation();
quoteGenerator();

//NY Times API

var section = "home";

function articleSearch() {
  var key = "2MlxruKUsf94PqwoSGi3oOM3YvCl1Gab";
  var queryURL =
    "https://api.nytimes.com/svc/topstories/v2/" +
    section +
    ".json?api-key=" +
    key;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(createArticles);
}

function createArticles(NyTData) {
  clearCardContainer();

  let artQty = 10;

  for (let i = 0; i < artQty; i++) {
    let url = NyTData.results[i].url;

    let thumbnail = NyTData.results[i].multimedia[1].url;
    let thumbnailAlt = NyTData.results[i].multimedia[1].caption;
    let title = NyTData.results[i].title;
    let section = NyTData.results[i].section;
    let subsection = NyTData.results[i].subsection;

    let link = $("<a>");
    link.attr("href", url);
    link.attr("target", "blank");

    let card = $("<div>");
    card.attr("id", "generated-cards");
    card.addClass("card");

    let cardContent = $("<div>");
    cardContent.addClass("card-content");

    let media = $("<div>");
    media.addClass("media");

    let mediaLeft = $("<div>");
    mediaLeft.addClass("media-left");

    let figure = $("<figure>");
    figure.addClass("image is-48x48");

    let img = $("<img>");
    img.attr("src", thumbnail);
    img.attr("alt", thumbnailAlt);
    img.attr("id", "thumbnail");

    let mediaContent = $("<div>");
    mediaContent.addClass("media-content");

    let genTitle = $("<p>");
    genTitle.addClass("title is-4");
    genTitle.text(title);

    let genSubTitle = $("<p>");
    genSubTitle.addClass("subtitle is-6");
    genSubTitle.text("Section: ");

    let sectionValue = $("<span>");
    sectionValue.text(section + ", ");

    let subSectionValue = $("<span>");
    subSectionValue.text(subsection);

    link.append(card);
    card.append(cardContent);
    cardContent.append(media);
    media.append(mediaLeft);
    mediaLeft.append(figure);
    figure.append(img);
    media.append(mediaContent);
    mediaContent.append(genTitle);
    genSubTitle.append(sectionValue);
    genSubTitle.append(subSectionValue);
    mediaContent.append(genSubTitle);
    $("#articlesContainer").append(link);

    if (i + 1 == artQty) {
      $("#articlesContainer").addClass("fade-in");
      $("#articlesContainer").css({ display: "block" });
    }
  }
}

function clearCardContainer() {
  $("#articlesContainer").empty();
}

articleSearch();

$(".nyArticles").on("click", function () {
  $("#articlesContainer").css({ display: "none" });
  $(".nyArticles").removeAttr("id");
  $(this).attr("id", "clicked");
  section = this.dataset.section;
  console.log(this.dataset.section);
  articleSearch();
});

// Adding Date and Time element to header
function timeCheck() {
  var timeUTC = new Date();
  $("#date").append(timeUTC.toLocaleDateString("en-US"));
  $("#time").append(timeUTC.toLocaleTimeString("en-US"));
}
timeCheck();
