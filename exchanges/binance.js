const axios = require('axios')
const API_HOST = 'https://api.binance.com',
    BINANCE_KEY = process.env.API_KEY || 'Plase insert API_KEY',
    BINANCE_SECRET = process.env.API_SECRET || 'Please insert API SECRET'

const getData = async (url, query) => {
    try {
        const result = await axios.get(`${url}${query}`)
        return await result.data
    } catch (e) {
        console.error(e)
    }
}

exports.binance = {
    getSymbol: getData(API_HOST, '/api/v3/exchangeInfo'),
    getServerTime: getData(API_HOST, '/api/v3/time'),
}