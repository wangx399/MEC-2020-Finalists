import requests

flag_exceptions = {"USA":"United States", "UK":"United Kingdom"}

def get_flag_img(country):
    country_codes = requests.get('https://flagcdn.com/en/codes.json').json()
    if country.upper() in flag_exceptions:
        country = flag_exceptions[country.upper()]

    for code in country_codes:
        if country_codes[code].lower() == country.lower():
            r = requests.get(f'https://flagcdn.com/64x48/{code}.png')
            return r.content