import express from "express"; //create features and tools for building web applications and API's
import bodyParser from "body-parser"; //Middleware for parsing incoming request bodies.
import mongoose from "mongoose"; //library for MongoDB, used to connect to the database
import cors from "cors"; //allows web applications running on different domains to access each other's resources
//Cross-Origin Resource Sharing
import dotenv from "dotenv"; //loads environment variables from a .env file into process.env.
import multer from "multer"; //handlingform-data requests, primarily used for uploading files
import helmet from "helmet"; //adds security-related HTTP headers to the response.
import morgan from "morgan"; //for logging HTTP requests in an Express app
import path from "path"; //for logging HTTP requests in an Express app
import { fileURLToPath } from "url"; //method for converting a file URL to a file path string
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb= call back
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//routes
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);//verifyToken is used to authenticate the user making the request
//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
//mongoose
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery" , true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

// In the first line, fileURLToPath function from the url module is used to convert the import.meta.url property
//to a file path. import.meta.url is a special meta property that contains the URL from which the current module is
//being loaded. The fileURLToPath function converts this URL to a file path.

// In the second line, the dirname function from the path module is used to get the directory name of the file path
// obtained in the previous step. This is assigned to the variable __dirname.

// Similarly, the first line is used to get the file name of the current module, which is assigned to the variable __filename. Together, __dirname and __filename can be used to construct file paths relative to the current module.
