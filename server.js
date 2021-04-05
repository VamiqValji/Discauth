const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe");

require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors({}));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/test", (req, res) => {
  res.send("hi!");
});

app.post("/api/charge", async (req, res) => {
  const { id, amount, email } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "CAD",
      description: "Membership Subscription",
      payment_method: id,
      confirm: true, // skips confirmation step of payment, and goes straight to processing payment
    });

    const customer = await stripe.customers.create({
      email: email,
    });

    console.log(`customerID: ${customer.id}`);

    // console.log(payment.receipt_url);
    return res.status(200).json({
      success: true,
      tracking: "id",
      message: "Payment processed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      tracking: "id",
      message: `Error: ${err.message}`,
    });
  }
});

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) =>
    app.listen(process.env.PORT || 3001, () =>
      console.log(`Listening on port ${process.env.PORT || 3001}`)
    )
  )
  .catch((err) => {
    console.log(err);
  });
