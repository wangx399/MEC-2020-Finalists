var currCountry;
var allData_source;
var allData_trackcorona;
const test_data_url = 'https://raw.githubusercontent.com/wangx399/Testing/main/testing.txt'

$(() => {
  updateData();

  setInterval(updateData, 30000);    // update per 30s
});

updateData = function() {
  retrieveData(test_data_url,
    data => {
      allData_source = parseSourceData(data);
      console.log(allData_source)
    },
    xhr => {
      console.log(xhr);
    }
  )

  retrieveData('http://api.ipstack.com/check?access_key=c6bf7e7a9c8cb4ff1d0d97ef62d1872c',
    data => {
      currCountry = data;
      console.log(currCountry);
      getTrackCorData();
    },
    xhr => {
      // Failed to obtain user location, hide the regional information section
      $("#regional-info").hide();
      getTrackCorData();
      console.log(xhr);
    }
  )

  // This function will be called after user location is determined
  getTrackCorData = function() {
    retrieveData('https://www.trackcorona.live/api/countries',
      data => {
        allData_trackcorona = parseTrackCorData(data);
        console.log(allData_trackcorona);
        showOverview();
      },
      xhr => {
        console.log(xhr);
      }
    )
  }

  // This function will be called after getTrackCorData
  showOverview = function() {
    initMap();

    // Look for the corresponding country
    var matched_country = allData_source[currCountry.country_name];
    if (matched_country === undefined) {
      matched_country = allData_trackcorona[currCountry.country_name];
      if (matched_country === undefined) {
        // Failed to obtain data for current country
        // Then hide the regional information section
        $("#from-country").hide();
      }
      else {
        // Convert TrackCov data to compatible data
        matched_country.totalCases = matched_country.confirmed;
        matched_country.newCases = undefined;
        matched_country.totalDeaths = matched_country.dead;
        matched_country.totalRecovered = matched_country.recovered;
        matched_country.activeCases = undefined;
      }
    }
    if (matched_country.totalCases === undefined) {
      matched_country.totalCases = "(no data)"
    }
    if (matched_country.newCases === undefined) {
      matched_country.newCases = "(no data)"
    }
    if (matched_country.totalDeaths === undefined) {
      matched_country.totalDeaths = "(no data)"
    }
    if (matched_country.totalRecovered === undefined) {
      matched_country.totalRecovered = "(no data)"
    }
    if (matched_country.activeCases === undefined) {
      matched_country.activeCases = "(no data)"
    }

    $("#from-country").html('Detected your location is <b>' + currCountry.country_name + '</b>. Showing the overview for it:')
    // Generate the overview for the country
    /*
    <table>
      <tr>
        <td><b>Total Cases</b>:</td>
        <td></td>
      </tr>
      <tr>
        <td><b>New Cases</b>:</td>
        <td></td>
      </tr>
      <tr>
        <td><b>Total Deaths</b>:</td>
        <td></td>
      </tr>
      <tr>
        <td><b>Total Recovered</b>:</td>
        <td></td>
      </tr>
      <tr>
        <td><b>Active Cases</b>:</td>
        <td></td>
      </tr>
    </table>
    */
    var html_str =
      '<table><tr><td><b>Total Cases</b>:</td><td>' + matched_country.totalCases + '</td></tr>' +
      '<tr><td><b>New Cases</b>:</td><td>' + matched_country.newCases + '</td></tr>' +
      '<tr><td><b>Total Deaths</b>:</td><td>' + matched_country.totalDeaths + '</td></tr>' +
      '<tr><td><b>Total Recovered</b>:</td><td>' + matched_country.totalRecovered + '</td></tr>' +
      '<tr><td><b>Active Cases</b>:</td><td>' + matched_country.activeCases + '</td></tr></table>'
    $("#regional-table").html(html_str);
    if (matched_country.activeCases === "(no data)") {
      matched_country.activeCases = 0;
    }
    if (matched_country.newCases === "(no data)") {
      matched_country.newCases = 0;
    }
    if (matched_country.activeCases + matched_country.newCases > 100) {
      $("#warning").show();
    }
    else {
      $("#warning").hide();
    }

    // Load charts
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawRankingChart);
  }

  function changeView() {
    initMap(parseInt(this.id.slice(-1)));
  }
  $('.view-button').click(changeView);

  bindEvents();
}

