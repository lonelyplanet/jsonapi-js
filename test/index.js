require("dotenv").config({ path: (process.env.ENV_PATH || ".env.test" ) });

/*
  Creating a TODO list of things we need to test
  If the module under test does module.exports, use require to import it
  If it does export default, than use import module from "../path"
 */

// Open Planet
// It would be sorta silly to test these ones since it's just mock data?
require("../src/core/request");
require("../src/core/resource");
require("../src/core/urlBuilder");

require("../src/decorators/statsd");

require("../src/index");
