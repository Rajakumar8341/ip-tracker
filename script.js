const apiKey = "at_HcUY0UEXYZhKvJc4sg6B8dtlxMKtP";
const api = `https://geo.ipify.org/api/v2/country,city?apiKey=`;

const searchBox = document.querySelector(".ipAddress");
const searchButton = document.querySelector(".clickSearch");

async function checkIpAddress(url) {
  var response;
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(url)) {
    response = await fetch(api + apiKey + `&ipAddress=${url}`);
  } else {
    response = await fetch(api + apiKey + `&domain=${url}`);
  }

  if (response.status == 404) {
    console.log(err);
  } else {
    var data = await response.json();

    console.log(data);
    document.querySelector(".ip").innerHTML = data.ip;
    document.querySelector(".location").innerHTML = data.location.country;
    document.querySelector(".timezone").innerHTML =
      "UTC" + data.location.timezone;
    document.querySelector(".isp").innerHTML = data.isp;

    buildMap(data.location.lat, data.location.lng);
    // latlng[0] = data.location.lat;
    // latlng[1] = data.location.lng;
  }
}

function buildMap(lat, lon) {
  document.getElementById("weathermap").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";
  var osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    osmAttribution =
      'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
      ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttribution,
    });
  var map = new L.Map("map");
  map.setView(new L.LatLng(lat, lon), 9);
  var marker = L.marker([lat, lon]).addTo(map);
  map.addLayer(osmLayer);
  var validatorsLayer = new OsmJs.Weather.LeafletLayer({ lang: "en" });
  map.addLayer(validatorsLayer);
}

searchButton.addEventListener("click", () => {
  checkIpAddress(searchBox.value);
});
searchButton.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    checkIpAddress(searchBox.value);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  checkIpAddress(""); // Call the async function
});
