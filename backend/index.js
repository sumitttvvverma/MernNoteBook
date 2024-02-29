const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000
app.use(cors())
app.use(express.json()); //middleware se terminal m vo output mila jo thunderClient>json>mein {} m likha tha

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`inotebook backend app is listening on port ${port}`)
})