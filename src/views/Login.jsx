import React from "react";
import { Redirect } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import {Axios} from '../service'

export default function Login() {

    const [username, setUsername] = React.useState('boburmirzo')
    const [password, setPassword] = React.useState('bobur1907')
    function LoginForm(e) {
        e.preventDefault()
        

        ;(async()=>{
            try {
                if (username.length && password.length) {
                    const res = await Axios.post("/login-admin",  { username, password })
                    const data = res.data
                    // console.log(data)
                    localStorage.setItem('token', data.token)
                    window.location.href = "/admin"
                }
			} catch(err) {
			}
        })()
    }

    if (localStorage.getItem('token')) return <Redirect to="/admin" />

    return(
        <>
            <div className="container pt-5">
                <Row className="mt-5">
                    <Col md="6" className="mt-5 mx-auto">
                        <Card md="12">
                            <CardHeader className="pt-md-4 mx-auto">
                                <h3 className="title mb-0">Login</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={LoginForm}>
                                    <Row className="mx-auto" md="8">
                                        <Col className="pr-md-3 mx-auto" md="12">
                                            <FormGroup>
                                                <label>Username:</label>
                                                <Input
                                                onKeyUp={(e)=>setUsername(e.target.value)}
                                                defaultValue=""
                                                placeholder="Username"
                                                type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-3 mx-auto" md="12">
                                            <FormGroup>
                                                <label>Password:</label>
                                                <Input
                                                onKeyUp={(e)=>setPassword(e.target.value)}
                                                defaultValue=""
                                                placeholder="Password"
                                                type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="d-flex justify-content-between align-items-center pr-md-3 mx-auto" md="12">
                                            <Button className="btn-fill" color="primary" type="submit">
                                                Login
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}