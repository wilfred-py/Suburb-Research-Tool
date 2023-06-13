migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("31p072njz901bed")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsrv6aca",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("31p072njz901bed")

  // remove
  collection.schema.removeField("gsrv6aca")

  return dao.saveCollection(collection)
})
