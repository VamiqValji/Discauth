const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("hi!");
});

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((result) =>
    app.listen(process.env.PORT || 3001, () =>
      console.log(`Listening on port ${process.env.PORT || 3001}`)
    )
  )
  .catch((err) => {
    console.log(err);
  });
