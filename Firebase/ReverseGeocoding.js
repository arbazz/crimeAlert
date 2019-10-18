
const getReveseGeoCode = async(lat,lon)=>{

// console.log(lat,lon)
var settings = {
    "async": true,
    "crossDomain": true,
    // "url": `https://us1.locationiq.com/v1/reverse.php?key=fc515f234acdd9&lat=-${lat}&lon=${lon}&format=json`,
    "method": "GET"
  }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });
  try {
    let response = await fetch(
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1        `,
     
        );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }

}
export {
    getReveseGeoCode
}
