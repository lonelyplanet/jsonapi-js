export default {
  "links": {
    "self": "/pois/1247462"
  },
  "data": {
    "type" : "poi",
    "id": "1247462",
    "links" : {
      "self" : "/pois/1247462",
      "image_associations" : "/pois/1247462/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1247462/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Ryman Auditorium",
      "searchable_name": "Ryman Auditorium",
      "location": {
        "type": "Point",
        "coordinates": [
          36.161248,
          -86.778302
        ]
      },
      "poi_type": "Sights",
      "hours_string": "9am-4pm",
      "price_string": "self-guided tour adult/child $20/15, backstage tour $30/25",
      "price_range": "",
      "subtypes": [
        "Historic Building"
      ],
      "url": "http://ryman.com/",
      "telephone": "615-251-3003",
      "review": {
        "essential": "<p>The so-called 'Mother Church of Country Music' has hosted a laundry list of performers, from Martha Graham to Elvis, and Katherine Hepburn to Bob Dylan. The soaring brick tabernacle (1892) was built by wealthy riverboat captain Thomas Ryman to house religious revivals, and watching a show from one of its 2362 seats can still be described as a spiritual experience.</p> <p>The Grand Ole Opry took place here for 31 years until it moved out to the Opryland complex in Music Valley in 1974. Today the Opry returns to the Ryman during winter. In 2015 a $14 million visitor experience renovation installed a new event space, cafe and bars.</p>",
        "extension": ""
      },
      "address": {
        "street": "116 5th Ave N",
      },
    },
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/sight-ryman.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/sight-ryman.jpg"
    }
  }]
}
