const axios = require('axios')
const API_HOST = 'https://api.bitkub.com',
    BITKUB_KEY = process.env.API_KEY || 'Plase insert API_KEY',
    BITKUB_SECRET = process.env.API_SECRET || 'Please insert API SECRET'

const header = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-btk-apikey': BITKUB_KEY,
}

const getData = async (url, query) => {
    try {
        const result = await axios.get(`${url}${query}`)
        return await result.data
    } catch (e) {
        console.error(e)
    }
}

exports.bitkub = {
    getSymbol: getData(API_HOST, '/api/market/symbols'),
    getServerTime: getData(API_HOST, '/api/servertime'),
    getWalletBalance: () => {

    }
}