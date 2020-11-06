
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
        quoteBody.addClass('uk-text-bold');
        quoteAuthor.text(randomQuote.author);
        // $('#quote-container').append(quoteBody);
        // $('#quote-container').append(quoteAuthor);
    })
}