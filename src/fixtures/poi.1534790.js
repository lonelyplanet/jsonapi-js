export default {
  "links": {
    "self": "/pois/1534790"
  },
  "data": {
    "type" : "poi",
    "id": "1534790",
    "links" : {
      "self" : "/pois/1534790",
      "image_associations" : "/pois/1534790/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1534790/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Bicentennial Capitol Mall",
      "searchable_name": "Bicentennial Capitol Mall",
      "location": {
        "type": "Point",
        "coordinates": [
          36.170819,
          -86.787422
        ]
      },
      "poi_type": "Sights",
      "hours_string": "",
      "price_string": "",
      "price_range": "",
      "subtypes": [
        "Park"
      ],
      "url": "",
      "telephone": "615-741-5280",
      "review": {
        "essential": "<p>Downtown Nashville's 19-acre green lung swoops grandly north from the Tennessee State Capitol giving unparalleled (and much televised) views of its white antebellum columns. It's a fine place for a stroll, especially on a Saturday when the Nashville Farmers Market is in full fruity swing nearby.</p> <p>The park was constructed in 1996 to commemorate Tennessee's 200th birthday, and is decorated with various lessons in the state's history and attractions: plot a route on the 200ft granite map of the state at the southern end of the park, complete with rivers, roads and county lines, or read about its past along the Pathway of History. The centerpiece of the park is the 2000-seat Tennessee Amphitheater.</p>",
        "extension": ""
      },
      "address": {
        "street": "600 James Robertson Parkway",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/sight-bicentennial-mall.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/sight-bicentennial-mall.jpg"
    }
  }]
}

