migrate((db) => {
  const collection = new Collection({
    "id": "31p072njz901bed",
    "created": "2023-06-12 07:11:13.508Z",
    "updated": "2023-06-12 07:11:13.508Z",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("31p072njz901bed");

  return dao.deleteCollection(collection);
})
