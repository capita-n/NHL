const axios = require('axios')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

//Article Type
const ArticleType = new GraphQLObjectType({
    name: 'Artcle',
    fields: () => ({
        id: {type: GraphQLID},
        author: {type:  GraphQLString},
        title: {type: GraphQLString},
        urlToImage: {type: GraphQLString},
        publishedAt:{type: GraphQLString},
        content:{type: GraphQLString},
        description:{type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        articles:{
            type: new GraphQLList(ArticleType),
            resolve(parent, args){
                return axios.get('https://newsapi.org/v2/top-headlines?country=ng&apiKey=3a0570d80ebc48d095f3b31db738e453')
                    .then(response => response.data.articles);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})