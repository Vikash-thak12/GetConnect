import express from 'express'
import helmet from "helmet"
import dotenv from "dotenv"
import mongoose, { mongo } from 'mongoose';
import cors from "cors"
import bodyParser from 'body-parser';
import multer from "multer"
import morgan from "morgan"
import path from 'path'
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();

const port = process.env.PORT || 3001
const app = express();


// Middlewares 
app.use(express.json())
app.use(bodyParser.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))   // will set the directory where we are going to store our images  



// File Storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })



//A simple route
app.use((req, res) => {
    res.send("Hello World")
})

// app.post("/auth/registor", upload.single("picture"), register)


// Connection to the database
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true, 
    // useUnifiedTopology: true
})
    .then(console.log("Connection to the database is done"))


// mongoose.connect(process.env.MONGO_URL, {
//     // useNewUrlParser: true, 
//     // useUnifiedTopology: true
// }).then(() => {
//     app.listen(port, () => {
//         console.log(`Connection successful to the database`);

//     })
// }).catch((err) => console.log(`${err} did not`)
// )

// Actual server running 
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);

})