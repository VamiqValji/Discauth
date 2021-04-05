const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const owners = require("./models/ownersModel");
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
    const foundOne = await owners.findOne({ email: email });
    console.log(foundOne);
    const { customerId, membership } = foundOne.stripeData;
    let customer;
    let CUSTOMER_ID;
    if (!foundOne)
      return res.status(400).json({
        success: false,
        tracking: "id",
        message: `Couldn't find user.`,
      });

    if (foundOne) {
      const isAPreviousCustomer = customerId !== "";
      if (!isAPreviousCustomer) {
        customer = await stripe.customers.create({
          email: email,
        });
        foundOne.stripeData.customerId = customer.id;
        CUSTOMER_ID = customer.id;
      } else {
        CUSTOMER_ID = customerId;
      }
      if (membership === "Basic") {
        return res.status(400).json({
          success: false,
          tracking: "id",
          message: `Already at 'Basic' membership tier...`,
        });
      }
    }

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "CAD",
      description: "Membership Subscription",
      payment_method: id,
      customer: CUSTOMER_ID,
      confirm: true, // skips confirmation step of payment, and goes straight to processing payment
    });

    foundOne.stripeData.paymentDate = new Date().toUTCString();
    if (membership === "Free") {
      foundOne.stripeData.membership = "Basic";
    }

    foundOne.markModified("stripeData");
    foundOne.save();

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
