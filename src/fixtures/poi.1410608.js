export default {
  "links": {
    "self": "/pois/1410608"
  },
  "data": {
    "type" : "poi",
    "id": "1410608",
    "links" : {
      "self" : "/pois/1410608",
      "image_associations" : "/pois/1410608/images"
    },
    "relationships" : {
      "containing_place" : {
        "links" : {
          "self" : "/pois/1410608/relationships/place",
          "related" :  "/place/1341151"
        },
        "data" : {
          "type" : "place",
          "id" : "1341151"
        }
      }
    },
    "attributes" : {
      "name": "Two Old Hippies",
      "searchable_name": "Two Old Hippies",
      "location": {
        "type": "Point",
        "coordinates": [
          36.152187,
          -86.784804
        ]
      },
      "poi_type": "Shopping",
      "hours_string": "10am-7pm Mon-Thu, to 8pm Fri-Sat, 11am-5pm Sun",
      "price_string": "",
      "price_range": "",
      "subtypes": [
        "Clothing, Live Music"
      ],
      "url": "http://www.twooldhippies.com/",
      "telephone": "",
      "review": {
        "essential": "<p>Only in Nashville would an upscale retro-inspired clothing shop have a bandstand with regular live shows of high quality. And, yes, just like the threads, countrified hippie rock is the rule. The shop itself has special jewelry, fitted tees, excellent belts, made in Tennessee denim, a bounty of stage-worthy shirts and jackets and some incredible acoustic guitars.</p> <p>There's live music four nights a week at 6pm and open mic for kids on Sundays at 1pm.</p>",
        "extension": ""
      },
      "address": {
        "street": "401 12th Ave S",
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
      "pixels": "https://lonelyplanetimages.imgix.net/dotcom-pois/images/shopping-two-old-hippies.jpg"
    },
    "attributes": {
      "width": 3398,
      "height": 2266,
      "orientation": "landscape",
      "caption": "Neuschwanstein Castle",
      "path": "/dotcom-pois/images/shopping-two-old-hippies.jpg"
    }
  }]
}

