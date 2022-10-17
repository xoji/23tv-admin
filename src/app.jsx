import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import AdminLayout from "layouts/Admin/Admin"
import Login from 'layouts/Admin/Auth.jsx'
import SerialInfo from 'views/SerialInfo.jsx'
export default function App() {
    return(
        <>
         <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/admin" component={AdminLayout} />
            <Route path="/serials/:movieId" component={SerialInfo} exact/>
            <Redirect from='*' to='/login' />
        </Switch>
        </>
    )
}
