"use strict";
import Ryman from "../fixtures/poi.1247462";
import ThirdManRecords from "../fixtures/poi.1247530";
import TwoOldHippies from "../fixtures/poi.1410608";
import AcmeFeedSeed from "../fixtures/poi.1512870";
import Etch from "../fixtures/poi.1513071";
import BicentennialCapitolMall from "../fixtures/poi.1534790";
import Husk from "../fixtures/poi.1534850";
import BackAlleyDiner from "../fixtures/poi.1534929";
import SkullsRainbowRoom from "../fixtures/poi.1534981";
import AscendAmphitheater from "../fixtures/poi.1534987";
import CountryMusicHallFameMuseum from "../fixtures/poi.381139";

export default {
  links: {
    self: "/places/356698/pois?page[limit]=3&page[offset]=9",
    next: "/places/356698/pois?page[limit]=3&page[offset]=12",
    first: "/places/356698/pois?page[limit]=3",
    prev: "/places/356698/pois?page[limit]=3&page[offset]=6",
    last: "/places/356698/pois?page[offset]=180",
  },
  data: [
    ThirdManRecords.data,
    TwoOldHippies.data,
    AcmeFeedSeed.data,
    Etch.data,
    BicentennialCapitolMall.data,
    Husk.data,
    BackAlleyDiner.data,
    SkullsRainbowRoom.data,
    AscendAmphitheater.data,
    CountryMusicHallFameMuseum.data,
  ],
  included: [{
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
  }]
};
