const backHost = 'https://itech-social-back.herokuapp.com'
//const backHost = 'http://localhost:8080'
const bucketName = 'itech-social-bucket'
let token = {value: null}

const formatDate = (str) => {
    let date = new Date(str)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

const formatDateGetDate = (str) => {
    let date = new Date(str)
    return date.toLocaleDateString()
}

export {
    token,
    backHost,
    bucketName,
    formatDate,
    formatDateGetDate
}