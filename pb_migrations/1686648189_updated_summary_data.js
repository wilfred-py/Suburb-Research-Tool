migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "merfjzvc",
    "name": "suburb_name",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // remove
  collection.schema.removeField("merfjzvc")

  return dao.saveCollection(collection)
})
