
require('dotenv').config();
const express  = require('express')
const app = express()
const path = require('path');
const cors = require('cors');


// const allowedOrigins = [
//   'https://classy-shortbread-ec361f.netlify.app', // موقعك على Netlify
//   'http://localhost:4000' // أثناء التطوير المحلي
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.use(express.json());


const connectDB = require('./config/db');
connectDB();

app.get("/", (req, res, next) => {
    res.json("welcome")
})

const userRoutes = require('./routes/userroutes'); // أو الاسم اللي سميت الملف بيه
const taskRoutes = require("./routes/tasksroute");

app.use('/api/users', userRoutes);
app.use("/api/tasks", taskRoutes);



app.use(express.static(path.join(__dirname, 'front-end')));

// لو فتح أي URL مش موجود، يرجع index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
});


app.use((err, req, res, next) => {
  console.error('❌ Error middleware caught:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});


app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
})