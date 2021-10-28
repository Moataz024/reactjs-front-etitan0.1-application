import React , {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import * as ReactBootstrap from 'react-bootstrap';
import CardHeader from "react-bootstrap/CardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";
import axios from 'axios';
import {faEdit, faList} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


export default class Users extends Component {


    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.changed =this.changed.bind(this);
        this.submitUser=this.submitUser.bind(this);

    }
    initialState = {
        uid : '',
        first_name : '',
        last_name : '',
        email : '',
        role : '',
        phone : '',
        password : '',
    }
    componentDidMount() {
        const userId = this.props.match.params.uid;
        if (userId){
            this.findUserByUid(userId);
        }
    }

    findUserByUid = (userId) =>{
        axios.get("http://localhost:8080/user/"+userId)
            .then(response =>{
               if (response.data != null){
                   this.setState({
                       uid : response.data.uid,
                       first_name : response.data.first_name,
                       last_name : response.data.last_name,
                       email : response.data.email,
                       password : response.data.password,
                       role : response.data.role,
                       phone : response.data.phone
                   });
               };
            });
    }

    submitUser= event =>{
        event.preventDefault();
        let user = {
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            email : this.state.email,
            password : this.state.password,
            role : this.state.role,
            phone : this.state.phone
        };
        const json = JSON.stringify(user);
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/createUser',
            data: json,
            headers: { "Content-Type": "application/json; charset=UTF-8"}
        }
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    resetUser= () =>{
        this.setState(() => this.initialState);
    };
    changed= event =>{
        this.setState({
            [event.target.name]:event.target.value
            }
        );
    };
    updateUser = event =>{
        event.preventDefault();
        const user = {
            uid : this.state.uid,
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            email : this.state.email,
            password : this.state.password,
            role : this.state.role,
            phone : this.state.phone
        };
        const json = JSON.stringify(user);
        axios({
            method: 'put',
            url: 'http://localhost:8080/user/createUser',
            data: user,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
            .then(response =>{
                if (response.data != null){
                    console.log(response.data);
                    alert("User updated successfuly");
                }
            });

    };
    render() {
        const {first_name , last_name , email , password , role , phone} = this.state;
        return (
            <div>
            <Card className="border border-dark bg-dark text-white">
                <CardHeader> <FontAwesomeIcon icon={this.state.uid ? faEdit : faPlusCircle}/>   {this.state.uid ? "Update user" : "Create a new user"}</CardHeader>
                    <Card.Body>

                        <Form onReset={this.resetUser} onSubmit={this.state.uid ? this.updateUser : this.submitUser} id="userFormId">

                            <Form.Group className="mb-3" controlId="formBasicFirstName" >
                                <Form.Label>First name</Form.Label>
                                <Form.Control required onChange={this.changed} value={first_name} name="first_name" type="text" placeholder="First name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLastName" >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required onChange={this.changed} value={last_name} name="last_name"  type="text" placeholder="Last name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required onChange={this.changed} value={email} name="email" type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required onChange={this.changed} value={password} name="password"  type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control onChange={this.changed}  value={phone} name="phone" type="text" placeholder="example : +216 99 999 999" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Select name="role" onChange={this.changed} value={role}>
                                <option>Select role...</option>
                                <option>Project Manager</option>
                                <option>Employee</option>
                            </Form.Select>
                            </Form.Group>

                            <Card.Footer >

                                    <ReactBootstrap.Button variant="primary" type="submit"  >
                                      <FontAwesomeIcon icon={faSave}/> {this.state.uid ? "Update" : "Save"}
                                    </ReactBootstrap.Button>
                                <ReactBootstrap.Button variant="outline-light" type="reset" className="m-2">
                                    <FontAwesomeIcon icon={faUndo}/>  Reset
                                </ReactBootstrap.Button>
                                <Link to="/displayUsers" className="btn btn-sm btn-outline-info p-2">
                                      <FontAwesomeIcon icon={faList}/> Users list
                                </Link>

                            </Card.Footer>
                        </Form>
                    </Card.Body>


            </Card>
            <br></br><br></br>
            </div>


        );
    }
}

