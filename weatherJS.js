function getWeather() {
    var lat = '';
    var long = '';
    function success(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat);
    }
    function error () {
        alert('Something went wrong and we were unable to get your location.');
    }

    navigator.geolocation.getCurrentPosition(success, error);
    console.log(lat);


}

