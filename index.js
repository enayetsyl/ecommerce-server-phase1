const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const orderCollection = client.db("ecommerce-server-phase1").collection("orders")

// GET ROUTE------------

// FOR ALL PRODUCTS 

    app.get('/api/v1/allproducts', async(req, res) => {
      const result = await productCollection.find().toArray()
      res.send(result)
    })

// EDIT PRODUCT GET ROUTE 

    app.get('/api/v1/allproducts/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productCollection.findOne(query)
      res.send(result)
    })

// ALL ORDER GET ROUTE

    app.get('/api/v1/allorders', async(req, res) => {
      const result = await orderCollection.find().toArray()
      res.send(result)
    })


// EDIT ORDER GET ROUTE 

    app.get('/api/v1/allorders/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await orderCollection.findOne(query)
      res.send(result)
    })

//  POST ROUTE-----------

// FOR ADD PRODUCT POST ROUTE
    app.post('/api/v1/addproduct', async(req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product)
      res.send(result)
    })

//  FOR ADD ORDER POST ROUTE
    app.post('/api/v1/order', async(req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order)
      res.send(result)
    })

// PATCH ROUTE--------------

// EDIT PRODUCT PATCH ROUTE

    app.patch('/api/v1/allproducts/:id', async(req, res) => {
      const id = req.params.id;
      const updatedProductData = req.body;
      const query = {_id: new ObjectId(id)}
      const updateDoc = {
        $set: {
          category: updatedProductData.category,
          color: updatedProductData.color,
          desc: updatedProductData.desc,
          featured_image: updatedProductData.featured_image,
          gallery_image: updatedProductData.gallery_image,
          size: updatedProductData.size,
          title: updatedProductData.title,
          rprice: updatedProductData.rprice,
          sprice: updatedProductData.sprice,
        }
      }
      const result = await productCollection.updateOne(query, updateDoc)
      res.send(result)
    })


// DELETE ROUTE ------------------------

// FOR DELETE PRODUCT ROUTE
    app.delete('/api/v1/allproduct/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productCollection.deleteOne(query)
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