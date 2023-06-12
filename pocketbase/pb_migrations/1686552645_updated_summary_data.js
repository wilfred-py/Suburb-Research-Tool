migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ca4odtvcl8nh833")

  // remove
  collection.schema.removeField("3ecrcujm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kkr8lknc",
    "name": "Suburb",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "plbf4a8i",
    "name": "People",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ca4odtvcl8nh833")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ecrcujm",
    "name": "field",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("kkr8lknc")

  // remove
  collection.schema.removeField("plbf4a8i")

  return dao.saveCollection(collection)
})
