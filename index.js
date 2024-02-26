const express = require("express")

/*
- Query params => MediaQueryListEvent.com/users?nome=Gustavo&age=31 // filtros
- Route params => /users/2    // BUSCAR, DELETAR OU AUTALIZAR
- Request Body =. {"name": "Gustavo", "age": "32"}

- GET        =>BUSCAR INFORMAÇÕES NO BACK-END
- POST       => CRIAR INFORMAÇÃO NO BACK-END
- OUT / PATH => ALTERAR/ATALIZAR INFORMAÇÃO NO BACK-END
- DELETE     => DELETAR INFORMAÇÃO DO BACK-AND

- Mddleware  => INTERCEPTADOR => tem o poder de parar  ou alterar dados da requisição
*/
/*
const port = 3000

const app = express()

app.get("/users/:id", (request, response) => {

const {id} = request.params
console.log(id)

    const name = request.query.name
    const age = request.query.age
    // ou const{name,age} = request.query
    console.log(name, age)

    return response.json({name: name, age: age})
    //ou   return response.json({name,age}) se forem iguais
})

app.listen(port, () => {
    console.log(`🚀 server started on port ${3000}`)
})







//c- Route params => /users/2    // BUSCAR, DELETAR OU AUTALIZAR

const port = 3000

const app = express()

app.get("/users/:id", (request, response) => {

const {id} = request.params
console.log(id)

    return response.json({id})
   
})

app.listen(port, () => {
    console.log(`🚀 server started on port ${3000}`)
})



//- Request Body =. {"name": "Gustavo", "age": "32"}


const port = 3000
const app = express()
app.use(express.json())

app.get("/users", (request, response) => {

const {name, age} = request.body

    return response.json({name, age})
   
})


app.listen(port, () => {
    console.log(`🚀 server started on port ${3000}`)
})

*/
const port = 3000
const app = express()
app.use(express.json())
const uuid = require("uuid")


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "user not fond" })
    }
    request.userIndex = index
    request.userId = id

    next()
}

app.get("/users", (request, response) => {

    return response.json(users)
})


app.post("/users", (request, response) => {
 
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return response.status(201).json(user)
})


app.put("/users/:id", checkUserId, (request, response) => {
    const { name, age } = request.body

    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})



app.delete("/users/:id", checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})


















app.listen(port, () => {
    console.log(`🚀 server started on port ${port}`)
})


