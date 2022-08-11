
export const loadMarkers = (locations, map) => {
  
    locations.map((location) => {
        return new google.maps.Marker({
            position: location,
            map,
            title: 'Maker'
        })  ;
    });
}
