export default {
  "links": {
    "self": "/pois/381139"
  },
  "data": {
    "type" : "poi",
    "id": "381139",
    "links" : {
      "self" : "/pois/381139",
      "image_associations" : "/pois/381139/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/381139/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Country Music Hall of Fame & Museum",
      "searchable_name": "Country Music Hall of Fame & Museum",
      "location": {
        "type": "Point",
        "coordinates": [
          36.158398,
          -86.776221
        ]
      },
      "poi_type": "Sights",
      "hours_string": "9am-5pm",
      "price_string": "sadult/child $25/15, with audio tour $27/18, with Studio B 1hr tour $40/30",
      "price_range": "",
      "subtypes": [
        "Museum"
      ],
      "url": "http://countrymusichalloffame.org/",
      "telephone": "615-251-3003",
      "review": {
        "essential": "<p>Following a $100-million expansion in 2014, this monumental museum, reflecting the near-biblical importance of country music to Nashville's soul, is a must-see, whether you're a country music fan or not. Gaze at Carl Perkins' blue suede shoes, Elvis' gold Cadillac (actually white) and gold piano (actually gold) and Hank Williams’ western-cut suit with musical note appliqués.</p> <p>Highlights of the ambitious 210,000-square-foot expansion include the 800-seat CMA Theater, the Taylor Swift Education Center and the relocation of the legendary letterpress operation of Hatch Show Print. Written exhibits trace country's roots, computer touch screens access recordings and photos from the enormous archives, and the fact- and music-filled audio tour is narrated by contemporary stars.</p>",
        "extension": ""
      },
      "address": {
        "street": "222 5th Ave S",
      }
    }
  },
  "included": [{
    type: "place",
    id: "1341151",
    attributes: {
      "name": "Nashville",
      "center": {
        "type": "Point",
        "coordinates": [
          36.1667,
          86.7833
        ]
      },
      "place_type": "city"
    }
  }, {
    "type": "image",
    "id": "10186",
    "links": {
      "self": "/images/10186",
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/sight-country-music-hall.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/sight-country-music-hall.jpg"
    }
  }]
}

