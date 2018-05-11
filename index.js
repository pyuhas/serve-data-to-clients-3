const express     = require('express')
const bodyParser  = require('body-parser')
const cors        = require('cors')
const data        = require('./data.json')
const app         = express()
const PORT        = process.env.PORT || 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({origin: true, credentials: true}))

function filterById(data, id){
  return data.filter(student => student.id == id)
}

app.get('/', (req, res) => res.json({data: data}))

app.get('/:id', (req, res) => {
  let result = filterById(data, req.params.id)
  if (!result[0]) {
    res.status(404).json({
      error: {
        message: "No record found!"
      }
    })
  } else {
    res.json({
    data: result
    })
  }
})

app.listen(PORT, () => console.log('Listening!'))
