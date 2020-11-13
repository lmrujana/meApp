
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
hideWeather ();

function hideWeather (){

    $("#weather-container").hide();
};
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
            //   cityName.addClass("title is-3");
            
              cityName = response.name;
              var cityTemp = Math.floor(response.main.temp)
              var cityHumidity = response.main.humidity
              var clouds = response.weather[0].icon;
              var iconURL = "http://openweathermap.org/img/w/" + clouds + ".png"
              var weatherImage = $("<img>").attr("src", iconURL);
              var sunrise = new Date(response.sys.sunrise * 1000)
              var sunset = new Date(response.sys.sunset * 1000);
              var date = new Date();
              var month = date.getMonth()+1;
              var day = date.getDate();    
              var weekday = new Array(7);
              weekday[0] = "SUN";
              weekday[1] = "MON";
              weekday[2] = "TUE";
              weekday[3] = "WED";
              weekday[4] = "THU";
              weekday[5] = "FRI";
              weekday[6] = "SAT";
              var m = weekday[date.getDay()]        
              $('#image').append(weatherImage);
              $("#cityName").append("City of " + cityName)
              $("#cityName2").append("City of " + cityName)
              $("#temp").append(" " + cityTemp)
              $("#humidity").append(" " + cityHumidity + "%")
              $("#sunrise").append(" " + sunrise.toLocaleTimeString("en-us"))
              $("#sunset").append(" " + sunset.toLocaleTimeString("en-us"))
              $("#today").append("<strong>" + month + "/" + day + "<br>" + m)
                
              $("#weather-container").show();
              $("#weather-container").addClass("fade-in");

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=816992ff6a89882120cc71140b076bef&units=imperial"
            $.ajax({
                url: forecastURL,
                method: "GET"
                }).then(function(response2) {
                    console.log(response2)
                    var cityTemp2 = Math.floor(response2.list[6].main.temp);
                    var cityHumidity2 = response2.list[6].main.humidity;
                    var clouds2 = response2.list[6].weather[0].icon;
                    var iconURL2 = "http://openweathermap.org/img/w/" + clouds2 + ".png"
                    var weatherImage2 = $("<img>").attr("src", iconURL2);
                    var pop2 = response2.list[6].pop * 100;
                    var date2 = new Date();
                    var month2 = date2.getMonth()+1;
                    var day2 = date2.getDate() + 1;
                    var weekday = new Array(7);
                    weekday[0] = "MON";
                    weekday[1] = "TUE";
                    weekday[2] = "WED";
                    weekday[3] = "THU";
                    weekday[4] = "FRI";
                    weekday[5] = "SAT";
                    weekday[6] = "SUN";
                    var n = weekday[date2.getDay()]
                    $("#temp2").append(" " + cityTemp2);
                    $("#humidity2").append(" " + cityHumidity2 + "%")
                    $('#image2').append(weatherImage2)
                    $("#pop").append(" " + pop2)
                    $("#tomorrow").append("<strong>" + month2 + "/" + day2 + "<br>" +  n)
                })
          })
  }

    getLocation(); 
    quoteGenerator();


//NY Times API

var section = "home"

function articleSearch (){

    var key = "2MlxruKUsf94PqwoSGi3oOM3YvCl1Gab"  
    var queryURL = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=" + key;
                  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(createArticles);

    };

