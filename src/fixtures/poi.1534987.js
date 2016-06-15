export default {
  "links": {
    "self": "/pois/1534987"
  },
  "data": {
    "type" : "poi",
    "id": "1534987",
    "links" : {
      "self" : "/pois/1534987",
      "image_associations" : "/pois/1534987/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1534987/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Ascend Amphitheater",
      "searchable_name": "Ascend Amphitheater",
      "location": {
        "type": "Point",
        "coordinates": [
          36.159862,
          -86.771371
        ]
      },
      "poi_type": "Entertainment",
      "hours_string": "",
      "price_string": "",
      "price_range": "",
      "subtypes": [
        "Live Music"
      ],
      "url": "http://www.ascendamphitheater.com/",
      "review": {
        "essential": "<p>Situated smack-dab in the middle of the city, Nashville’s newest major music venue certainly does impress. The space-age stage structure and surrounding park was designed by landscape architects Hawkins Partners and gives dazzling views of the river and downtown during its summer-time concert series.</p> <p>Acts are a mix of blockbuster and nostalgic: Alabama Shakes, Modest Mouse and Duran Duran are on the roll-call, but whoever floats your boat, there's not a bad seat in the house, even if you're perched on the lawn.</p>",
        "extension": ""
      },
      "address": {
        "street": "301 1st Ave S",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/ent-ascend.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/ent-ascend.jpg"
    }
  }]
}

