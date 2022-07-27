
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://WilliamMasters:Sid_skater10@cluster0.hvlhiot.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



client.connect();
/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

async function testConnection() {
  try {
    await client.db("admin").command({ping: 1});
    console.log("Connected successfully to server");

  } finally {
    await client.close();
  }
}

async function getAllData() {
  let collection = client.db("cocktailsDB").collection("cocktails");

  const cursor = collection.find({});
  const newData = await cursor.toArray();
  //console.log("New Data:");
  //console.log(newData);
  return newData;
}

async function insertNewCocktail(data) {
  let collection = client.db("cocktailsDB").collection("cocktails");

  collection.insertOne(data, (err, res) => {
    if(err) {
      console.log(err);
      throw err;
    }

    console.log("New Cocktail added!");
  });
}


module.exports = {

  test: function() {
    console.log("db.test");
    testConnection().catch(console.dir);
  },

  getAllData: function() {
    return new Promise((resolve, reject) => {
      console.log("db.getAllData");

      getAllData().then(function(data) {
        console.log("Data Recived");
        resolve(data);
      });
    });


  },

  insertNewCocktail: function(data) {
    insertNewCocktail(data);
  }

}
