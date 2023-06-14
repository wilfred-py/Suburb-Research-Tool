migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("31p072njz901bed");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "31p072njz901bed",
    "created": "2023-06-12 07:11:13.508Z",
    "updated": "2023-06-13 05:46:41.416Z",
    "name": "summary_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uetib0h9",
        "name": "suburb_name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "1j8uz1fn",
        "name": "people",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
