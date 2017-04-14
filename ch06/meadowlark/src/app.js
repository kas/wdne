// npm packages
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';

// node.js packages
import path from 'path';

// our packages
import fortune from './lib/fortune';
import {logger} from './util';

// init app
const app = express();

app.disable('x-powered-by');

// set up logging
app.use(morgan('combined', {stream: logger.stream}));

app.set('views', 'src/views/');

// set up handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: 'src/views/layouts/', partialsDir: 'src/views/'}));
app.set('view engine', 'handlebars');

// app.VERB in Express documentation
// get and post are most common verbs
// method takes a path and a function
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public'))); // static middleware

// in Express, the order in which routes and middleware are added is important!

app.use((req, res, next) => {
  // if test=1 appers in the querystring for any page (and we're not running in production), the property res.locals.showTests is true
  // res.locals is part of the context that is passed to views
  res.locals.showTests = app.get('env') !== 'production' &&
      req.query.test === '1';
  next();
});

app.get('/', (req, res) => {
  // res.type('text/plain'); // sets Content-Type header
  // status code is 200 by default
  // res.send('Meadowlark Travel'); // replaces Node's low-level res.end
  res.render('home');
});

app.get('/about', (req, res) => {
  // res.type('text/plain');
  // res.send('About Meadowlark Travel');
  // var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  // res.render('about', { fortune: randomFortune });
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js',
  });
});

app.get('/headers', (req, res) => {
  res.set('Content-Type', 'text/plain');
  let s = '';
  for (const name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', (req, res) => {
  res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

// app.use is how Express adds middleware
// think of app.use as a catch-all handler for anything that didn't get matched by a route
// Express can distinguish between the 404 and 500 handlers by the number of arguments their callback functions take (covered in ch10 and ch12)
app.use((err, req, res, next) => {
  logger.error('unhandled application error:', err);
  res.status(500).send(err);
});

// export app
export default app;
