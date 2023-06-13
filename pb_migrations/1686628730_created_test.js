migrate((db) => {
  const collection = new Collection({
    "id": "oz01z6tfhvg49td",
    "created": "2023-06-13 03:58:50.797Z",
    "updated": "2023-06-13 03:58:50.797Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oalepjfq",
        "name": "Suburb",
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
  const collection = dao.findCollectionByNameOrId("oz01z6tfhvg49td");

  return dao.deleteCollection(collection);
})
