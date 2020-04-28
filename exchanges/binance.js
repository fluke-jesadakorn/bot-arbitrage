require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
const BININCE_HOST = 'https://api.binance.com';
const BINANCE_KEY = process.env.BINANCE_KEY || 'Plase insert API_KEY';
const BINANCE_SECRET = process.env.BINANCE_SECRET || 'Please insert API SECRET';

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': BINANCE_KEY,
}

const dataQueryString = "recvWindow=5001&timestamp=" + Date.now().toString()

const getData = async (url, query) => {
    try {
        const result = await axios.get(`${url}${query}`)
        return await result.data
    } catch (e) {
        console.error(e)
    }
}

const secureGetData = async (arg) => {
    try {
        let signature = crypto.createHmac('sha256', BINANCE_SECRET)
            .update(dataQueryString)
            .digest('hex')

        const result = await axios.get(`${BININCE_HOST}/api/v3/account?${dataQueryString}&signature=${signature}`, {
            headers: header
        })

        return result.data
    }

    catch (e) {
        console.error(e)
    }
}

exports.binance = {
    getSymbol: getData(BININCE_HOST, '/api/v3/exchangeInfo'),
    getServerTime: getData(BININCE_HOST, '/api/v3/time'),
    getWallet: secureGetData(),
}