// INIT DATABASE
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

/*

db.serialize( () => {

    // CREATE TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // INSERT DATA 
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?
        );
    `
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N°764",
        "Santa Catarina",
        "Rio do Sul", 
        "Papeis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) { 
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    //db.run(query, values, afterInsertData)

    //QUERY
    db.all(`SELECT id FROM places`, function(err, rows) {
        if(err) {
            console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })
    
    // DELETE
    db.run(`DELETE FROM places`, function(err) {
        if(err) {
            console.log(err)
        }
        
        console.log("Registro deeltado com sucesso")
    })

})

*/

