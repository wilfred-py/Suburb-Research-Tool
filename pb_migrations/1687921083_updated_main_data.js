migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdfqr7xcl5k5dbs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abkzhfcl",
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
  const collection = dao.findCollectionByNameOrId("rdfqr7xcl5k5dbs")

  // remove
  collection.schema.removeField("abkzhfcl")

  return dao.saveCollection(collection)
})
