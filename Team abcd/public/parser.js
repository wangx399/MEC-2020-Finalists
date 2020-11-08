let cleanString = str => {
	// assume format str == "["s"]"
	return str.substring(2, str.length-2)
}
let cleanInteger = str => {
	// assume format str == "[x]"
	let x = parseInt(str.substring(2, str.length-1))
	return isNaN(x) ? 'N/A' : x
}

// ref https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
let parseData = (file, out) => {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = () => {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				for (let line of rawFile.responseText.split("\n")) {
					if (!line) continue
					try {
						let [countryName, totalCases, newCases, totalDeaths, totalRecovered, activeCases] = line.split(",")
						out[cleanString(countryName)] = {
							totalCases: cleanInteger(totalCases),
							newCases: cleanInteger(newCases),
							totalDeaths: cleanInteger(totalDeaths),
							totalRecovered: cleanInteger(totalRecovered),
							activeCases: cleanInteger(activeCases)
						}
					}
					catch (err) {
						console.error(error);
					}
				}
			}
		}
	}
	rawFile.send(null)
}
