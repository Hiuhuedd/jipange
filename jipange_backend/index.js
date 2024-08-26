const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const goalsRouter = require('./routes/goals');
const tasksRouter = require('./routes/tasks');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Fetch the MongoDB URI
console.log(MONGO_URI);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/goals', goalsRouter);
app.use('/api/tasks', tasksRouter);
app.get('/', (req, res) => {
  res.send('Jipange API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
