export default {
  "links": {
    "self": "/pois/1513071"
  },
  "data": {
    "type" : "poi",
    "id": "1513071",
    "links" : {
      "self" : "/pois/1513071",
      "image_associations" : "/pois/1513071/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1513071/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Etch",
      "searchable_name": "Etch",
      "location": {
        "type": "Point",
        "coordinates": [
          36.159143,
          -86.775137
        ]
      },
      "poi_type": "Restaurants",
      "hours_string": "11am-2pm & 5-10pm Mon-Thu, 11am-2pm & 5-10:30pm Fri, 5-10:30pm Sat",
      "price_string": "dinner mains $21-38",
      "price_range": "",
      "subtypes": [
        "Bar"
      ],
      "url": "http://www.etchrestaurant.com/",
      "telephone": "615-522-0685",
      "review": {
        "essential": "<p>This ambitious, four-floor takeover of an old 1875 farm supply warehouse has finally given Nashvillians a reason to go downtown even when family is not visiting. The first floor is devoted to lightning-fast pub grub, craft beers and live music that's defiantly un-country most nights (Southern rock, indie, roots etc). </p> <p>Head up a level for a casual cocktail lounge complete with rescued furniture, vintage pinball, walls made from old printing plates and a cornucopia of music memoriabilia. And then there's the open-air rooftop, with unrivaled views over the Cumberland River and straight down the belly of Broadway.</p>",
        "extension": ""
      },
      "address": {
        "street": "303 Demonbreun St",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/res-etch.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/res-etch.jpg"
    }
  }, {
    "type": "image",
    "id": "10186",
    "links": {
      "self": "/images/10186",
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/res-etch-2.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/res-etch.jpg"
    }
  }]
}

