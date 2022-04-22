const express = require('express');
const app = express()
const session = require('express-session')
const routes = require("./routes/");
const port = process.env.PORT || 3000

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'seller secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})