import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/userAction'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const UserSignup = ({
    onEmailSignup, onEmailLogin,
    onGoogleLogin, data
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let message = null
    let messageTag = null
    const codeLists = {
        'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
        'auth/email-already-in-use': 'อีเมลนี้ถูกใช้แล้ว กรุณาใช้อีเมลอื่น',
        'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
        'auth/weak-password': 'รหัสผ่านจะต้องมากกว่า 6 ตัวอักษร',
        'auth/user-not-found': 'ไม่พบผู้ใช้',
        'auth/email-signup-success': 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว'
    }
    if (data.message) {
        const code = data.message.code
        message = codeLists[code]
        const messageClass = data.message.classType
        if (messageClass === 'error') {
            messageTag = <div
                className="alert-danger mb-1 mt-1 p-2 text-center"
            >{message}</div>
        } else if (messageClass === 'success') {
            messageTag = <div
                className="alert-success mb-1 mt-1 p-2 text-center"
            >{message}</div>
        }
    } else {
        message = null
    }
    const emailLoginHandler = (e) => {
        e.preventDefault()
        onEmailSignup(email, password)
    }
    if (!data.loginStatus) {
        return (
            <div className="container">
                <div className="modal-dialog row" role="document">
                    <div className="modal-content col-12">
                        <div className="card-header">
                            <div
                                className="p-2 text-center"
                            ><h5>เลือกวิธีลงทะเบียน</h5>
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
                                    >ลงทะเบียนด้วยอีเมล</button>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-6 mx-auto">
                                    <button
                                        className="btn btn-warning"
                                        onClick={
                                            () => onGoogleLogin()}
                                        style={{ width: "100%" }}
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
                                {messageTag}
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
                                        <div className="col-sm-6">
                                            <button
                                                className="btn btn-info"
                                                data-dismiss="modal"
                                                style={{ width: "100%" }}
                                            >ยกเลิก</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                style={{ width: "100%" }}
                                                onClick={emailLoginHandler}
                                            >ลงทะเบียน</button>
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
        <div>
            <div>You are already Signup!!!</div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onEmailLogin: (email, password) => {
            dispatch(action.onEmailLogin(email, password))
        },
        onEmailSignup: (email, password) => {
            dispatch(action.onEmailSignUp(email, password))
        },
        onGoogleLogin: () => {
            dispatch(action.onGoogleLogin())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSignup)
