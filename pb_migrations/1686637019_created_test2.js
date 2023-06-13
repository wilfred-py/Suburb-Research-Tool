migrate((db) => {
  const collection = new Collection({
    "id": "lpn7gchnuw11ylw",
    "created": "2023-06-13 06:16:59.039Z",
    "updated": "2023-06-13 06:16:59.039Z",
    "name": "test2",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rwzfxru0",
        "name": "summary_data",
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
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw");

  return dao.deleteCollection(collection);
})
