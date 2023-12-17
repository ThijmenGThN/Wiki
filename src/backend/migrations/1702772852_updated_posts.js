/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzd8cy613bgmuo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvflauq7",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[a-z0-9_-]*$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5fzd8cy613bgmuo")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvflauq7",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[a-zA-Z0-9_-]*$"
    }
  }))

  return dao.saveCollection(collection)
})
