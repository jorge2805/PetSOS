import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadAllNotes } from "../../../helpers/loadAllNotes";

const MyMapComponent = ({center = { lat: 18.5142517, lng: -69.8728359}, zoom = 12}) => {
  const {notes: sinfiltrar, active} = useSelector(state => state.journal)
  const {role} = useSelector(state => state.auth)

  const [reportes, setReportes] = useState([]);
  
  useEffect(() => {
    loadAllNotes().then( result => { 
      setReportes(result.filter( x => x.status === 4 ))
    });
  }, [])
  
  const notes = sinfiltrar.filter( x => x.status === 4 );

  const locations = (!!active) ? [{lat: active.lat, lng: active.long}] : 
                    (role == 'admin') ? reportes.map(({lat, long: lng})=>{return {lat, lng};}) : 
                                        notes.map(({lat, long: lng})=>{return {lat, lng};});

  (role == 'admin') ? console.log(['admin', reportes.length]) : console.log(['normal', notes.length]);

  const map = new google.maps.Map(document.getElementById("map"), {
    center: (!!active) ? {lat: active.lat, lng: active.long} : center,
    zoom: zoom
  }); 

  const markers = locations.map((location) => {
    return new google.maps.Marker({
      position: location,
      map,
      title: 'Maker'
    })  ;
  });


  
  return null;
};

export default MyMapComponent;
