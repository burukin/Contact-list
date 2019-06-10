/**
 * Created by agros on 07.06.2019.
 */
const graphQL = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphQL;

const CallType = new GraphQLObjectType({
        name: 'Call',
        fields: () => ({
        id: {type: GraphQLString},
        time: {type: GraphQLString},
        contact: {
            type: ContactType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:5000/contacts/${parentValue.to}`)
                        .then(res=> res.data);
            }
        }
    })
});

const HistoryType = new GraphQLObjectType({
        name: 'History',
        fields: () => ({
        id: {type: GraphQLString},
        calls: {type: new GraphQLList(CallType)}
    })
});

const ContactType = new GraphQLObjectType({
        name: 'Contact',
        fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        history: {
            type: HistoryType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:5000/history/${parentValue.historyid}`)
                        .then(res=> res.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        contact: {
            type: ContactType,
            args: { id: {type: GraphQLString} },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:5000/contacts/${args.id}`)
                        .then(res => res.data);
            }
        },
        contacts: {
            type: new GraphQLList(ContactType),
            resolve() {
                return axios.get(`http://localhost:5000/contacts`).then(res=>res.data);
            }
        },
        history: {
            type: HistoryType,
            args: { id: {type: GraphQLString} },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:5000/history/${args.id}`)
                        .then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addContact: {
            type: ContactType,
            args: {
                id: {type: GraphQLString},
                name: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLString},
                historyid: {type: GraphQLString}
            },
            resolve(parentValue, {id, name, phone, email, historyid}) {
                return axios.post('http://localhost:5000/contacts', {id, name, phone, email, historyid})
                    .then(res => res.data)
            }
        },
        editContact: {
            type: ContactType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:5000/contacts/${args.id}`, args)
                    .then(res => res.data)
            }
        },
        deleteContact: {
            type: ContactType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {id}) {
                return axios.delete(`http://localhost:5000/contacts/${id}`)
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});