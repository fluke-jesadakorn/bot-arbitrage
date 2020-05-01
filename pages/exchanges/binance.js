import { Button, Input } from 'antd';
import axios from 'axios';
import crypto from 'crypto';
import { useSelector, useDispatch } from 'react-redux'
import { adminSignout } from '../firebase/command'
import { useState } from 'react';

const BININCE_HOST = 'https://api.binance.com';
const BINANCE_KEY = process.env.BINANCE_KEY || 'Plase insert API_KEY';
const BINANCE_SECRET = process.env.BINANCE_SECRET || 'Please insert API SECRET';

const Binance = () => {
    // const pairs = useSelector(state => state.trades.payload)
    const [pairs, setPairs] = useState([{
        id: 0,
        isBestMatch: true,
        isBuyerMaker: true,
        price: "",
        qty: "",
        quoteQty: "",
        time: 0
    }])
    const dispatch = useDispatch()

    const query = {
        account: {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': BINANCE_KEY,
            },
            queryUrl: '/api/v3/account',
            dataQueryString: "recvWindow=5001&timestamp=" + Date.now().toString(),
        },
    }

    const paring = [
        ["USDT", "ETH", "XRP", "USDT"],
        ["USDT", "XRP", "ETH", "USDT"],
        ["XRP", "USDT", "ETH", "XRP"],
        ["XRP", "ETH", "USDT", "XRP"],
        ["ETH", "USDT", "XRP", "ETH",],
        ["ETH", "XRP", "USDT", "ETH",],
    ]

    const signature = crypto.createHmac('sha256', BINANCE_SECRET)
        .update(query.account.dataQueryString)
        .digest('hex')

    React.useEffect(() => {
        let mydata = [];
        const paring = [
            "ETHUSDT", "XRPETH", "XRPUSDT",
            // "XRPUSDT", "XRPETH", "ETHUSDT",
            // "XRPUSDT", "ETHUSDT", "XRPETH",
            // "XRPETH", "ETHUSDT", "XRPUSDT",
            // "ETHUSDT", "XRPUSDT", "XRPETH",
            // "XRPETH", "XRPUSDT", "ETHUSDT"
        ];

        paring.map(async (pair, key) => {
            axios.get(`https://api.binance.com/api/v3/trades?symbol=${pair}&limit=1`)
                .then(res => {
                    mydata.push(...res.data)
                })
        });

        // dispatch({
        //     type: "SET_TRADES",
        //     payload: mydata
        // });
        setPairs(mydata)
    }, [])

    const getSymbol = (data) => {
        axios.get(`https://api.binance.com${data.queryUrl}${data.params}`)
            .then(res => {
                let obj = []
                console.log(res.data)
            })
            .catch(e => console.error(e))
    }

    const initialGetdata = async () => {
        let mydata = [];
        const paring = [
            "ETHUSDT", "XRPETH", "XRPUSDT",
            // "XRPUSDT", "XRPETH", "ETHUSDT",
            // "XRPUSDT", "ETHUSDT", "XRPETH",
            // "XRPETH", "ETHUSDT", "XRPUSDT",
            // "ETHUSDT", "XRPUSDT", "XRPETH",
            // "XRPETH", "XRPUSDT", "ETHUSDT"
        ];

        await paring.map(async (pair, key) => {
            await axios.get(`https://api.binance.com/api/v3/trades?symbol=${pair}&limit=1`)
                .then(res => {
                    mydata.push(...res.data)
                })
        });

        await dispatch({
            type: "SET_TRADES",
            payload: mydata
        });

        return 0;
    }

    const getTradesAPI = async (pair) => {
        const result = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${pair}&limit=1`)
            .catch(e => console.error(e))
        return result.data
    }

    const Table = (({ dataSource, column, key }) => {

        return (
            <>
                <Button onClick={() => initialGetdata()}>Refresh All</Button>
                <Button onClick={() => console.log(dataSource[0])}>Log Data</Button>
                <table>
                    <tr>
                        {column.map((data, key) => (
                            <th key={key}>{data}</th>
                        ))}
                        <th>%</th>
                        <th>Action</th>
                    </tr>

                    {pairs && (<tr>
                        <td><Input value={pairs[0].qty} /></td>
                        {/* <td><Input value={pairs[0]} /></td>
                        <td><Input value={pairs[0]} /></td>
                        <td><Input disabled value={pairs[0]} /></td> */}
                        <td>0</td>
                        <td><Button onClick={async () => {

                        }}>Refresh</Button></td>
                    </tr>)}

                </table>
                <style jsx={true}>{`
                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
                
                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                
                tr:nth-child(even) {
                    background-color: #dddddd;
                }
                `}</style>
            </>
        )
    })

    return (
        <>
            <Button onClick={adminSignout}>Signout</Button>
            {JSON.stringify(pairs)}
            {paring.map((data, key) => (
                <>
                    <Table dataSource={pairs} column={data} key={key} />
                </>
            ))}
        </>
    )
}

export default Binance