export default {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    connected: false
}