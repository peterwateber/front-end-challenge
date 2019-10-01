const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000

//COMMENTED = PRODUCTION BUILDS!

app.use(express.static(path.join(__dirname, "build")))

app.get("/*", function(req, res) {
	res.sendFile(path.resolve(__dirname, "build", "index.html"))
})

app.listen(PORT, () => {
	console.log(`\n\nCheck out the app at http://localhost:${PORT}`)
})
