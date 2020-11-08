import React, {useState,useEffect} from 'react';
import "./Map.css"
import { FormControl,MenuItem,Select } from "@material-ui/core";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import Table from './Table';
import "leaflet/dist/leaflet.css";
import { showDataOnMap } from "./extra";

function Map({center, zoom, countries}){
    const [country, setCountry] = useState([
    ]);
    const [Items,setItems] = useState("World");
    const [countryInfo,setCountryInfo] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => {
        setCountryInfo(data)
        })
      }, [])

    useEffect(() => {
      const getData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const results = data.map((x) =>({
            name:x.country,
            value:x.countryInfo.iso2
          }
          ))
          setCountry(results);
        })
      }
      getData();
    }, [])
  
    const ChangeCountry = async(event) =>{
      const Temp = event.target.value;
      
      const url = Temp === 'World' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${Temp}`;

      await fetch(url)
      .then(res => res.json())
      .then(data => {
        setItems(Temp);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat,data.countryInfo.lng])
        setMapZoom(4);
      })
    }
  return (
    <div>
    <div className ="list">
      <FormControl className = "app_header">
      <Select variant = "filled" onChange={ChangeCountry} value={Items} >
      <MenuItem value = "World">World</MenuItem>
        {
          country.map((x) =>(
            <MenuItem value = {x.value}>{x.name}</MenuItem>
          ))
        }
      </Select>
      </FormControl>
    </div>
    
    <div className = "stats">
        <Table title= "Daily Cases" cases = {countryInfo.todayCases} total ={countryInfo.cases}/>
        <Table title= "Daily Recovered" cases = {countryInfo.todayRecovered} total ={countryInfo.recovered}/>
        <Table title= "Daily Deaths" cases = {countryInfo.todayDeaths} total ={countryInfo.deaths}/>
    </div>
    <div className = "map">
    <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries)}
      </LeafletMap>
    </div>
    </div>
  );}

export default Map