/// <reference path="../types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "kblyx6ommv2lhn8",
    "created": "2023-12-16 19:34:27.673Z",
    "updated": "2023-12-16 19:34:27.673Z",
    "name": "media",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "faakv1rm",
        "name": "post",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "5fzd8cy613bgmuo",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "si3vb7pw",
        "name": "asset",
        "type": "file",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 99,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kblyx6ommv2lhn8");

  return dao.deleteCollection(collection);
})
