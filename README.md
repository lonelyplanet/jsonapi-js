# jsonapi-js
A small library for consuming a JsonAPI.

### Using it
```shell
npm install --save jsonapi-js
```

```js
import { Resource } from "jsonapi-js";

export default class Endpoint extends Resource {
  endpoint = "foo";
}

const foo = new Endpoint();

foo.findById(1).then(({ model, response }) => {
  // model is a mash of attributes, and all merged relationships from includes
  // resource is the raw response
});
```
