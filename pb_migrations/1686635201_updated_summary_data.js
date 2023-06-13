migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("31p072njz901bed")

  // remove
  collection.schema.removeField("gsrv6aca")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "75kvyucu",
    "name": "Male",
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
    "id": "yrc6w4d8",
    "name": "Female",
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
    "id": "kpcc3rhb",
    "name": "Median_Age",
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
    "id": "09f0fzgu",
    "name": "Families",
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
    "id": "rrcebvyt",
    "name": "All_Private_Dwellings",
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
    "id": "soi4ngco",
    "name": "Average_Number_of_People_Per_Household",
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

  // remove
  collection.schema.removeField("75kvyucu")

  // remove
  collection.schema.removeField("yrc6w4d8")

  // remove
  collection.schema.removeField("kpcc3rhb")

  // remove
  collection.schema.removeField("09f0fzgu")

  // remove
  collection.schema.removeField("rrcebvyt")

  // remove
  collection.schema.removeField("soi4ngco")

  return dao.saveCollection(collection)
})
