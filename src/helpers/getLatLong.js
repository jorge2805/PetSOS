export const getLatLong = async () => {
    let getLocationPromise = new Promise((resolve, reject) => {
        let lat = 0
        let long = 0
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                // console.log(position.coords.latitude, position.coords.longitude) //test...

                lat = position.coords.latitude
                long = position.coords.longitude

                // console.log("LATLONG1: ", lat, long) //test...

                // Resolving the values which I need
                resolve({latitude: lat, 
                        longitude: long})
            })

        } else {
            reject("your browser doesn't support geolocation API")
        }
    })
  
  return getLocationPromise;
}
