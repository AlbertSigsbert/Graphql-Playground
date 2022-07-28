const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to db & Listening to requests on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });


app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
