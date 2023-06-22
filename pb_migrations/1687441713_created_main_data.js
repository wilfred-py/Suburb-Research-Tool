migrate((db) => {
  const collection = new Collection({
    "id": "rdfqr7xcl5k5dbs",
    "created": "2023-06-22 13:48:33.134Z",
    "updated": "2023-06-22 13:48:33.134Z",
    "name": "main_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mwyrq5ln",
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
        "id": "6lo66xyf",
        "name": "main_data",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("rdfqr7xcl5k5dbs");

  return dao.deleteCollection(collection);
})
