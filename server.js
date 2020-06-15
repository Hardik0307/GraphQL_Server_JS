var express = require('express');
var express_graphql  = require('express-graphql');
var {buildSchema} = require('graphql')

var schema = buildSchema(`
    type Query {
        book(id: Int!): Book
        books(genre: String): [Book]
    },
    type Book {
        id: Int
        title: String
        author: String
        description: String
        genre: String
    }
`);
var booksData = [
    {
        id: 1,
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'Atomic Habits is the definitive guide to break bad behaviors and adopt good ones in four steps, showing you how small, incremental, everyday routines compound and add up to massive, positive change over time.',
        genre : 'Selfhelp'
    },
    {
        id: 2,
        title: 'Long Walk to Freedom',
        author: 'Nelson Mandela',
        description: 'Long Walk to Freedom is the 1994 autobiography of Nelson Mandela, detailing his ascent from an anti-apartheid activist and Robben Island-jailed terrorist, to ANC leader and a cultural icon.',
        genre : 'Autobiography'
    },
    {
        id: 3,
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        description: 'Think and Grow Rich by Napoleon Hill examines the psychological power of thought and the brain in the process of furthering your career for both monetary and personal satisfaction.',
        genre : 'Selfhelp'
    }
]
var getBook = function(args) { 
    var id = args.id;
    return booksData.filter(book=> {
        return book.id == id;
    })[0];  
}
var getBooks= function(args) {
    if (args.genre) {
        var genre = args.genre;
        return booksData.filter(book => book.genre === genre);
    } else {
        return booksData;
    }
}
var root = {
    book: getBook,
    books: getBooks
};
var app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, ()=> console.log('Server is responding at 4000'));

//query getBook($gen: Int!){
    // book(id : $gen){
    //     title
    //   }
    // }
    
    // query getBooks($gen: String){
    //   books(genre :$gen){
    //     title
    //   }
    // }