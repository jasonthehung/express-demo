const Joi = require("joi")
const express = require("express")
const app = express()

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]

app.use(express.json()) // ??

app.get("/api/courses", (req, res) => {
    res.send(courses)
})

app.get("/api/courses/:id", (req, res) => {
    courses.find((course) => {
        if (course.id === parseInt(req.params.id)) {
            res.send(course)
        } else {
            res.status(404).send("The course with the given ID was not found")
        }
    })
})

app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(newCourse)

    res.send(newCourse)
})

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(
        (course) => course.id === parseInt(req.params.id)
    )
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found")

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name
    res.send(course)
})

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(
        (course) => course.id === parseInt(req.params.id)
    )
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found")

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    }
    return Joi.validate(course, schema)
}

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
