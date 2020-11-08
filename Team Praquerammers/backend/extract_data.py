
def extract_data(filename='testing.txt'):

    filename = 'testing.txt'
    data_keys = ["Total Cases", "New Cases", "Total Deaths", "Total Recovered", "Active Cases"]

    with open(filename,'r') as file:
        contents = file.readlines()

    data = {}
    for line in contents:
        raw_data = line.split(',')
        entries = [x.strip()[1:-1] for x in raw_data]
        data[entries[0][1:-1]] = {data_keys[i]:(int(entries[i+1]) if entries[i+1] != '' else 0) for i in range(len(data_keys))}

    return data