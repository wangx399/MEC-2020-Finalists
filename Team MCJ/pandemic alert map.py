import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# sort by case number
df = pd.read_csv('./covid19info.csv')
df = df.sort_values(by=['Total Cases'], ascending=False)
df.index = np.arange(0, len(df))
print(df)

# generate a plotly figure object
fig = px.scatter_geo(df, locations='Country',
                     locationmode='country names',
                     color ='pandemic alert',
                     # color = 'Country',
                     # color_discrete_sequence=px.colors.qualitative.Dark24,
                     size=' Population',size_max=50,hover_data=[' New Cases',' Total Deaths',' Total Recovered',' Active Cases',' Population'],
                     hover_name='Country', scope='world',
                     title = 'COVID-19 INFORMATION')

fig.update_layout(geo=go.layout.Geo(showcountries = True,
    countrycolor = 'black'))

fig.show()
