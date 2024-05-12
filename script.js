let map;


    // container pegar imagem satelite

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -23.553253173828125, lng: -46.816287994384766 },
        zoom: 14,
        mapTypeId: 'satellite' 
    });
}

function searchPlace() {
    const input = document.getElementById("place-input").value;
    const request = {
        query: input,
        fields: ["name", "geometry"],
    };


    // Carregar a imagem de fundo

    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(14); 
            loadBackgroundImage(results[0].geometry.location);
        } else {
            alert("Place not found");
        }
    });
}



function loadBackgroundImage(location) {
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view-container"),
        {
            position: location,
            pov: { heading: 165, pitch: 0 },
            zoom: 1,
        }
    );
    map.setStreetView(panorama);
}



 //tecla enter ficar funcional


document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("place-input");

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            searchPlace();
        }
    });
});