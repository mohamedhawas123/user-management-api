const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

sequelize.sync().then(() => console.log("Database connected."));
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
