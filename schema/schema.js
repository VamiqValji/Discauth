const graphql = require("graphql");
const _ = require("lodash");
// const Book = require("../models/book");
// const Author = require("../models/author");
const owners = require("../models/ownersModel");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull, // cannot be null
} = graphql;

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    googleId: {
      type: GraphQLID,
      resolve(parent, args) {
        // console.log(parent, args);
        // return _.find(authors, { id: parent.authorID });
        // return Author.findById(parent.authorID);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    owner: {
      type: OwnerType,
      args: {
        googleId: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // console.log("root", parent, args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        discordID: { type: new GraphQLNonNull(GraphQLString) },
        discordName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        googleId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // console.log(parent, args);
        // let isDuplicate =
        owners.findOne({ googleId: args.googleId }).then((res) => {
          const isFound = res !== null;
          if (!isFound) {
            let owner = new owners({
              discordID: args.discordID,
              discordName: args.discordName,
              email: args.email,
              googleId: args.googleId,
              verificationCode:
                Math.random().toString(36).substring(7) +
                Math.random().toString(36).substring(7),
              verified: false,
            });
            return owner.save();
          }
        });
      },
    },
  },
});

/* 
  discordID: String,
  discordName: String,
  servers: Array,
  email: String,
  googleId: String,
  verificationCode: String,
  verified: Boolean,
*/

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