/**
 * Initialize/update the Google map
 * @param {Number} mode Mode to display.
 * 0 = active level; 1 = total cases; 2 = new cases; 3 = total deaths; 4 = total recovered; 5 = Active Cases
 */
function initMap(mode = 0) {
  // Create the map
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: {
      lat: 37.09,
      lng: -95.712,
    },
  });

  switch (mode) {
    case 0:
      $("#overview-desc").html("The size of red circles represents how active the virus in the countries/regions.");
      break;

    case 1:
      $("#overview-desc").html("The size of red circles represents the number of total cases in the countries/regions.");
      break;

    case 2:
      $("#overview-desc").html("The size of red circles represents the number of new cases in the countries/regions.");
      break;

    case 3:
      $("#overview-desc").html("The size of red circles represents the number of total deaths in the countries/regions.");
      break;

    case 4:
      $("#overview-desc").html("The size of red circles represents the number of total recovered in the countries/regions.");
      break;

    case 5:
      $("#overview-desc").html("The size of red circles represents the number of active cases in the countries/regions.");
      break;
  }
  
  // Draw a circle for each value in the source data
  // Virus activity formula: (new cases) * 30% + (active cases) * 70%
  for (var place in allData_source) {
    // Skip the data if no enough data is provided
    data_source = allData_source[place];
    if (data_source.activeCases === undefined || data_source.newCases === undefined) {
      continue;
    }

    // Find the corresponding data from TrackCor
    data_cor = allData_trackcorona[place];

    var circle_r;
    switch (mode) {
      case 0:
        circle_r = Math.sqrt(data_source.newCases * 0.3 + data_source.activeCases * 0.7) * 800;
        break;

      case 1:
        circle_r = Math.sqrt(data_source.totalCases) * 400;
        break;

      case 2:
        circle_r = Math.sqrt(data_source.newCases) * 5000;
        break;

      case 3:
        circle_r = Math.sqrt(data_source.totalDeaths) * 5000;
        break;

      case 4:
        circle_r = Math.sqrt(data_source.totalRecovered) * 400;
        break;

      case 5:
        circle_r = Math.sqrt(data_source.activeCases) * 800;
        break;
    }

    // Add the circle for this city to the map.
    var placeCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: "#FC0000",
      fillOpacity: 0.35,
      map: map,
      center: {lat: data_cor.latitude, lng: data_cor.longitude},
      radius: circle_r,
    });
  }
}

var alldata = []

function drawRankingChart() {
  // Sort the data
  for (var elem in allData_source) {
    alldata.push([elem, allData_source[elem]])
  }

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Country');
  data.addColumn('number', 'Risk Level');
  for (var i = 0; i < 10; i++) {
    data.addRows([
      [alldata[i][0], alldata[i][1].activeCases],
    ]);
  }
  var options = {
    title: 'Top 10 Dangerous Country/Region',
    hAxis: {
      title: 'Country',
    },
    vAxis: {
      title: 'Active Cases'
    }
  };

  var chart = new google.visualization.ColumnChart(
  document.getElementById('ranking'));

  chart.draw(data, options);
  generateTable();
}

function generateTable() {
  var html_str = '<table><tr><th>Country</th><th>Total Cases</th><th>New Cases</th><th>Total Deaths</th><th>Total Recovered</th><th>Active Cases</th></tr>';
  for (var i = 0; i < alldata.length; i++) {
    html_str += '<tr><td>' + alldata[i][0] + '</td><td>' + alldata[i][1].totalCases + '</td><td>' +
      alldata[i][1].newCases + '</td><td>' + alldata[i][1].totalDeaths + '</td><td>' + alldata[i][1].totalRecovered +
      '</td><td>' + alldata[i][1].activeCases + '</td></tr>'
  }
  html_str += '</table>';
  html_str = html_str.replace(/undefined/g, '(no data)');
  $("#statistics").html(html_str);
}
