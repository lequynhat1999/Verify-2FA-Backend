const express = require("express")
const { initAPI } = require('./routes')
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

initAPI(app);

const port = 8080;

app.listen(port, () => {
    console.log("nodemon run with port: ", port);
})