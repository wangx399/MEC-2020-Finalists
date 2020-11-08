from flask import Flask, redirect, url_for, render_template, jsonify
from readData import *
from analyzeData import *

import json

app = Flask(__name__)

global totalCases, newCases, totalDeaths, totalRecovered, activeCases, jsonObj

totalCases = None
newCases = None
totalDeaths = None
totalRecovered = None
activeCases = None

Data = readData("../testing.txt") 
totalCases = sortTotalCases(Data)
newCases = sortNewCases(Data)
totalDeaths = sortTotalDeaths(Data)
totalRecovered = sortTotalRecovered(Data)
activeCases = sortActiveCases(Data)
jsonObj = createJSONFile(Data)

@app.route("/")
def home():
    return render_template("index.html", country1=totalCases[-1][0], country2=totalCases[-2][0], country3=totalCases[-3][0], country4=totalCases[-4][0], country5=totalCases[-5][0],  value1=totalCases[-1][1], value2=totalCases[-2][1], value3=totalCases[-3][1], value4=totalCases[-4][1], value5=totalCases[-5][1])


### making temporary webpages and making tables for each scenario, goal was to read from the first 5 countries and the number of 
### cases for a specific scneario
@app.route("/tmp/Total_Cases")
def Total_Cases():
    string = "<table>"
    for i in range(len(totalCases)):
        string += "<tr id=" +str(i)+">\n"
        string += "<th id=" + str(i)+"_0>" + str(totalCases[i][0])+ "</th>" + "<th id=" + str(i)+"_1>" + str(totalCases[i][1])+ "</th>\n" 

        string += "</tr>\n"
    string += "</table>"

    return string


@app.route("/tmp/New_Cases")
def New_Cases():
    string = "<table>"
    for i in range(len(totalCases)):
        string += "<tr id=" +str(i)+">\n"
        string += "<th id=" + str(i)+"_0>" + str(newCases[i][0])+ "</th>" + "<th id=" + str(i)+"_1>" + str(newCases[i][1])+ "</th>\n" 

        string += "</tr>\n"
    string += "</table>"

    return string


@app.route("/tmp/Total_Deaths")
def Total_Deaths():
    string = "<table>"
    for i in range(len(totalCases)):
        string += "<tr id=" +str(i)+">\n"
        string += "<th id=" + str(i)+"_0>" + str(totalDeaths[i][0])+ "</th>" + "<th id=" + str(i)+"_1>" + str(totalDeaths[i][1])+ "</th>\n" 

        string += "</tr>\n"
    string += "</table>"

    return string

@app.route("/tmp/Total_Recovered")
def Total_Recovered():
    string = "<table>"
    for i in range(len(totalCases)):
        string += "<tr id=" +str(i)+">\n"
        string += "<th id=" + str(i)+"_0>" + str(totalRecovered[i][0])+ "</th>" + "<th id=" + str(i)+"_1>" + str(totalRecovered[i][1])+ "</th>\n" 

        string += "</tr>\n"
    string += "</table>"

    return string

@app.route("/tmp/Active_Cases")
def Active_Cases():
    string = "<table>"
    for i in range(len(totalCases)):
        string += "<tr id=" +str(i)+">\n"
        string += "<th id=" + str(i)+"_0>" + str(activeCases[i][0])+ "</th>" + "<th id=" + str(i)+"_1>" + str(activeCases[i][1])+ "</th>\n" 

        string += "</tr>\n"
    string += "</table>"

    return string

@app.route("/map.geojson")
def geoJson():
    string = "eqfeed_callback("
    string += str((jsonObj))
    string += ")"
    return string

if __name__ == "__main__":
    app.run()