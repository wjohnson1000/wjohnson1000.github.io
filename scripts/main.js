$(document).ready(function(){
// if(jQuery){
//   alert('loaded');
// }
// var alchemyAPIquery = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=" + selectedTopic + "&return=enriched.url.url,enriched.url.title&apikey=884243d26352312be01ce6cfcfb5cf276e9000a2";
var testTrends = [
  "trend1trend1trend1trend1trend1trend1", "trend2", "trend3", "trend4", "trend5", "trend6"
]
// https://github.com/jublonet/codebird-js
  var cb = new Codebird;
  cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAK97igAAAAAAL6M3uxb0OEWglYZcJpxq89e46zY%3Dt682yccM1IgilC04xfWysYugpZ2ZzmaLpIcvNTB9L6xhdjaAXC");
  // I created this CORS proxy using the codebird cors proxy source https://github.com/jublonet/codebird-cors-proxy/
  // If you comment out this line, it will use the default proxy created by the codebird author https://api.jublo.net/codebird/
  cb.setProxy('https://codebird-proxy.herokuapp.com/');
  //https://github.com/jublonet/codebird-js#requests-with-app-only-auth
  //https://github.com/jublonet/codebird-js#mapping-api-methods-to-codebird-function-calls
  // var twitterName = document.getElementsById('twitter-seacrh').val();
  var params = {
    id:  1
    };

  var $trendContainers = $('.trend');
      // $trendContainers.each(function(i){
      //   $(this).append("<p>"+ testTrends[i] +"</p>")
      // })
  cb.__call(
      "trends_place",
      params,
      function (data, rate, err) {
          $trendContainers.each(function(i){
            $(this).append("<p>" + data[0].trends[i].name + "</p>")
            $(this).addClass(data[0].trends[i].name)
          })
      },
      true // this parameter required
  );

  // function getNews(newsTopic, trendClicked){-REAL STUFF
  function getNews(alchemyAPIquery, newsTopic){
    $.ajax(alchemyAPIquery)
      .done(function(data) {
      alert("success");
        // console.log(data.result.docs[0].source.enriched.url.title);
        // console.log(data.result.docs[0].source.enriched.url.url);
        var articleTitle = data.result.docs[0].source.enriched.url.title;
        var articleURL = data.result.docs[0].source.enriched.url.url;
        var appendP = $("<a href=" + articleURL + ">" + articleTitle + "</a>");
        $("." + newsTopic).append(appendP);

    })
      .fail(function() {
        alert("error");
    })
  }
//could add a 2nd arg to "getNews" that would pass the class where there was a click
//this would include the DOM manipulation in the ajax request
//could add classes based on trends above, or just do 1-6

  $trendContainers.on("click", "p", function(){
    var newsTopic = $(this).text();
    var alchemyAPIquery = "https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&q.enriched.url.enrichedTitle.keywords.keyword.text=" + newsTopic + "&return=enriched.url.url,enriched.url.title&apikey=884243d26352312be01ce6cfcfb5cf276e9000a2";
    getNews(alchemyAPIquery, newsTopic);
    // console.log($(this).text());
  })

})
