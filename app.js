// Search term
$("#submitButton").on("click", function () {
    // console.log("hello");
    event.preventDefault();
    var searchBox = $("#searchBox").val();
    var resultsNo = $("#results").val();
    var startYear = $("#start-year").val();
    var endYear = $("#end-year").val();

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "dDsmJxErd2ioucRXFJIRQsDrY9XdlAZ2",
        'q': searchBox,
        'begin_date': startYear + "0101",
        'end_date': endYear + "1231"
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (result) {
        console.log(result);
        if (result.response.meta.hits == 0 ) {
            console.log("No articles found!");
            $("#result").append("<h3> No articles found! Please expand your search parameters.</h3>");
        }

        var response = result.response.docs;

        for (var i = 0; i < resultsNo; i++) {
            var articleDiv = $("<div>");

            var headline = response[i].headline.main;
            var snippet = response[i].snippet;
            var pubDate = response[i].pub_date;
            var url = response[i].web_url;

            var h3 = $("<h3>").text(headline);
            var p1 = $("<p>").text(snippet);
            var p2 = $("<p>").text(pubDate);
            var p3 = $("<a href=>").text(url);

            articleDiv.append(h3);
            articleDiv.append(p1);
            articleDiv.append(p2);
            articleDiv.append(p3);

            $("#result").append(articleDiv);
        }

    }).fail(function (err) {
        throw err;
    });
});

$("#clearButton").on("click", function () {
    $("#response").empty();
});