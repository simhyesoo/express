const testRouter = require('express').Router();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_DB;
const client = new MongoClient(url);
let collection;

async function dbConnect() {
    await client.connect();
    const db = client.db('bucket');
    collection = db.collection('bucket-list');
}

testRouter.get('/test', async function (req, res) {
    const data = await collection.find().toArray();
    res.send(data);
})

testRouter.post('/test', async function (req, res) {
    console.log(req.body)
    await collection.insertOne(req.body);
    const data = await collection.find().toArray();
    res.send(data);
})

testRouter.delete('/test/:id', async function (req, res) {
    const { id } = req.params;
    console.log(typeof id)
    await collection.deleteOne({ id: Number(id) });
    const data = await collection.find().toArray();
    res.send(data);
})

testRouter.put('/test/', async function (req, res) {
    const { id, name } = req.body;
    await collection.updateOne({ id: Number(id) }, { $set: { name: name } })
    const data = await collection.find().toArray();
    res.send(data);
})

module.exports = { testRouter, dbConnect };
