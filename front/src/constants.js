const backHost = 'http://localhost:8080'
const bucketName = 'itech-social-bucket'

const formatDate = (str) => {
    let date = new Date(str)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

const formatDateGetDate = (str) => {
    let date = new Date(str)
    return date.toLocaleDateString()
}

export {
    backHost,
    bucketName,
    formatDate,
    formatDateGetDate
}