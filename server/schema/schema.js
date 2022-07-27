const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const books = [
  { name: "The Land of Wind", genre: "historical", id: "1", authorId:"1" },
  { name: "Shang chi and Legend of Ten Rings", genre: "sci-fi", id: "2", authorId:"2" },
  { name: "Ozark", genre: "mystery", id: "3", authorId:"3" },
  { name: "VIP", genre: "mystery", id: "4", authorId:"2" },
  { name: "Are you human too?", genre: "romance", id: "5", authorId:"3" },
  { name: "Goblin", genre: "fantasy", id: "6", authorId:"1" },
  { name: "My love from another star", genre: "rom-com", id: "2", authorId:"2" },
];

const authors = [
  { name: "Taylor Pratchett", age: 40, id: "1" },
  { name: "Xio Li", age: 46, id: "2" },
  { name: "Tom Russo", age: 38, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author:{
       type: AuthorType,
       resolve(parent, args){
         return _.find(authors, {id: parent.authorId})
       }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id})
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code  to get data from DB/ other sources
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code  to get data from DB/ other sources
        return _.find(authors, { id: args.id });
      },
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
