import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/userAction'
import { actionType } from '../utils/share'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const UserLogin = ({
    onEmailLogin, onLoading, onClearMessage,
    onGoogleLogin, storeLoading, storeMessage, storeLoginStatus
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const closeModalRef = useRef()
    const codeLists = {
        'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
        'auth/email-already-in-use': 'อีเมลนี้ถูกใช้แล้ว กรุณาใช้อีเมลอื่น',
        'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
        'auth/weak-password': 'รหัสผ่านจะต้องมากกว่า 6 ตัวอักษร',
        'auth/user-not-found': 'ไม่พบผู้ใช้',
        'auth/email-signup-success': 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว',
        'auth/email-login-success': 'เข้าสู่ระบบเรียบร้อยแล้ว'
    }
    const emailLoginHandler = (e) => {
        e.preventDefault()
        onLoading()
        setLoading(true)
        onEmailLogin(email, password)
    }
    useEffect(() => {
        if (storeLoginStatus === true) {
            console.log('login success')
        }
    }, [storeLoginStatus])
    useEffect(() => {
        if (storeLoading === false) {
            setLoading(false)
        }
        console.log(storeLoading)
    }, [storeLoading])
    useEffect(() => {
        if (storeMessage.message.length > 0) {
            const code = storeMessage.code
            setMessage(codeLists[code])
        } else {
            setMessage('')
        }
        if (storeMessage.type === 'success') {
            console.log('Login ok')
            console.log(closeModalRef.current)
        }
    }, [storeMessage, codeLists, message])

    if (!storeLoginStatus) {
        return (
            <div className="container">
                {storeLoading ? <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        borderRadius: "5",
                        width: 120,
                        height: 50,
                        textAlign: "center",
                        transform: "translate(-50%, -50%)",
                        opacity: "1"
                    }}
                >Loading</div> : null}
                <div className="modal-dialog row" role="document">
                    <div className="modal-content col-12">
                        <div className="card-header">
                            <div
                                className="p-2 text-center"
                            ><h5>เลือกวิธีเข้าสู่ระบบ</h5>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6 mx-auto">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#targetModal"
                                        style={{ width: "100%" }}
                                    >ล็อกอินด้วยอีเมล</button>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-6 mx-auto">
                                    <button
                                        className="btn btn-warning"
                                        onClick={
                                            () => onGoogleLogin()}
                                        style={{ width: "100%" }}
                                        data-target="#targetModal"
                                    >Google Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="targetModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog row" role="document">
                        <div className="modal-content col-10 mx-auto">
                            {loading ?
                                <div className="card-header"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}
                                >Loading</div> : null}
                            <div className="card-body">
                                <img
                                    src={require('../assets/logo.png')}
                                    alt="logo"
                                    className="card-img"
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "scale-down"
                                    }}
                                />
                                {message
                                    ? <div className="alert-danger mb-1 mt-1 p-2 text-center"
                                    >{message}</div>
                                    : null}
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={
                                                (e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={
                                                (e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 mt-1">
                                            <button
                                                className="btn btn-info"
                                                data-dismiss="modal"
                                                style={{ width: "100%" }}
                                                ref={closeModalRef}
                                            >ยกเลิก</button>
                                        </div>
                                        <div className="col-sm-6 mt-1">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{ width: "100%" }}
                                                onClick={emailLoginHandler}
                                            >เข้าสู่ระบบ</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-sm-10 mt-3 mx-auto">
                    <div className="alert-success p-3">You are already Login!!!</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        storeLoading: state.loading,
        storeMessage: state.message,
        storeLoginStatus: state.data.loginStatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onEmailLogin: (email, password) => {
            dispatch(action.onEmailLogin(email, password))
        },
        // onEmailSignup: (email, password) => {
        //     dispatch(action.onEmailSignUp(email, password))
        // },
        onGoogleLogin: () => {
            dispatch(action.onGoogleLogin())
        },
        onLoading: () => {
            dispatch({ type: actionType.LOADING })
        },
        onClearMessage: () => {
            dispatch({ type: actionType.CLEAR_MESSAGE })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
