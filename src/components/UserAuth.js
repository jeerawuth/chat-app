import React from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/userAction'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthForm from './AuthForm'
const UserLogin = ({
    onEmailLogin, onEmailSignUp,
    onGoogleLogin, data
}) => {
    let message = null
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
    } else {
        message = null
    }
    if (!data.loginStatus) {
        return (
            <AuthForm
                title='เข้าสู่ระบบ'
                message={message}
            />
        )
    }
    return (
        <div>
            <div>You are already Login!!!</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
