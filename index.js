const express = require('express');
const path = require('path');
const port = 8000;
// const app = express();this line means that all the functionality of express function
const app = express();
// app.set('view engine', 'ejs'):- By this line we say to express that ejs is my template engine.it is the way of writing it is the syntax
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//  app.use(express.urlencoded()); this line is a middleware it works as a body parser
app.use(express.urlencoded());
//  app.use(express.static('assets')); this line is used to add the static file(css, js,images and many more) in the webpage assests is the name of the folder
app.use(express.static('assets'));

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]
// how to we get different type of request? ans:- app.get(),app.post,app.delete,app.patch
// res.render('file name is present')
// res.redirect('path is present')
app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', function(req, res){

    return res.render('home',{
        title: "Contact List",
        contact_list: contactList
    });
})
app.post('/create-contact', function(req, res){
    
    contactList.push(req.body);
    return res.redirect('/');

});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
// app.get('/delete-contact/:phone',, function(req, res){req.params.phone will print the phone no.})
// below we use the queery params
app.get('/delete-contact/', function(req, res){
    console.log(req.query.phone);
    let phone = req.query.phone

    let contactindex = contactList.findIndex(contact => contact.phone == phone);

    if(contactindex != -1){
        contactList.splice(contactindex, 1);
    }

    return res.redirect('back');
});
