export default {
  "links": {
    "self": "/image_associations/9365893"
  },
  "data": {
    "type": "image_association",
    "id": "9365893",
    "attributes": {
      "tag": "masthead"
    },
    "relationships": {
      "from": {
        "links": {
          "self": "/image_associations/9365893/relationships/image",
          "related": "/images/10186"
        },
        "data": {
          "type": "image",
          "id": "10186"
        }
      },
      "to": {
        "links": {
          "self": "/image_associations/9365893/relationships/target",
          "related": "/places/23629"
        },
        "data": {
          "type": "place",
          "id": "23629"
        }
      }
    }
  },
  "included": [
    {
      "type": "image",
      "id": "10186",
      "links": {
        "self": "/images/10186",
        "pixels": "https://lonelyplanetimages.imgix.net/a/g/hi/t/7ecbc09e92e2e48154423565e274acf2-europe.jpg"
      },
      "attributes": {
        "width": 3398,
        "height": 2266,
        "orientation": "landscape",
        "caption": "Neuschwanstein Castle",
        "path": "/a/g/hi/t/7ecbc09e92e2e48154423565e274acf2-europe.jpg"
      }
    }
  ]
}
