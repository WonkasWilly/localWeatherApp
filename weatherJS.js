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
               console.log('This is the API this project is using:' + 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=89110c6d8ecedeaf507af6708c1cac08');
               switch(weatherDesc){
                   case 'Snow':
                       insertIcon('day-snow');
                       break;

                   case 'Clouds':
                       console.log('clouds');
                       insertIcon('day-cloudy');
                       break;

                   case 'Thunderstorm':
                       insertIcon('day-thunderstorm');
                       break;

                   case 'Clear':
                       insertIcon('day-sunny');
                       break;

                   case 'Rain':
                       insertIcon('day-rain');
                       break;

                   case 'Drizzle':
                       insertIcon('wi-sprinkle');
                       break;
               }
           }
       });
   }

   function error () {
       alert('Sorry, it looks like something went wrong!');
   }

   function insertIcon (icon) {
       $('div.weather-icon').html("<i class='wi wi-" + icon + "'></i>");
   }

   function toCelc() {
        var fahrenToCelc = Math.round(($('.temp').text() - 32) * 5/9);
        $('.temp').text(fahrenToCelc).append("<i class='wi wi-celsius'></i>");
    }

    function toFahren() {
       var celcToFahren = Math.round($('.temp').text() * 9/5 + 32);
       $('.temp').text(celcToFahren).append("<i class='wi wi-fahrenheit'></i>");
    }

    function randomNum (min, max) {
       min = Math.ceil(min);
       max = Math.floor(max);
       return Math.floor(Math.random() * (max - min));
    }

    function updateTransition () {
       var currentClass = document.querySelector('body.b1');

       if (currentClass) {
           currentClass.className = 'b2';
           randomImage();
       }
       else {
           currentClass = document.querySelector('body.b2');
           currentClass.className = 'b1';
           randomImage();
       }
       return currentClass;
    }

    function randomImage() {
        var allImages =  [
            'https://i.imgur.com/bLxcjh3.png',
            'https://i.imgur.com/i8viCPK.png',
            'https://i.imgur.com/SYY2mJz.png',
            'https://i.imgur.com/qlgoLVk.png',
            'https://i.imgur.com/UZWkzL5.png',
            'https://i.imgur.com/8K6mZ1j.png',
            'https://i.imgur.com/h2DlPU1.png',
            'https://i.imgur.com/xChy58V.png',
            'https://i.imgur.com/3TkFymp.png',
            'https://i.imgur.com/GqfEdJC.png',
            'https://i.imgur.com/FUAY5i8.png',
            'https://i.imgur.com/6y5DJ0E.jpg',
            'https://i.imgur.com/qBoO5S9.png',
            'https://i.imgur.com/XzIV8Qk.png',
            'https://i.imgur.com/F3PkBNT.png',
            'https://i.imgur.com/XNVVvnx.jpg'
        ];
        var randomURL = allImages[randomNum(0, allImages.length)];
        $('body.b1').css({
                "background": "url(" + randomURL + ")",
                "background-repeat": "no-repeat",
                "background-size": "cover",
                "transition": "background-image 2s",
                "-webkit-transition": "background-image 2s"
        });

        $('body.b2').css({
            "background": "url(" + randomURL + ")",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "transition": "background-image 2s",
            "-webkit-transition": "background-image 2s"
        });

    };
    // -----------------------------------------------------------------Code Starts here-------------------------------------------------------------------------

    var currentUnit = 'Fahrenheit';


   $('#weather-button').click(function(){
       navigator.geolocation.getCurrentPosition(success, error);
       updateTransition();
   });

   $('.temp').click(function() {
       if (currentUnit === 'Fahrenheit') {
          toCelc();
           currentUnit = 'Celsius';
       }
       else {
           toFahren();
           currentUnit = 'Fahrenheit';
       }
   });

});
