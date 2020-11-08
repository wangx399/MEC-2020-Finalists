import "./App.css";
import covid from './covid.svg';
import "leaflet/dist/leaflet.css";
import Login from "./Login"
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormControl,MenuItem,Select } from "@material-ui/core";
import Map from "./Map";
import Analytics from "./Table";
import "./Map.css"

import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

class Home extends React.Component {
  render() {
    return (
      <div class="Main"> 
        <div class = "header">
          <h1 style={{ textAlign: 'center'}}>Welcome to Covid-Tracker~</h1>
          <img id="covid-img" src={covid} class="center" alt="logo" height={300} width={600}/>
        </div>
        <div class="guide1 center">
          <h2 style={{ textAlign: 'center' }}>Map</h2>
          <p style={{ textAlign: 'center' }}>Map page contains the posts sent by the server.<br />
          On the top, there is filter selection box <br/>Select any countries you would like to view data for</p><br /><br />
        </div>
        <div class="guide2 center">
          <h2 style={{ textAlign: 'center' }}>Log in Guide</h2>
          <p style={{ textAlign: 'center' }}>Log in page contains a panel for user to sign up and sign in to retreive the information</p>
        </div>
        <div class="blank1">
          
        </div>
        <div class="blank2">
          
        </div>
      </div>

    );
  }
};


export default function App() {
  const classes = useStyles();
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);

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
        setMapCountries(data);
      })
    }
    getData();
  }, [])
  return (
    <div>
    <div className={classes.root}>
    <Router>
      <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid-Tracker
          </Typography>
          <Button color="inherit" component = {Link} exact to="/home">Home</Button>
          <Button color="inherit" component = {Link} exact to="/map">Map</Button>
          <Button color="inherit" component = {Link} exact to="/Login">Login</Button>
        </Toolbar>
      </AppBar>
      
          <Route path="/home" component={Home} />
          <Route exact path="/map" render={(props) => <Map center={mapCenter}
          zoom={mapZoom}
            countries = {mapCountries}
          />}/>
          <Route path="/Login" component = {Login} />
      </Router>
    </div>

</div>
  );
}