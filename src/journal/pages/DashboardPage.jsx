import { useState } from "react"
import MapWrapper from "../components/GoogleMaps/MapWrapper"

import { AdminLayout } from "../layout/AdminLayout"

import { FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material"

export const DashboardPage = () => {

  const [showHeatMap, setshowHeatMap] = useState(true)
  const [showMarkers, setshowMarkers] = useState(false)

  const handleMarkersChange = () => {
    setshowMarkers(!showMarkers);
  }

  const handleHeatMapChange = () => {
    setshowHeatMap(!showHeatMap);
  }

  return (
    <AdminLayout>

      {/* {(!!active) ? <NoteView/> : <NothingSelectedView/> }       */}

      <FormGroup>
        <Grid container
          item
          md={12}
          justifyItems='center'
          justifyContent='flex-start'
        >
          <Grid container
            item
            md={2}
            justifyItems='center'
            justifyContent='flex-start'
          >
            <Typography variant="h6" color='primary'>Dashboard</Typography>
          </Grid>
          <Grid container
            item
            md={10}
            justifyItems='center'
            justifyContent='flex-end'
          >
            <FormControlLabel control={<Switch checked={showMarkers} onChange={handleMarkersChange}/>} label="Markers" />
            <FormControlLabel control={<Switch checked={showHeatMap} onChange={handleHeatMapChange}/>} label="HeatMap" />
          </Grid>
        </Grid>

      </FormGroup>

      <MapWrapper showHeatMap={showHeatMap} showMarkers = {showMarkers}/>
      <div style={{ height: "80vh" }} id="map"></div>

    </AdminLayout>
  )
}
