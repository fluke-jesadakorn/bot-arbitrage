const app = require('express')();
const router = require('express').Router();
const { bitkub } = require('./exchanges/bitkub')
const { binance } = require('./exchanges/binance')
const PORT = process.env.PORT || 3000

router.get('/exchanges', (req, res) => {
    return
    [
        {
            bitkub: ""
        },
        {
            binance: ""
        }
    ]
})

router.get('/exchange/bitkub/getSymbol', async (req, res) => {
    try {
        res.send(await bitkub.getSymbol)
    } catch (e) {
        console.error(e)
    }
})

router.get('/exchange/bitkub/getWallet', async (req, res) => {
    try {
        res.send(await bitkub.getWallet)
    } catch (e) {
        console.error(e)
    }
})

router.get('/exchange/binance/getSymbol', async (req, res) => {
    try {
        res.send(await binance.getSymbol)
    } catch (e) {
        console.error(e)
    }
})

router.get('/exchange/binance/getWallet', async (req, res) => {
    try {
        res.send(await binance.getWallet)
    } catch (e) {
        console.error(e)
    }
})

router.get('/exchange/binance/pair', async (req, res) => {
    try {
        res.send()
    } catch (e) {
        console.error(e)
    }
})

app.use('/api', router)
app.listen(PORT, () => console.log(`server running on ${PORT}`))