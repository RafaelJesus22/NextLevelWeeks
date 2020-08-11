const express = require("express")
const server = express()

// import database
const db = require("./database/db")

// SET PUBLIC DIRECTORY
server.use(express.static("public"))

// ENABLE EXPRESS TO USE REQ.BODY
server.use(express.urlencoded({extended: true}))

// TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// ROUTES

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/search-results", (req, res) => {
    
    const search = req.query.search
    
    //return  no results if search field is empty
    if(search == "") {
       return res.render("search-results.html", {total: 0})
    }
 
    //get data from database
    db.all(`SELECT * FROM places  WHERE city LIKe '%${search}%' `, function(err, rows) {
        if(err) {
            console.log(err)
        }
        
        const total  = rows.length

        return res.render("search-results.html", {places: rows, total})
    })
    
})


server.get("/search-results/all", (req, res) => {
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            console.log(err)
        }

        const total = rows.length
        return res.render("search-results.html", {places: rows, total})
    })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)
    `
    const body = req.body
    const values = [
        body.image,
        body.name,
        body.address,
        body.address2,
        body.state,
        body.city[0],
        body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", {error: true})
        }

        console.log(this)
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
})

// INIT SERVER
server.listen(3000)
