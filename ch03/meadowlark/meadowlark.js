var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
    .create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// app.VERB in Express documentation
// get and post are most common verbs
// method takes a path and a function
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public')); // static middleware

var fortunes = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    'Do not fear what you don\'t know.',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.',
];

// in Express, the order in which routes and middleware are added is important!

app.get('/', (req, res) => {
    // res.type('text/plain'); // sets Content-Type header
    // status code is 200 by default
    // res.send('Meadowlark Travel'); // replaces Node's low-level res.end
    res.render('home');
});

app.get('/about', (req, res) => {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

// app.use is how Express adds middleware
// think of app.use as a catch-all handler for anything that didn't get matched by a route
// Express can distinguish between the 404 and 500 handlers by the number of arguments their callback functions take (covered in ch10 and ch12)
// custom 404 page
app.use((req, res, next) => {
    // res.type('text/plain');
    res.status(404); // replaces res.writeHead
    // res.send('404 - Not Found');
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    // res.type('text/plain');
    res.status(500);
    // res.send('500 - Server Error');
    res.render('500');
});

app.listen(app.get('port'), () => {
    const port = app.get('port');
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate.`);
});