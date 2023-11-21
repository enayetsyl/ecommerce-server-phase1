const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    const productCollection = client.db("ecommerce-server-phase1").collection("products")




//  POST ROUTE

// FOR ADD PRODUCT POST ROUTE
    app.post('/api/v1/addproduct', async(req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product)
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Ecmmerce server phase 1 is running')
})

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`)
})