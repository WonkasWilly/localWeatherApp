$(function() {
   function success (position) {
       console.log('GPS coordinates');
       var lat = position.coords.latitude;
       var long = position.coords.longitude;
       console.log('Lat: ' + lat);
       console.log('Long: ' + long);
   }
   function error () {
       alert('Something went wrong.');
   }
   navigator.geolocation.getCurrentPosition(success, error);
});
