import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/userAction'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const AuthForm = ({
    title,
    data,
    onEmailLogin,
    onGoogleLogin,
}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="container">
            <div className="modal-dialog row" role="document">
                <div className="modal-content col-12">
                    <div className="card-header">
                        <div
                            className="p-2 text-center"
                        ><h5>เลือกวิธี{title}</h5>
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
                                >{title}ด้วยอีเมล</button>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-6 mx-auto">
                                <button
                                    className="btn btn-warning"
                                    onClick={
                                        () => onGoogleLogin()}
                                    style={{ width: "100%" }}
                                >Google</button>
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
                                            onClick={() => onEmailLogin(email, password)}
                                        >{title}</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