function createArticles (NyTData){

        clearCardContainer();

        let artQty = 10
      
        for (let i = 0; i < artQty; i++){

        let url = NyTData.results[i].url;
   
        let thumbnail = "";
        let thumbnailAlt = "";

        if (NyTData.results[i].multimedia){
            thumbnail = NyTData.results[i].multimedia[1].url;
            thumbnailAlt = NyTData.results[i].multimedia[1].caption;
        } else {
            thumbnail = "https://bulma.io/images/placeholders/96x96.png"
            thumbnailAlt = "thumbnail"
        };

        let title = NyTData.results[i].title;
        let section = NyTData.results[i].section;
        let subsection = NyTData.results[i].subsection;

        let link = $("<a>");
        link.attr("href", url);
        link.attr("target", "blank");

        let card = $("<div>");
        card.attr("id","generated-cards");
        card.addClass("card");

        let cardContent = $("<div>");
        cardContent.addClass("card-content");

        let media = $("<div>");
        media.addClass("media");

        let mediaLeft = $("<div>");
        mediaLeft.addClass("media-left");

        let figure = $("<figure>");
        figure.addClass("image is-48x48")

        let img = $("<img>");
        img.attr("src",thumbnail);
        img.attr("alt",thumbnailAlt);
        img.attr("id","thumbnail");

        let mediaContent = $("<div>");
        mediaContent.addClass("media-content");

        let genTitle = $("<p>");
        genTitle.addClass("title is-4");
        genTitle.text(title);

        let genSubTitle = $("<p>");
        genSubTitle.addClass("subtitle is-6");
        genSubTitle.text("Section: ")

        let sectionValue = $("<span>");
        sectionValue.text(section + ", ")

        let subSectionValue = $("<span>");
        subSectionValue.text(subsection);

        link.append(card);
        card.append(cardContent);
        cardContent.append(media);
        media.append(mediaLeft);
        mediaLeft.append(figure);
        figure.append(img);
        media.append(mediaContent);
        mediaContent.append(genTitle)
        genSubTitle.append(sectionValue);
        genSubTitle.append(subSectionValue);
        mediaContent.append(genSubTitle);
        $("#articlesContainer").append(link);
        
        if(i+1 == artQty){
            
            $("#articlesContainer").addClass("fade-in");
            $("#articlesContainer").css({ display: "block" });
        };
        };
        $("#generated-cards.card").parent().each(function(){
                   
            var faveBtn = $("<h1 class='readLaterBtn button is-primary is-small' style='left:80%; bottom: 35px; border-radius: 5px; text-align: center;'>Read<br>Later</h1>");
            $(this).after(faveBtn);
        })
    
        $(".readLaterBtn").on("click", function(){
               
            var faveArtText = $(this).prev().text();
            var faveArtLink = $(this).prev().attr('href');
            
            var artNumber = localStorage.length;
            var myArtKey = "article" + artNumber;
    
            var myLinkKey = "link" + artNumber;
            
            localStorage[myArtKey] = faveArtText;
            localStorage[myLinkKey] = faveArtLink;
            console.log("working")
        })
        
    };

function clearCardContainer() {

    $("#articlesContainer").empty();
};

articleSearch ();

$(".nyArticles").on("click", function(){

    $("#articlesContainer").css({ display: "none" });
    $(".nyArticles").removeAttr("id");
    $(this).attr("id","clicked");
    section = this.dataset.section;
    console.log(this.dataset.section)
    articleSearch ();

});

    // Adding Date and Time element to header
    function timeCheck() {
        var timeUTC = new Date();
        $("#date").append(timeUTC.toLocaleDateString("en-US"))
        $("#time").append(timeUTC.toLocaleTimeString("en-US"));
        }
        timeCheck ();


//This code controls the behavior of the Notes section
displaySavedNotes();

var savedNotes;
if (localStorage.getItem('savedNotes')) {
    savedNotes = JSON.parse(localStorage.getItem('savedNotes'));
} else {
    savedNotes = [];
}

$('#save-button').on('click', function (event) {
    event.preventDefault();
    var newNote = $('#text-area').val().trim();
    // console.log(newNote);
    if (newNote) {
        $('#saved-notes').css('display', 'block');
        var newElementBox = $('<div>').addClass('box')
        var newElementNote = $('<p>').text(newNote);
        newElementNote.addClass('block');
        newElementBox.append(newElementNote);
        $('#saved-notes').append(newElementBox);
        savedNotes.push(newNote);
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
        $('#text-area').val('');
    };
});

$('#delete-button').on('click', function(event){
    event.preventDefault();
    $('#saved-notes div').first().remove();
    savedNotes.shift();
    if(savedNotes.length){
        localStorage.setItem('savedNotes',JSON.stringify(savedNotes));
    }else{
        localStorage.removeItem('savedNotes');
        $('#saved-notes').css('display', 'none');
    }
    
});

function displaySavedNotes() {
    if (localStorage.getItem('savedNotes')) {
        $('#saved-notes').css('display', 'block');
        savedNotesArray = JSON.parse(localStorage.getItem('savedNotes'))
        savedNotesArray.forEach(function (note) {
            var newElementBox = $('<div>').addClass('box')
            var newElementNote = $('<p>').text(note);
            newElementNote.addClass('block');
            newElementBox.append(newElementNote)
            $('#saved-notes').append(newElementBox);
        })
    };
}