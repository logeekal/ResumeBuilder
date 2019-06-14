const CLIENT_URL = require('./config').CLIENT_URL;
const withAuth = require('./middlewares').withAuth;
const  { DBConnection } =  require('./utils/DBConnection')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');
var uploadRoute = require('./routes/uploads');

var webpack = require('webpack');
var webpackConfig  = require('./webpack.config');
var compiler =  webpack(webpackConfig);


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const  corsOptions = {
  origin: [CLIENT_URL, 'http://localhost:3000/', 'http:localhost:9000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods :  ['GET', 'PUT', 'POST','OPTIONS'],
  credentials : true,
  allowedHeaders : ['Content-Type', 'Authorization','Set-Cookie','Cookie']
}

app.use(logger('dev'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api", cors(corsOptions), apiRouter);
app.use('/auth',cors(corsOptions) , authRouter);
app.use('/uploads', cors(corsOptions), uploadRoute);
app.get('/checkToken', withAuth, cors(corsOptions) , (req, res)=>{
  console.log(`Checking token Now`);
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.status(200);
  res.send({email:req.email});
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

DBConnection.connect();

module.exports = {app,corsOptions};
