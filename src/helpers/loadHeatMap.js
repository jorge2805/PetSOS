
export const loadHeatMap = (locations, map) => {  
    return new google.maps.visualization.HeatmapLayer({
        data: locations
    }).setMap(map);
}
