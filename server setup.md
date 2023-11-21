1. Open CMD & go to the folder where you want to make the server project

2. Write - mkdir project-name-server

3. Write - cd project-name-server

4. Write - npm init -y

5. Write - code .

6. There will be a file in VSCode named package.json where under scripts a new property and value should be written as follows: "start":"node index.js",

7. Then in the VSCode create a file name index.js

8. install following file

npm i express cors mongodb dotenv

9. in the index.js file write following code

```javascript

const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Ecommerce server phase 1 is running')
})

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`)
})
```
10. Go to CMD and write : nodemon index.js to run server

11. Go to mongodb website and login

12. Go to database -> click connect -> click drivers and in the point 3.Add your connection string into your application code -> toggle to view full code sample and copy them.

13. Paste it into the above index.js file under middleware code put the import file at the top of the code like follows

```javascript
const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())



const uri = "mongodb+srv://<username>:<password>@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority";

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
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Ecmmerce server phase 1 is running')
})

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`)
})

```

14. You need to hide username and password in the index.js file so you have keep it in the environment variable. So create a file name .env and write DB_USER= & DB_PASS=

15. Then go to mongodb website and click Database Access in the Password Authentication field write the user name and autogenerate a password  then copy username to the .env file and under DB_USER value and copy password to the DB_PASS value and in the website under Built-in Role give the permission to the user and click addUser button. Look following example

```javascript

DB_USER=ecommerce-server
DB_PASS=Gm0mdZHU8KC5EfHX


```


16. In the index.js file under imports write require(‘dotenv’).config()  then write console.log(process.env.DB_PASS) and go to cmd and check whether the password is showing . If password is showing then go to index.js and value of uri should be change to template string. Then <username> should be replaced with ${process.env.DB_USER} and <password> should be replaced with ${process.env.DB_PASS}. Then go to cmd and if you see ‘pinged your deployment. You successfully connected to MongoDB!’ then you successfully connected to mongodb. check the following example

```javascript

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
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Ecmmerce server phase 1 is running')
})

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`)
})

```


17. In the VSCode create a file named .gitignore and within write: node_modules press enter  and write .env
