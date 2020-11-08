# Testing
# ["Country Name"], [Total Cases], [New Cases], [Total Deaths], [Total Recovered], [Active Cases]
# Updated testing file to fix comma error, sorry!



# Info
``` 
Install discord.py

# Linux/macOS
python3 -m pip install -U discord.py

# Windows
py -3 -m pip install -U discord.py

Please add your bot token to the config.ini file for testing. 
Add the bot to your guild and run python3 index.py in your code editor
As soon as the bot starts running, just type +casetrack in a channel 
```
# Idea

```
The bot makes multiple GET requests in an asynchronous task loop to https://api.covid19api.com/summary which provides data in the form of JSON which is then further put in the form of a discord embed. 
```
