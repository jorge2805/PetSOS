import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadAllNotes } from "../../../helpers/loadAllNotes";
import { loadHeatMap } from "../../../helpers/loadHeatMap";
import { loadMarkers } from "../../../helpers/loadMarkers";

const MyMapComponent = ({center, zoom, showMarkers, showHeatMap}) => {
  const {notes: sinfiltrar, active} = useSelector(state => state.journal)
  const {role} = useSelector(state => state.auth)

  const [reportes, setReportes] = useState([]);
  
  useEffect(() => {
    loadAllNotes().then( result => { 
      setReportes(result.filter( x => x.status === 4 ))
    });
  }, [])
  
  const notes = sinfiltrar.filter( x => x.status === 4 );

  const locations = (!!active) ? [new google.maps.LatLng(active.lat, active.long)] : 
                    (role == 'admin') ? reportes.map(({lat, long: lng})=>{return new google.maps.LatLng(lat, lng);}) : 
                                        notes.map(({lat, long: lng})=>{return new google.maps.LatLng(lat, lng);});

  (role == 'admin') ? console.log(['admin', reportes.length]) : console.log(['normal', notes.length]);

  const map = new google.maps.Map(document.getElementById("map"), {
    center: (!!active) ? {lat: active.lat, lng: active.long} : center,
    zoom: zoom
  }); 

  showMarkers && loadMarkers(locations,map);
  showHeatMap && loadHeatMap(locations,map);


  
  return null;
};

export default MyMapComponent;
