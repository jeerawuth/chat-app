export const actionType = {
    GOOGLE_LOGIN: 'googleLogin',
    LOGOUT: 'googleLogout',
    EMAIL_LOGIN: 'emailLogin',
    EMAIL_SIGNUP: 'emailSignup',
    ERROR: 'authError',
    SUCCESS: 'successMessage',
    LOADING: 'loadingStatus',
    CLEAR_MESSAGE: 'clearAlertMessage'
}
export const codeLists = {
    'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
    'auth/email-already-in-use': 'อีเมลนี้ถูกใช้แล้ว กรุณาใช้อีเมลอื่น',
    'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
    'auth/weak-password': 'รหัสผ่านจะต้องมากกว่า 6 ตัวอักษร',
    'auth/user-not-found': 'ไม่พบผู้ใช้',
    'auth/email-signup-success': 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว',
    'auth/email-login-success': 'เข้าสู่ระบบเรียบร้อยแล้ว',
    'auth/too-many-requests': 'รหัสผิดพลาดหลายครั้ง กรุณาลองใหม่ในภายหลัง'
}