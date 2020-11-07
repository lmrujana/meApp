
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
quoteGenerator();