let fileName = "testing.txt"
let countriesDict = {};
parseData("/public/" + fileName, countriesDict)

// preprocess additional metrics for countries
let dig = 100
let minRateOfSpread = 99999, maxRateOfSpread = 0
let minIntefctionRate = 99999, maxIntefctionRate = 0
let minMortalityRate = 99999, maxMortalityRate = 0
for (let countryName in countriesDict) {

	// rate of spread
	if (!isNaN(countriesDict[countryName].newCases) && !isNaN(countriesDict[countryName].activeCases)) {
		let rateOfSpread = Math.round(dig * 100 * countriesDict[countryName].newCases / countriesDict[countryName].activeCases) / dig
		countriesDict[countryName]["rateOfSpread"] = rateOfSpread
		minRateOfSpread = Math.min(minRateOfSpread, rateOfSpread)
		maxRateOfSpread = Math.max(maxRateOfSpread, rateOfSpread)
	}
	else {
		countriesDict[countryName]["rateOfSpread"] = 'N/A'
	}

	// infection rate
	if (!isNaN(countriesDict[countryName].newCases) && !isNaN(countriesDict[countryName].totalCases)) {
		let infectionRate = Math.round(dig * 100 * countriesDict[countryName].newCases / countriesDict[countryName].totalCases) / dig
		countriesDict[countryName]["infectionRate"] = infectionRate
		minIntefctionRate = Math.min(minIntefctionRate, infectionRate)
		maxIntefctionRate = Math.max(maxIntefctionRate, infectionRate)
	}
	else {
		countriesDict[countryName]["infectionRate"] = 'N/A'
	}

	// mortality rate
	if (!isNaN(countriesDict[countryName].totalRecovered) && !isNaN(countriesDict[countryName].totalDeaths)) {
		let mortalityRate = Math.round(dig * countriesDict[countryName].totalRecovered / countriesDict[countryName].totalDeaths) / dig
		countriesDict[countryName]["mortalityRate"] = mortalityRate
		minMortalityRate = Math.min(minMortalityRate, mortalityRate)
		maxMortalityRate = Math.max(maxMortalityRate, mortalityRate)
	}
	else {
		countriesDict[countryName]["mortalityRate"] = 'N/A'
	}

	// console.log(countriesDict[countryName])
}
// console.log(minRateOfSpread, maxRateOfSpread)
// console.log(minIntefctionRate, maxIntefctionRate)
// console.log(minMortalityRate, maxMortalityRate)

// finish preprocessing


function formatCountryData (countryID, countryName, countryInfo) {
	let html = `
	<div>Country ID: ${countryID}</div>
	<div>Country name: ${countryName}</div>
	`

	return countryInfo ? html + `
	<div>Total cases: ${countryInfo ? countryInfo.totalCases : "N/A"}</div>
	<div>Active cases: ${countryInfo ? countryInfo.activeCases : "N/A"}</div>
	<div>New cases: ${countryInfo ? countryInfo.newCases : "N/A"}</div>
	<div>Total deaths: ${countryInfo ? countryInfo.totalDeaths : "N/A"}</div>
	<div>Total recovered: ${countryInfo ? countryInfo.totalRecovered : "N/A"}</div>
	<div>Rate of spread: ${countryInfo ? countryInfo.rateOfSpread : "N/A"}</div>
	<div>Infection rate: ${countryInfo ? countryInfo.infectionRate : "N/A"}</div>
	<div>Mortality rate: ${countryInfo ? countryInfo.mortalityRate : "N/A"}</div>
	` : html;
}

function onCountryClicked (countryID) {
	sidePanel = document.getElementById('side-panel-info');

	let countryName = codeToName[countryID];

	// can be undefined because not all countries are in the data
	let countryInfo = countriesDict[countryName];

	console.log(`Country ID: ${countryID}, Country Name: ${countryName}`)
	sidePanel.innerHTML = formatCountryData(countryID, countryName, countryInfo)
}
