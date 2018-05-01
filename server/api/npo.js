const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { GOOGLE_GEOCODING_API } = require('../../secret');
const getGeo = require('@google/maps').createClient({
    key: GOOGLE_GEOCODING_API
  });


module.exports = router;

router.get('/', (req, res, next) => {
    db.query("select * from npo where address is not null")
    .then(data => data[0])
    .then(newData => res.send(newData))
    .catch(next);
  })

router.get('/getGeo', (req, res, next) => {
    db.query("select * from npo where address is not null")
    .then(data => data[0])
    .then(data => addGeoLocation(data))
    .then(newData => setTimeout( () => res.send(newData), 5000 ))
    .catch(next);
  })

const addGeoLocation = addressArr => {
    for(let i = 0; i < addressArr.length; i++) {
        let address = addressArr[i].address;
        getGeo.geocode({address : address }, (err, res) => {
            if(err) console.error(err);
            if(!err) {
                const wholeResult = res.json.results;
                const geoLocation =  wholeResult[0].geometry.location;
                const name = addressArr[i].name;
                console.log(geoLocation, name)
                db.query(`update npo set geo_location = '${JSON.stringify(geoLocation)}' where name = '${name}';`)
            }
            console.log("success!")
        })
    }
    return addressArr;
}
  