export default {
  "links": {
    "self": "/pois/1247530"
  },
  "data": {
    "type" : "poi",
    "id": "1247530",
    "links" : {
      "self" : "/pois/1247530",
      "image_associations" : "/pois/1247530/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1247530/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Third Man Records",
      "searchable_name": "Third Man Records",
      "location": {
        "type": "Point",
        "coordinates": [
          36.1517227559793,
          -86.7780453526963
        ]
      },
      "poi_type": "Shopping",
      "hours_string": "10am-6pm Mon-Sat, 12-5pm Sun",
      "price_string": "",
      "price_range": "",
      "subtypes": [
        "Music"
      ],
      "url": "https://www.thirdmanrecords.com/",
      "telephone": "",
      "review": {
        "essential": "<p>In a still-industrial slice of downtown you'll find Jack White's boutique record label, shop and novelty lounge, complete with its own lathe and live venue. They sell only Third Man recordings on vinyl and CD, collectible t-shirts, stickers, headphones, and Pro-Ject record players. You'll also find White's entire catalog of recordings; and you can record yourself on vinyl ($15).</p> <p>Live shows go off in the studio's Blue Room once a month. They're typically open to the public (about $10), but are only announced a couple weeks in advance. Attendees receive an exclusive colored vinyl Black and Blue of the performance.</p>",
        "extension": ""
      },
      "address": {
        "street": "623 7th Ave S",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/shopping-third-man.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/shopping-third-man.jpg"
    }
  }]
}

