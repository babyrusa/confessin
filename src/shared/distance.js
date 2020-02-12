export default class Distance {
  static getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6378; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
  }

  static deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  static getLatLonFromDistance(lat1,lon2,distance){
    // number of km per degree = ~111km (111.32 in google maps, but range varies
    // between 110.567km at the equator and 111.699km at the poles)
    // 1km in degree = 1 / 111.32km = 0.0089

    const coef = distance * (1/111.32);
    const new_lat = lat1 + coef;
    const new_long = lon2 + coef / Math.cos(new_lat * Math.PI/180);
    return {latitude : new_lat , longitude : new_long}
    // let r_earth = 6378; // Radius of the earth in km
    // let kmDegLat = (pi/180) * r_earth = 111 km / degree 
    // let kmDegLong = (pi/180) * r_earth * cos(theta)

    // let new_latitude  = latitude  + (dy / r_earth) * (180 / Math.PI);
    // let new_longitude = longitude + (dx / r_earth) * (180 / Math.PI) / Math.cos(latitude * Math.PI/180);
  }
}