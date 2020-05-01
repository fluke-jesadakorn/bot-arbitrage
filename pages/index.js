import Binance from './exchanges/binance'
import Login from './login'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { firebaseConfig } from './firebase/config'
import Router from 'next/router'
import * as firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/auth';

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    console.error(e)
  }
}

const Index = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.login.payload)

  React.useEffect(() => {
    auth();
  }, [])
  const auth = () => {
    firebase.auth()
      .onAuthStateChanged(user => {
        user !== null
          ? dispatch({ type: "SET_LOGIN_STATUS", payload: true })
          : dispatch({ type: "SET_LOGIN_STATUS", payload: false })
      })
  };

  if (isLogin) return (
    <>
      <Binance />
    </>)
  else return (<Login />)
}
export default Index