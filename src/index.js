const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const loginRoutes = require('./routes/userLoginRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const asksRoutes = require('./routes/asksRoutes');

//config 
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use('/api',loginRoutes);
app.use('/api',subjectRoutes);
app.use('/api',asksRoutes);

//static files
app.use('/public',express.static(path.join(__dirname,'public')));


//start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});