## Contains method for sorting through different fields data
#  The data table parameter is the dictionary with all the data read from the .txt file


def getRequiredColumns(dataTable, sortColumn):
    dict = dataTable

    #making a 2d list with the required columns
    requiredList = []
    for entry in dict:
        requiredList.append([entry, dict[entry][sortColumn]])

    #sorting the 2d list based on the second column (sortColumn) first
    #sorting by country name (first column) if it is a tie
    sortedList = sorted(requiredList, key = lambda x:(x[1], x[0]))

    return sortedList


def sortTotalCases(dataTable):
    return getRequiredColumns(dataTable, "Total_Cases")


def sortNewCases(dataTable):
    return getRequiredColumns(dataTable, "New_Cases")


def sortTotalDeaths(dataTable):
    return getRequiredColumns(dataTable, "Total_Deaths")
    

def sortTotalRecovered(dataTable):
    return getRequiredColumns(dataTable, "Total_Recovered")


def sortActiveCases(dataTable):
    return getRequiredColumns(dataTable, "Active_Cases")

def getLocations(dataTable):
    dict = dataTable

    #making a 2d list with the required columns
    requiredList = []
    for entry in dict:
        requiredList.append([entry, dict[entry]["Latitude"], dict[entry]["Longitude"]])

    return requiredList

    


""" 
def main():
    dict = {"USA": {"Total_Cases": 200, "New_Cases": 300},
            "India": {"Total_Cases": 2030, "New_Cases": 300},
            "Canada": {"Total_Cases": 900, "New_Cases": 10},
            "Other": {"Total_Cases": 200, "New_Cases": 99}}

    sortTotalCases(dict)
    sortNewCases(dict)

main() """