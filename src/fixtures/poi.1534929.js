export default {
  "links": {
    "self": "/pois/1534929"
  },
  "data": {
    "type" : "poi",
    "id": "1534929",
    "links" : {
      "self" : "/pois/1534929",
      "image_associations" : "/pois/1534929/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1534929/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Back Alley Diner",
      "searchable_name": "Back Alley Diner",
      "location": {
        "type": "Point",
        "coordinates": [
          36.164176,
          -86.779997
        ]
      },
      "poi_type": "Restaurants",
      "hours_string": "10:30am-2:30pm Mon, 10:30am-2:30pm & 4-9pm Tue-Fri, 11am-10pm Sat",
      "price_string": "sandwiches & burgers $8-11",
      "price_range": "",
      "subtypes": [
        "Diner"
      ],
      "url": "http://www.backalleydiner.com/",
      "telephone": "615-251-3003",
      "review": {
        "essential": "<p>This aptly named bar, hidden away in a small alley next to the Nashville Arcade, gives off laid-back, neighborhood bar vibes. The décor is simple, but the burgers and wings are solid and the beer prices are hard to beat. The bar also hosts songwriter nights and regularly features live music performances on the weekends.</p>",
        "extension": ""
      },
      "address": {
        "street": "37 Rutledge St",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/res-back-alley-diner.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/res-back-alley-diner.jpg"
    }
  }]
}

