export default {
  "links": {
    "self": "/pois/1534981"
  },
  "data": {
    "type" : "poi",
    "id": "1534981",
    "links" : {
      "self" : "/pois/1534981",
      "image_associations" : "/pois/1534981/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1534981/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Skull's Rainbow Room",
      "searchable_name": "Skull's Rainbow Room",
      "location": {
        "type": "Point",
        "coordinates": [
          36.165068,
          -86.779182
        ]
      },
      "poi_type": "Entertainment",
      "hours_string": "11am-2am",
      "price_string": "",
      "price_range": "",
      "subtypes": [
        "Cocktail Bar"
      ],
      "url": "",
      "telephone": "615-810-9631",
      "review": {
        "essential": "<p>This speakeasy-style bar, located in historic Printer’s Alley, offers superb cocktails, upscale eats and a gloriously seedy backstory. First opened in the late 1940s, the original owner, David 'Skull' Shulman, who was known for his eccentric patchwork suits, ran the club as an exotic dance venue until he was brutally murdered on site in 1998.</p> <p>Reopend in 2016, the club seeps history: the original menu is on display and patrons can sit at candle-lit tables around the Rainbow Room circular stage – these days frequented by local bands. On weekends late-night patrons will also be treated to high-energy burlesque performances.</p>",
        "extension": ""
      },
      "address": {
        "street": "222 Printers Alley",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/ent-skulls-rainbow-room.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/ent-skulls-rainbow-room.jpg"
    }
  }]
}

