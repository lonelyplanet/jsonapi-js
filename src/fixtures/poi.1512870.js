export default {
  "links": {
    "self": "/pois/1512870"
  },
  "data": {
    "type" : "poi",
    "id": "1512870",
    "links" : {
      "self" : "/pois/1512870",
      "image_associations" : "/pois/1512870/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1512870/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Acme Feed & Seed",
      "searchable_name": "Acme Feed & Seed",
      "location": {
        "type": "Point",
        "coordinates": [
          36.161985,
          -86.774429
        ]
      },
      "poi_type": "Entertainment",
      "hours_string": "11am-late Mon-Fri, from 10am Sat-Sun",
      "price_string": "",
      "price_range": "",
      "subtypes": [
        "Bar"
      ],
      "url": "http://www.acmefeedseed.com/",
      "telephone": "615-810-9631",
      "review": {
        "essential": "<p>This ambitious, four-floor takeover of an old 1875 farm supply warehouse has finally given Nashvillians a reason to go downtown even when family is not visiting. The first floor is devoted to lightning-fast pub grub, craft beers and live music that's defiantly un-country most nights (Southern rock, indie, roots etc). </p> <p>Head up a level for a casual cocktail lounge complete with rescued furniture, vintage pinball, walls made from old printing plates and a cornucopia of music memoriabilia. And then there's the open-air rooftop, with unrivaled views over the Cumberland River and straight down the belly of Broadway.</p>",
        "extension": ""
      },
      "address": {
        "street": "101 Broadway",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/ent-acme-feed.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/ent-acme-feed.jpg"
    }
  }]
}

