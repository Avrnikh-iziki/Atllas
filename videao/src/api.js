
const basUrl = "http://127.0.0.1:8000/api"
const token = JSON.parse(localStorage.getItem("token"))

async function login({ email, password }) {

    try {
        const res = await fetch(`${basUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        const { token, user } = await res.json()
        if (token != undefined) {
            localStorage.setItem("user", JSON.stringify({ id: user.id, email: user.email }))
            localStorage.setItem('token', JSON.stringify(token))
            return true
        } else return false

    } catch (err) {
        return false
    }
}
async function logout() {

    try {
        const res = await fetch(`${basUrl}/auth/logout`, {
            method: 'POST',
            body: {},
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
        const { message } = await res.json()
        if (message == "logged out") {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return true
        } else return false

    } catch (err) {
        console.error(err)
    }
}
async function register({ email, password }) {
    try {
        const res = await fetch(`${basUrl}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                name: "najib",
                email,
                password,
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        const { token } = await res.json()
        if (token != undefined) return true
        else return false
    } catch (err) {
        console.error(err)
    }
}
async function project() {

    const id = JSON.parse(localStorage.getItem("user"))?.id

    try {
        const res = await fetch(`${basUrl}/projects/${id}/render`, {
            method: 'POST',
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
        const { project } = await res.json()
        if (project) return project

    } catch (err) {
        console.error(err)
    }
}
async function createproject({ name }) {
    try {
        const res = await fetch(`${basUrl}/projects`,
            {
                method: 'POST',
                body: JSON.stringify({ name }),
                headers: { Accept: "application/json", 'Content-type': 'application/json; charset=UTF-8', Authorization: `Bearer ${token}` }
            })
        return (res.status == 201)

    } catch (err) {
        throw (err)
    }
}
async function deletaccount({ confirm }) {
    try {
        const res = await fetch(`${basUrl}/user/delete`, {
            method: 'POST',
            headers: { Accept: "application/json", Authorization: `Bearer ${token}`, 'X-confirm': confirm }
        })
        const message = await res.json()
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        if (message) return false
    } catch (err) {
        console.error(err)
    }
}
async function savePrject({ id, obj }) {
    try {
        const res = await fetch(`${basUrl}/projects/${id}`, {
            method: 'POST',
            body: JSON.stringify({ id, obj }),
            headers: { 'Content-type': 'application/json; charset=UTF-8', Accept: "application/json", Authorization: `Bearer ${token}` }
        })
        const respose = await res.json()
    } catch (err) {
        console.error(err)
        return false
    }

}
async function deletproject({ id, confirm }) {
    console.log(confirm)
    try {
        let res = await fetch(`${basUrl}/projects/${id}/delete`, {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { Accept: "application/json", Authorization: `Bearer ${token}`, 'X-confirm': confirm }
        })
        res = await res.json()
        if (res = "project deleted") window.location.href = "/"
    } catch (err) {
        console.error(err)
    }
}
async function getoneproject(id) {
    try {
        const res = await fetch(`${basUrl}/projects/${id}/one`, {
            method: 'POST',
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
        const project = await res.json()
        if (project) return project
    } catch (err) {
        console.error(err)
    }
}

export {
    project,
    login,
    logout,
    deletaccount,
    createproject,
    savePrject,
    deletproject,
    register,
    getoneproject,
}