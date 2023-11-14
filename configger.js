require("dotenv").config()
const startupDebugger = require("debug")("app:startup")
const deDeugger = require("debug")("app:db")
const config = require("config")

deDeugger("Connected to the database...")
startupDebugger("Morgan enabled...")

// Configuration
console.log("Application Name: " + config.get("name"))
console.log("Mail Server: " + config.get("mail.host"))
