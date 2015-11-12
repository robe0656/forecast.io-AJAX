//MyWidget Script
/**************************
 Add a link for a CSS file that styles .mywidget
 Add a script tag that points to CDN version of jQuery 1.*
 Add a script tag that loads your script file from http://m.edumedia.ca/
 **************************/
var scriptsLoaded = 0;

document.addEventListener("DOMContentLoaded", function(){

  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "main.css");
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);

  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);


});

function loadCount(){
  scriptsLoaded++;
  if(scriptsLoaded === 2){
    //call the function in My widget script to load the JSON and build the widget
    buildWidget();
    console.log("both scripts loaded");
  }
}


function buildWidget(){
  //now do the ajax call then build your page
  $.ajax({
    type:"GET",
    url: "https://api.forecast.io/forecast/c53b7fcf371a7988459436cdc3d8484d/45.348391,-75.757045",
  dataType: "jsonp",

}).done(function(response){
      console.log(response)
      createTable(response);
})
}

function createTable(response){
    var x = 0;
    var weatherData = $(".weather-forecast");
    var addTable = $("<table>");
    var makeWidget = $(".mywidget");
    var newDate = new Date(1000*response.currently.time);
    var dateTwo = newDate.getHours();
    var timeCount = 24 - newDate.getHours();
    var oneTwo = response.hourly.data[x].apparentTemperature;
    console.log(oneTwo);
  
    $("<p>").text("Todays Date" +"  " + (newDate.getDay() + 1) + "  : " + (newDate.getMonth() + 1)) .appendTo(weatherData);
    $("<p>").text("Temperature" + "  " + oneTwo) .appendTo(weatherData);
    addTable .appendTo("body");
    $("<p>").text(response.hourly.data[x].summary) .appendTo(weatherData);
    
    for (x=0; x < timeCount; x++) {
        
        var addRow = $("<tr>");
        
        addRow .appendTo(addTable);
        
        $("<td>") .append(dateTwo + ":00") .appendTo(addRow);
        dateTwo++;
        $("<td>").text(response.hourly.data[x].cloudCover) .appendTo(addRow);
        
        $("<td>").text(response.hourly.data[x].windSpeed) .appendTo(addRow);
        
        $("<td>").text(response.hourly.data[x].humidity) .appendTo(addRow);
        
        $("<td>").text(oneTwo) .appendTo(addRow);
        oneTwo++;
        $("<td>").text(response.hourly.data[x].summary) .appendTo(addRow);
    }
};
    









