async function getData() {
    response = await fetch('http://192.168.0.127:5000/data')
    data = await response.json()
    return data
}

function updateChart(chart) {
    chart.update();
}

async function showData(coviddata) {
    var country = document.getElementById("countries").value;
    document.getElementById("country_name").innerText = country;
    document.getElementById("total").innerText = coviddata[country]["Total Cases"];
    document.getElementById("new").innerText = coviddata[country]["New Cases"];
    document.getElementById("active").innerText = coviddata[country]["Active Cases"];
    document.getElementById("deaths").innerText = coviddata[country]["Total Deaths"];
    document.getElementById("recoveries").innerText = coviddata[country]["Total Recovered"];
    document.getElementById("flag_img").src = "http://192.168.0.127:5000/flag/" + country

    $('#myChart').remove();
    $('.chart').append('<canvas id="myChart"><canvas>');
    var ctx = document.getElementById('myChart').getContext('2d');
    var stackedBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [country],
            datasets: [{
                label: 'active',
                CategoryPercentage: 0.5,
                backgroundColor: 'rgb(0,0,0)',
                data: [coviddata[country]["Active Cases"]] //get data from flask
            },
            {
                label: 'new',
                CategoryPercentage: 0.5,
                backgroundColor: 'rgb(0,0,255)',
                data: [coviddata[country]["New Cases"]]
            },
            {
                label: 'recovered',
                CategoryPercentage: 0.5,
                backgroundColor: 'rgb(0,255,0)',
                data: [coviddata[country]["Total Recovered"]]
            },
            {
                label: 'deaths',
                CategoryPercentage: 0.5,
                BarPercentage: 0.5,
                backgroundColor: 'rgb(255,0,0)',
                data: [coviddata[country]["Total Deaths"]]
            }
            ]
        },
        options: {
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
            },
        }
    });
}

getData().then((data) => {
    let countries = Object.keys(data);

    // dropdown
    document.getElementById("countries").innerHTML = ''
    document.getElementById("countries_contact").innerHTML = ''
    for (let i = 0; i < countries.length; i++) {
        document.getElementById("countries").innerHTML += `<option value="${countries[i]}">${countries[i]}</option>`
        document.getElementById("countries_contact").innerHTML += `<option value="${countries[i]}">${countries[i]}</option>`
    }
    document.getElementById("countries").value = countries[0];
    document.getElementById("country_name").innerText = countries[0];
    document.getElementById("countries").onchange = () => { showData(data); }
    showData(data);
});


// User Contact Button
async function contact_button_submit() {
    let phone_number = "1" + document.getElementById("phone_number").value.replace(/[.,\s-]/g, "");
    let country = document.getElementById("countries_contact").value;

    let response = await fetch(`http://192.168.0.127:5000/contact/${phone_number}/${country}`);
    let data = await response.text();
    document.getElementById('contact_success').innerText = data;
    document.getElementById('contact_success').style.display = 'block';

    document.getElementById("contact_submit").disabled = true;
    setTimeout(function () { document.getElementById("contact_submit").disabled = false; }, 5000);
}
document.getElementById("contact_submit").onclick = contact_button_submit;



