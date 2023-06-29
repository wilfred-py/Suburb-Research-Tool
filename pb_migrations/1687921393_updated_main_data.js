migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdfqr7xcl5k5dbs")

  // remove
  collection.schema.removeField("abkzhfcl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "abueia74",
    "name": "postcode",
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

  // remove
  collection.schema.removeField("abueia74")

  return dao.saveCollection(collection)
})
