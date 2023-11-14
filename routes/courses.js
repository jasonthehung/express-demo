const express = require("express")
const router = express.Router()

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]

router.get("/", (req, res) => {
    res.send(courses)
})

router.get("/:id", (req, res) => {
    courses.find((course) => {
        if (course.id === parseInt(req.params.id)) {
            res.send(course)
        } else {
            res.status(404).send("The course with the given ID was not found")
        }
    })
})

router.post("/", (req, res) => {
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(newCourse)

    res.send(newCourse)
})

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router
