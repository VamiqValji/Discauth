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
    // console.log(foundOne);
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
          payment_method: id,
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

    // const payment = await stripe.paymentIntents.create({
    //   amount,
    //   currency: "CAD",
    //   description: "Membership Subscription",
    //   payment_method: id,
    //   customer: CUSTOMER_ID,
    //   confirm: true, // skips confirmation step of payment, and goes straight to processing payment
    // });

    const subscription = await stripe.subscriptions.create({
      customer: CUSTOMER_ID,
      items: [{ plan: "price_1IcwasEdCEoU8nXu38DK2g8I" }],
      expand: ["latest_invoice.payment_intent"], //  invoice_settings.default_payment_method
      default_payment_method: id,
    });

    const status = subscription["latest_invoice"]["payment_intent"]["status"];
    const client_secret =
      subscription["latest_invoice"]["payment_intent"]["client_secret"];

    foundOne.stripeData.paymentDate = new Date().toUTCString();
    foundOne.stripeData.subscriptionId = subscription.id;
    if (membership === "Free") {
      foundOne.stripeData.membership = "Basic";
    }

    foundOne.markModified("stripeData");
    foundOne.save();

    if (status === "requires_action") {
      stripe.confirmCardPayment(client_secret).then((res) => {
        if (res.error) {
          // maybe return as res to client and display in ui
          return console.log(res.error);
        } else {
          console.log(res);
        }
      });
    }

    return res.status(200).json({
      success: true,
      tracking: "id",
      message: "Payment processed (Basic Membership).",
      status: status,
      client_secret: client_secret,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      tracking: "id",
      message: `Error: ${err.message}`,
      status: "",
      client_secret: "",
    });
  }
});

app.post("/api/cancel", async (req, res) => {
  const { /*id, amount,*/ email } = req.body;
  const foundOne = await owners.findOne({ email });

  const {
    membership,
    /*customerId, paymentDate*/ subscriptionId,
  } = foundOne.stripeData;

  const onFreeTier = membership === "Free";
  if (!onFreeTier) {
    try {
      // const stripeCustomer = await stripe.customers.retrieve(customerId);

      await stripe.subscriptions.del(subscriptionId);

      let oldPayment = {
        membership: foundOne.stripeData.membership,
        customerId: foundOne.stripeData.customerId,
        paymentDate: foundOne.stripeData.paymentDate,
        subscriptionId: foundOne.stripeData.subscriptionId,
        cancelledDate: new Date().toUTCString(),
      };

      foundOne.stripeData.pastPayments.push(oldPayment);
      foundOne.stripeData.membership = "Free";
      foundOne.stripeData.customerId = "";
      foundOne.stripeData.paymentDate = "";
      foundOne.stripeData.subscriptionId = "";
      foundOne.markModified("stripeData");
      foundOne.save();

      return res.status(200).json({
        success: true,
        message: "Subscription cancelled.",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json({
      success: false,
      message: `Can't cancel free tier!`,
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
