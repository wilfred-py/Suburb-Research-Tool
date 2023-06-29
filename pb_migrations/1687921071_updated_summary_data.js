migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwuydqp9",
    "name": "postcode",
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
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // remove
  collection.schema.removeField("vwuydqp9")

  return dao.saveCollection(collection)
})
