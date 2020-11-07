export async function validatePasswordAndLogin(login, pass){
    return await fetch(`/login?login=${login}&password=${pass}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(json => json)
    .catch(err => err)
}

export async function createLogin(body){
    return await fetch(`/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => json)
}