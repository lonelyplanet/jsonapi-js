export default {
  "links": {
    "self": "/pois/1534850"
  },
  "data": {
    "type" : "poi",
    "id": "1534850",
    "links" : {
      "self" : "/pois/1534850",
      "image_associations" : "/pois/1534850/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1534850/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Husk",
      "searchable_name": "Husk",
      "location": {
        "type": "Point",
        "coordinates": [
          36.155323,
          -86.769987
        ]
      },
      "poi_type": "Restaurants",
      "hours_string": "11am-2pm Mon, 11am-2pm & 5-10pm Tue-Sun (brunch served 10am-2pm Sat & Sun)",
      "price_string": "mains $25-34",
      "price_range": "",
      "subtypes": [
        "Southern"
      ],
      "url": "http://husknashville.com/",
      "telephone": "615-256-6565",
      "review": {
        "essential": "<p>Set in a Victorian house overlooking downtown and the river, Husk provides an authentic Southern food experience. Showcasing regional foods and traditional preparations such as pickling and smoking in ways that excite and surprise the modern palate, multi–James Beard nominee and winner chef Sean Brock’s passion for Southern food shines in every dish.</p>",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/res-husk-2.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/res-husk.jpg"
    }
  }]
}

