/// <reference path="../types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzd8cy613bgmuo")

  // remove
  collection.schema.removeField("gociuj2h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y934lq17",
    "name": "content",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzd8cy613bgmuo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gociuj2h",
    "name": "content",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("y934lq17")

  return dao.saveCollection(collection)
})
