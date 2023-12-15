/// <reference path="../types.d.ts" />

// Sample code, see: https://pocketbase.io/docs/js-overview/

routerAdd("GET", "/ping", (c) => {

    return c.json(200, 'Pong!')

})
