require('dotenv').config()
const axios = require('axios')
const crypto = require('crypto')
const API_HOST = 'https://api.bitkub.com',
    BITKUB_KEY = process.env.BITKUB_KEY || 'Plase insert API_KEY',
    BITKUB_SECRET = process.env.BITKUB_SECRET || 'Please insert API SECRET'

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-BTK-APIKEY': BITKUB_KEY,
}

const getData = async (url, query) => {
    try {
        const result = await axios.get(`${url}${query}`)
        return await result.data
    } catch (e) {
        console.error(e)
    }
}

const postData = async (arg) => {
    try {
        let data = {
            ts: ""
        }

        let signature = () => {
            return crypto.createHmac('sha256', BITKUB_SECRET)
                .update(JSON.stringify({ ...data, ts: +data.ts }))
                .digest('hex')
        }

        const serverTime = await getData(API_HOST, '/api/servertime')
        data['ts'] = serverTime.toString()

        const sig = signature()
        data['sig'] = sig

        const result = await axios.post(`${API_HOST}/api/market/wallet`, JSON.stringify({ sig: data.sig, ts: +data.ts }), {
            headers: header
        })

        return result.data
    }
    catch (e) {
        console.error(e)
    }
}

exports.bitkub = {
    getSymbol: getData(API_HOST, '/api/market/symbols'),
    getServerTime: getData(API_HOST, '/api/servertime'),
    getWallet: postData(),
}