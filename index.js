const express                    = require("express");
const db                         = require("./config/db");
const createRoles                = require("./libs/initialSetup");
const cors                       = require("cors");
const corsOptions                = require("./libs/cors");
const app                        = express();
const port                       = process.env.PORT || 4000;
const authRoutes                 = require("./routes/auth.routes");
const userRoutes                 = require("./routes/user.routes");
const postRoutes                 = require("./routes/post.routes");


require("dotenv").config();
createRoles();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);



/**
 * Connection to DB
 */
db()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running: " + port);
    });
  })
  .catch((error) => {
    console.log("error connecting to MongoDb ", error);
  });