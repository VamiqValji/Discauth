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
        console.log(parent, args);
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
        console.log("root", parent, args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation,
});
