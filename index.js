const helmet = require("helmet")
const morgan = require("morgan")
const Joi = require("joi")

const courses = require("./routes/courses")

const express = require("express")
const app = express()

app.use(express.json()) // Middleware
app.use(express.static("public")) // Middleware

// Middleware
app.use(helmet())
if (app.get("env") === "development") {
    app.use(morgan("tiny"))
}
app.use("/api/courses", courses)

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
