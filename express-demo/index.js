const express = require('express')
const HttpStatus = require('http-status-codes')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const courseSchema = require('./course-schema')
const logger = require('./logger')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

if (app.get('env') == 'development') {
  app.use(morgan('tiny'))
  console.log('morgan enabled')
}
app.use(logger)

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' }
]

app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.get('/api/courses/', (req, res) => {
  res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  // res.send(`id: ${req.params.id}, sorted: ${req.query.sortBy}`)
  const result = courses.find(course => course.id === parseInt(req.params.id))
  if (result) return res.send(result)
  res.sendStatus(HttpStatus.NOT_FOUND)
})

app.post('/api/courses', (req, res) => {
  // if (!req.body.name) {
  //   res.status(HttpStatus.BAD_REQUEST).send('name param is mandatory')
  //   res.end()
  // }
  const validation = Joi.validate(req.body, courseSchema) 
  if (validation.error) return res.status(HttpStatus.BAD_REQUEST).send(validation.error.details)

  if (findByName(req.body.name)) return res.status(HttpStatus.CONFLICT).send('The course already exists')

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.status(HttpStatus.CREATED).send(course)

})

app.put('/api/courses/:id', (req, res) => {
  
  let course = findById(req.params.id) //todo req.body.id should be equals or find what to do with this case in put
  if (!course) return res.sendStatus(HttpStatus.NOT_FOUND)

  const { error } = Joi.validate(req.body, courseSchema)
  if (error) return res.status(HttpStatus.BAD_REQUEST).send(error.details)

  course.name = req.body.name //todo replace whole object
  res.status(HttpStatus.OK).send(req.body)

})

app.delete('/api/courses/:id', (req, res) => {

  const course = findById(req.params.id)

  if (!course) return res.sendStatus(HttpStatus.NOT_FOUND)

  const index = courses.indexOf(course)
  courses.splice(index, 1)

  res.status(HttpStatus.OK).send(course)

})

function findByName (name) {
  return courses.find(c => c.name === name)
}

function findById (id) {
  return courses.find(c => c.id === parseInt(id))
}

app.listen(8080, console.log('starting app'))
