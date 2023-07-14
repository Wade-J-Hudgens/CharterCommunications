import { users } from "./data/users"

export const getUsers = async () => {
    return await (new Response(new Blob([JSON.stringify(users)], {status: 200}))).json();
}
export const getUser = async (id) => {
    for (const user of users) {
        if (user.id === id) {
            return await (new Response(new Blob([JSON.stringify(user)], {type: 'application/json'}), {status: 200})).json();
        }
    }
    return await (new Response(new Blob([JSON.stringify({})], {type: 'application/json'}), {status: 404})).json();
}

export const patchUser = async (id, data) => {
    for (const user of users) {
        if (user.id === id) {
            for (const key of Object.keys(data)) {
                user[key] = data[key];
                return await (new Response(new Blob([JSON.stringify({})], {type: 'application/json'}), {status: 200})).json();
            }
        }
    }
    return await (new Response(new Blob([JSON.stringify({})], {type: 'application/json'}), {status: 404})).json();
}