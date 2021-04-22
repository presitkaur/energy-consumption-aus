// !-- // create our base map -->
var mapboxAccessToken = API_KEY;
var map = L.map('map').setView([25.2744, 133.7751], 5);

// <!-- // create a function to resize the map for small screens -->
reZoomMap(); 

window.addEventListener("resize", function() {
    reZoomMap();
});

function reZoomMap() {
    var x = window.innerWidth || this.document.documentElement.clientWidth;

    if(x >= 600 && x <= 1000) {
        map.setView([25.2744, 133.7751]);
    } else if(x < 600) {
        map.setView([25.2744, 133.7751]);
    } else {
        map.setView([25.2744, 133.7751]);
    }
}

// <!-- // add light tile layer -->
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    // <!-- attribution: " Bootcamp" -->
}).addTo(map);

// <!-- //  add states data to the map -->
L.geoJson(statesData).addTo(map);

// <!-- //  assign our data route to a variable -->
var data_url = "/recources/energy_final";

// <!-- // grab the data with d3 -->
d3.json(data_url, function(data){

    // <!-- // loop through our data and join with states data -->
    for(var i = 0; i < data.location.length; i++) {
        for(var j = 0; j < data.location.length; j++) {
            if(data.location[i] === statesData.features[j].properties.name) {
                statesData.features[j].properties.industry = data.industry[i];
                statesData.features[j].properties.fuels_consumed = data.fuels_consumed[i];
                statesData.features[j].properties.value = data.value[i];
                
            }
        }
    };

    // <!-- // grab energy difference min and max values to create the color scale -->
    var min = Math.min.apply(null, data.value);
    var max = Math.max.apply(null, data.value);

    console.log('min, max:', min, max);

    // <!-- // create function that assign colors -->
    function getColor(d) {
        return d < 0  ? "#e5f5e0":
               d < 10 ? "#c7e9c0":
               d < 50 ? "#a1d99b":
               d < 80 ? "#74c476":
               d < 100 ? "#41ab5d":
               d < 1000 ? "#238b45":
               d < 2000 ? "#006d2c":
                              " #00441b"                                   
    }     


    // <!-- // create style function  -->
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.fuels_consumed),
            weight: 2,
            opacity: 0.8,
            color: 'gray',
            fillOpacity: 0.7
        };
    }
    
    // <!-- //  add styles to our map -->
    L.geoJson(statesData, { style: style }).addTo(map);
// <!--  -->
    // <!-- //  add the legend to the map -->
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        // <!-- // create a div for the legend -->
        // var div = L.DomUtil.create('div', 'info legend');
        //     div.innerHTML += "<p>Energy Difference (Gwhs millions)</p>";
            grades = [ 0, 20 ,40, 60, 80, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000]
        //     labels = [];
            grades1 = ["<0", "0-1", "1-5", "5-10", "10-20", "20-30", "30-40", "40+"]

        
    //  <!-- // loop through our density intervals and generate a label with a colored square for each interval  -->
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + 
                grades1[i] + '<br>' ;
        }        
        return div;
    };
    legend.addTo(map);
    
    // <!-- // add mouseover event for each feature to style and show popup -->
    function onEachFeature(feature, layer) {
        layer.on('mouseover', function(e) {
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 1
            });
        
         
            layer.openPopup();
        }).on('mouseout', function(e) {
            geojson.resetStyle(e.target);
            layer.closePopup();
        });
        
        // <!-- // create the popup variable -->
        var popupHtml = "<h5>" + (feature.properties.name) + "</h5>" + 
        "<p><strong> Energy Australia: </strong>" + feature.properties.fuels_consumed + "</p>" + 
        // "<p><strong>Total Consumed Energy: </strong>" + (feature.properties.total_energy_consumed_gwh) + "</p>" + 
        "<p><strong>Energy Industry: </strong>" + (feature.properties.industry) + "</p>" +
        "<p><strong>Consumed Energy Value: </strong>" + (feature.properties.value) + "</p>";

        // <!-- // add the popup to the map and set location -->
        layer.bindPopup(popupHtml, { className: 'popup', 'offset': L.point(0, -20) });
    }

    // <!-- //  add the style and onEachFeature function to the map -->
    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

});