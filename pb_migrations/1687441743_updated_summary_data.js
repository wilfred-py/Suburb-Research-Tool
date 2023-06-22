migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // remove
  collection.schema.removeField("xpln8hjq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xpln8hjq",
    "name": "main_data",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
