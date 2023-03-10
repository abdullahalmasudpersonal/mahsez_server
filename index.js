const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middle ware 
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y4rzkw4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        /* ------------------------- Start Foods ----------------------- */
        const datesCollection = client.db('Islamic').collection('Datess');
        /* ------------------------- End Foods ----------------------- */

        /* ------------------------- Start Islamics ----------------------- */
        const JainamazCollection = client.db('Islamic').collection('Jainamazs');
        const TazbeehCollection = client.db('Islamic').collection('Tazbeehs');
        const CapCollection = client.db('Islamic').collection('Caps');
        const attarCollection = client.db('Islamic').collection('Attars');
        const cartCollection = client.db('Carts').collection('Cart');
        /* ------------------------- End Islamics ----------------------- */

        /* ----------------------- Start Foods ---------------------------- */
        // get dates api
        app.get('/datess', async (req, res) => {
            const query = {};
            const cursor = datesCollection.find(query);
            const datess = await cursor.toArray();
            res.send(datess);
        });

        // get Jainamaz details api
        app.get('/dates/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const dates = await datesCollection.findOne(query);
            res.send(dates);
        });
        /* ----------------------- End Foods ---------------------------- */

        /* ----------------------- Start Islamics ---------------------------- */
        // get Jainamaz api
        app.get('/jainamazs', async (req, res) => {
            const query = {};
            const cursor = JainamazCollection.find(query);
            const jainamazs = await cursor.toArray();
            res.send(jainamazs);
        });

        // get Jainamaz details api
        app.get('/jainamaz/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const jainamaz = await JainamazCollection.findOne(query);
            res.send(jainamaz);
        });
        // get Tazbeeh api
        app.get('/tazbeehs', async (req, res) => {
            const query = {};
            const cursor = TazbeehCollection.find(query);
            const tazbeehs = await cursor.toArray();
            res.send(tazbeehs);
        });

        // get Tazbeeh details api
        app.get('/tazbeeh/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tazbeeh = await TazbeehCollection.findOne(query);
            res.send(tazbeeh);
        });

        // get caps api
        app.get('/caps', async (req, res) => {
            const query = {};
            const cursor = CapCollection.find(query);
            const caps = await cursor.toArray();
            res.send(caps);
        });

        // get cap details api
        app.get('/cap/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cap = await CapCollection.findOne(query);
            res.send(cap);
        });

        // get attars api
        app.get('/attars', async (req, res) => {
            const query = {};
            const cursor = attarCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // get attar details api
        app.get('/attar/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await attarCollection.findOne(query);
            res.send(product);
        });

        // delete attar api
        app.delete('/attars/:_id', async(req, res) =>{
            const _id = req.params._id;
            const query = {_id: ObjectId(_id)};
            const result = await attarCollection.deleteOne(query);
            res.send(result);
        })
        /* ------------------------------ End Islamics ----------------------- ---- */

        // post order api for database
        app.post('/cart', async (req, res) => {
            const newOrder = req.body;
            const result = await cartCollection.insertOne(newOrder);
            res.send(result);
        });



    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(('hello from Mahsez_server'));
});

app.listen(port, () => {
    console.log(`Mahsez_server app listening on port${port})`);
});