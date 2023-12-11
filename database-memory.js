import { randomUUID } from "crypto"

export class DatabaseMemory{
    #animes = new Map()

list(search){
    return Array.from(this.#animes.entries()).map((animeArray) => {
        const id = animeArray[0]

        const data = animeArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(anime => {
        if (search){
        return anime.nome.includes(search)
        }
        return true
    })
}

    create(anime){
        const animeId = randomUUID()
        this.#animes.set(animeId, anime)
    }
    
    update(id, anime){
        this.#animes.set(id, anime)
    }

    delete(id, anime){
        this.#animes.delete(id, anime)
    }
}