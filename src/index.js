const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('src/public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/api/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});


//start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});