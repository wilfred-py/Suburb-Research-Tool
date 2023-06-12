migrate((db) => {
  const collection = new Collection({
    "id": "ca4odtvcl8nh833",
    "created": "2023-06-11 08:22:04.557Z",
    "updated": "2023-06-11 08:22:04.557Z",
    "name": "summary_data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3ecrcujm",
        "name": "field",
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
  const collection = dao.findCollectionByNameOrId("ca4odtvcl8nh833");

  return dao.deleteCollection(collection);
})
