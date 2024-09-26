import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import router from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

// Ensure public/assets directory exists
if (!fs.existsSync(path.join(__dirname, 'public/assets'))) {
    fs.mkdirSync(path.join(__dirname, 'public/assets'), { recursive: true });
}

// Middlewares
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// // File Storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/assets');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage });

// Simple route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Register route with file upload
// app.post('/auth/register', upload.single('picture'), register);


// Routes
app.use('/auth', router)

// Connection to the database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connection to the database is done'))
    .catch((error) => console.error(`Database connection error: ${error.message}`));

// Actual server running
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
