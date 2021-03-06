/* == GEO == */
(() => {
    options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 86400000
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateGeo, error, options);
    } else {
        $.getJSON("http://freegeoip.net/json/", function(data) {
            updateGeo({
                coords: {
                    latitude: data.latitude,
                    longitude: data.longitude
                }
            });
        });
    }

    function updateGeo(position) {
        socket.emit('geo.update', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    }

    function error(err) {
        $.getJSON("http://freegeoip.net/json/", function(data) {
            updateGeo({
                coords: {
                    latitude: data.latitude,
                    longitude: data.longitude
                }
            });
        });
    }
})();