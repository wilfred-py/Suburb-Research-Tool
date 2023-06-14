migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  collection.name = "summary_data"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lpn7gchnuw11ylw")

  collection.name = "test2"

  return dao.saveCollection(collection)
})
