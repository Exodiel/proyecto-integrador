const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

const temaRoutes = require('./routes/temaRoutes');
const contenidoRoutes = require('./routes/contenidoRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const ejercicioRoutes = require('./routes/ejercicioRoutes');

//config 
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use('/api', temaRoutes);
app.use('/api', contenidoRoutes);
app.use('/api', preguntaRoutes);
app.use('/api', ejercicioRoutes);

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));


//start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});