$(function() {
   function success (position) {

       var lat = position.coords.latitude;
       var long = position.coords.longitude;

       $.ajax({
           cache: false,
           url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=89110c6d8ecedeaf507af6708c1cac08',
           success: function(data) {
               var kelvinTemp = data.main.temp;
               var kelvinToFaren = Math.round(kelvinTemp * 9/5 - 459.67);
               var weatherDesc = data.weather[0].main;
               var location = data.name;
               var farhen = '<i class="wi wi-fahrenheit"></i>';
               var celc = '<i class="wi wi-celsius"></i>';
               $('.temp').css({"font-size": "6em"});
               $('#location').text(location);
               $('#weather-desc').text(weatherDesc);
               $('.temp').text(kelvinToFaren).append(farhen);
           }


       });
   }

   function error () {
       alert('Sorry, it looks like something went wrong!');
   }

   function toCelc() {
        var fahrenToCelc = ($('.temp').text() - 32) * 5/9;
        $('.temp').text(fahrenToCelc).append("<i class='wi wi-celsius'></i>");
    }
    function toFahren() {
       var celcToFahren = $('.temp').text * 9/5 + 32;

    }

    var currentUnit = 'Fahrenheit';
   $('#weather-button').click(function(){
       navigator.geolocation.getCurrentPosition(success, error);
   });
   $('.temp').click(function() {
       if (currentUnit === 'Fahrenheit') {
           toCelc();
       }
       else {
           toFahren();
           currentUnit = 'Celcius';
       }

   });

});
