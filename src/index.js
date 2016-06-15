"use strict";
import Pois from "./endpoints/pois";
import Places from "./endpoints/places";
import { fetch } from "./core/request";
import Resource from "./core/resource";

const API = {
  Pois,
  Places,
  fetch,
  Resource,
};

module.exports = API;
