const fs = require('fs');
const express = require("express");
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/userbase';

let db;

const resolvers = {
   Query: {
      issueList,
   },
   Mutation: {
      issueAdd,
   },
};

async function issueList() {
   const issues = await db.collection('issues').find({}).toArray();
   return issues;
}

async function issueAdd(_, { issue }) { //issue需更新 且和按钮事件相关联
   console.time('db insert');   
   const result = await db.collection('issues').insertOne(issue);
   console.timeEnd('db insert');
   console.time('db query');   
   const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
   console.timeEnd('db query');   
   return savedIssue;
}

async function connectToDb() {
   console.time('db connect')
   const client = new MongoClient(url, { useNewUrlParser: true });
   await client.connect();
   console.log('Connected to MongoDB at', url);
   console.timeEnd('db connect')
   db = client.db();
}

const server = new ApolloServer({
   typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
   resolvers,
   formatError: error => {
      console.log(error);
      return error;
   },
});

const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
(async function () {
   try {
      await connectToDb();
      app.listen(port, () => {
         console.log(`The app server is running on port: ${port}`);
      });
   } catch (err) {
   console.log('ERROR:', err);
}
})();

server.applyMiddleware({ app, path: '/graphql' }); 

const DIST_DIR = path.join(__dirname, "/../dist");
const HTML_FILE = path.join(DIST_DIR, "mainpage.html");
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
   res.sendFile(HTML_FILE, function(err){
      if(err){
         res.status(500).send(err);
      }
   });
});