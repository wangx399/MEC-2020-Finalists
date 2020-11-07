from tkinter import *
import tkinter.messagebox
 
 #user interface
class MainWindow:
    def __init__(self):
        self.frame = Tk()
 
        self.label_name = Label(self.frame,text = "country name")
        self.input_name = Entry()
        self.label_name.grid(row = 0,column = 0)
 
        self.button_search = Button(self.frame,text = "Search",width = 10)
        self.button_search.bind("<ButtonRelease-1>",self.buttonListener1)
 
        self.input_name.grid(row = 0,column = 1)
        self.button_search.grid(row = 3,column = 0)
 
        self.frame.mainloop()

    ##searching bottom
    def buttonListener1(self,event):
        name = self.input_name.get()
        result = search(name)
        if result==False:
            tkinter.messagebox.showinfo("Report","This country is not on the list")
        else:
            tkinter.messagebox.showinfo("Report","Data in "+result[0]+" is:\n"+"Total Case: "+result[1]+"\n"+"New Case: "+result[2]+"\n"+"Total Deaths: "+result[3]+"\n"+"Total Recovered: "+result[4]+"\n"+"Avtive Cases: "+result[5]+"\n")
            if result[6]==False:
                tkinter.messagebox.showinfo("Report","This country does not have a high death rate.")
            else :
                tkinter.messagebox.showinfo("Report","This country have a high death rate.")
 



## Read datas
infile = open("testing.txt","r")
content = infile.read()
data = content.split("\n")
countryNum = 0
for i in data:
    data[countryNum] = i.split(",")
    k = 0
    for element in data[countryNum]:
        data[countryNum][k] = element.strip(' []"')
        k += 1
    countryNum += 1


countryName = []

i = 0
while i <= 52:
    countryName.append(data[i][0])
    i += 1



#searching data by using country name
def search(name):
    i = 0
    for ele in data:
        if ele[0]==name:
            return data[i]
        i+=1
    return(False)    


#reminder of dangerous region
totalDeath = 0
totalCases = 0
position = 0

for i in countryName:
    ind = countryName.index(i)
    data[ind].append(0)
    totalCases += int(data[ind][1])
    totalDeath += int(data[ind][3])

aveDeathRate = totalDeath / totalCases

position = 0
for i in countryName:
    ind = countryName.index(i)
    if ((int(data[ind][3]))/(int(data[ind][1]))) > aveDeathRate:
        data[ind][6]=1
        print("This country, " + i + " have a high death risk.")

#user windows
frame = MainWindow()
