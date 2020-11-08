from lib import lib

#Token information
stdlib = "INSERT TOKEN"
lib = lib(token=stdlib)

#sms function
def sendSMS(cell, country, country_data):
    message = f'We will keep you updated on regional information for {country.upper()}\nHere is the current situtation there: '+ str(country_data)
    sms = lib.utils.sms['@2.0.2']
    result = sms(to = cell, body = message)
    return result