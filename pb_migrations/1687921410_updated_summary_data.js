migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  // remove
  collection.schema.removeField("vwuydqp9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u3tsxdmw",
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

  // remove
  collection.schema.removeField("u3tsxdmw")

  return dao.saveCollection(collection)
})
