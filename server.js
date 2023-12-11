import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.post('/anime', (request, reply) => {
   const {nome, diretor, duracao } = request.body
    database.create({
        nome: nome,
        diretor: diretor,
        duracao: duracao
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/anime', (request) => {
    const search = request.query.search

    console.log(search)
    
    const animes = database.list(search)
   
    return animes
})

server.put('/anime/:id', (request, reply) => {

    const animeId = request.params.id
    const {nome, diretor, duracao } = request.body
    const anime = database.update(animeId, {
        nome,
        diretor,
        duracao,
    })
    return reply.status(204).send()
})

server.delete('/anime/:id', (request, reply) => {
    const animeId = request.params.id

    database.delete(animeId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})