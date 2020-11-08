let form = document.getElementById('metricForm')
let selectedMetric = ""
// console.log(selectedMetric);

form.addEventListener('change', e => {
	selectedMetric = e.target.value
	// console.log(selectedMetric)
})
