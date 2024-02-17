import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";
import { app } from "./src/app.js";
import cors from "cors"
import bodyParser from "body-parser";
import Room from "./src/routes/room.route.js"
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';


dotenv.config({
  path: "./env",
});


app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const users = [
  { id: 1, username: 'Admin', password: 'BirlaSbu' },
];

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  (username, password, done) => {
    console.log('Username:', username);
    console.log('Password:', password);

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});


connectDB()
  .then(() => {
    app.use('/rooms', Room);

    app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login-failure' }),
    (req, res) => {
      res.json({ message: 'Login successful', user: req.user });
    });

  // Logout route
  app.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
  });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
      
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED !!!", err);
  });


