/**
 * Retrieve data from the given resourse
 * @param {string} url URL to the souce text file
 * @param {function(data)} done Callback function called when the request successes
 * @param {function(xhr)} fail Callback function called when the request fails
 */
function retrieveData(url, done, fail) {
  $.get(url).done(done).fail(fail);
}

/**
 * Parse the provided test data and returns the parsed data as an array
 * @param {data} data 
 */
function parseSourceData(data) {
  // Country, Total, New, Total Deaths, Total Recovered, Active
  var lines = data.split("\n")
  var parsedData = [];
  lines.forEach(elem => {
    var tmp = elem.split(", ")
    if (tmp.length == 6) {
      parsedData[JSON.parse(tmp[0])[0]] = {
        totalCases: JSON.parse(tmp[1].replace(',', ''))[0],
        newCases: JSON.parse(tmp[2].replace(',', ''))[0],
        totalDeaths: JSON.parse(tmp[3].replace(',', ''))[0],
        totalRecovered: JSON.parse(tmp[4].replace(',', ''))[0],
        activeCases: JSON.parse(tmp[5].replace(',', ''))[0]
      }
    }
  });
  return parsedData;
}

/**
 * Parse the data from https://www.trackcorona.live/ and returns the parsed data
 * @param {data} data
 */
function parseTrackCorData(data) {
  var parsedData = [];
  data.data.forEach(elem => {
    // Some special cases
    if (elem.location == "United Kingdom") {
      elem.location = "UK"
    }
    else if (elem.location == "United States") {
      elem.location = "USA"
    }

    parsedData[elem.location] = elem;
  });
  return parsedData;
}