import React from 'react'
import { connect } from 'react-redux'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from 'react-router-dom'

const Profile = ({ data }) => {
    if (!data.loginStatus) {
        return (
            <div className="container">
                <Redirect to="/login" />
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-10 mx-auto text-center">
                    <div className="display-4">Profile Component</div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-10 mx-auto text-center">
                    <div className="text-success p-3">You Already Login!!</div>
                    <div className="text-secondary p-3">
                        Lorem Ipsum is simply dummy text of the printing.
                    </div>
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
export default connect(mapStateToProps)(Profile)
