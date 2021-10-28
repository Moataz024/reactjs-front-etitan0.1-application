import React, {Component} from 'react';
import {Card, Nav, Button, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEdit,
    faTrash,
    faMailBulk,
    faPhoneAlt,
    faBriefcase,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {Link} from "react-router-dom";
import ChargeUser from "./ChargeUser";


export default class UsersList extends Component {

    constructor(props) {
        super();
        this.state={
          userList : [],
            selectedUser : 1,
            tab : 1,
            selectedUser1 : 1
        };
    }


    componentDidMount() {

        axios.get("http://localhost:8080/user")
            .then(response => {
                this.setState({userList: response})
            });
    };
    setToggleState(ts,userId){
        this.setState({
            selectedUser1 : userId,
            tab : ts
        });
    }

    toggleTab= (t,userId) => {
        this.setToggleState(t,userId);

    }

    deleteUser = (userId) => {
        axios.delete("http://localhost:8080/user/deleteUser/"+userId)
            .then(response => {
                if (response.data != null){
                    alert("User deleted");
                    window.location.reload();
                }});
                };


    render() {
        return (



            <div>
                <Table><tbody><tr><td>
            {this.state.userList.length === 0 || this.state.userList.length === null ?
                    <h1 className="align-content-center text-white-50">No users available</h1> :
                this.state.userList.data.map(user =>


        <Card  className="border border-dark bg-dark text-white m-2 ui-corner-left" style={{ width: '24rem' }}>




                <Card.Header className="bg-gradient p-2" >
                    <Nav variant="pills" defaultActiveKey={this.state.tab === 1 ? "#userdetails" : this.state.tab === 2 ? "#"+user.uid+"#userprojects" : "#"+user.uid+"#usertasks"} onChange={this.changed}>
                        <Nav.Item>
                            <Nav.Link href="#userdetails"  onClick={()=> this.toggleTab(1,user.uid)}>User details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={()=>this.toggleTab(2,user.uid)} href={"#"+user.uid + "#userprojects"}>Projects</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={()=>this.toggleTab(3,user.uid)} href={"#"+user.uid+"#usertasks"} >
                                Tasks
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="p-3">

                    <Card.Title><h4 className="text-uppercase"><FontAwesomeIcon icon={faUser}/>    {user.first_name + " " + user.last_name}</h4></Card.Title><hr/>
                    {this.state.tab === 1 ?

                    <Card.Text>

                        <FontAwesomeIcon icon={faMailBulk}/>    {user.email} <br/>
                        <FontAwesomeIcon icon={faPhoneAlt}/>    {user.phone !== null ? user.phone : "No phone number given"}<br/>
                         <FontAwesomeIcon icon={faBriefcase}/>     {user.role}   <br/>



                    </Card.Text>: this.state.tab === 2 ?
                        <Card.Text>

                                {user.projects.map((p,index) =>
                            <div key={index}>

                                <h5>
                                    {!p ?
                                        <div>
                                            No Projects
                                        </div>
                                :
                                        <div>
                                            In charge of  :  <Link to={"/projects"} className="btn btn-sm btn-outline-info p-2 text-uppercase" >{p.p_name}</Link>
                                        </div>
                                    }
                                </h5>
                            </div>)}

                        </Card.Text>:
                            <Card.Text>

                                {user.tasks.map((t,index)=>
                                    <div key={index}>

                                        <h5>
                                            {!t ?
                                                <div>
                                                    No Tasks
                                                </div>
                                                :
                                                <div>
                                                    In charge of  :  <Link to={"/tasks"} className="btn btn-sm btn-outline-info p-2 text-uppercase" >{t.task_name}</Link>
                                                </div>
                                            }
                                        </h5>
                                    </div>)}


                            </Card.Text>}


                    <Button variant="outline-primary" className="m-1" onClick={() =>  this.setState({selectedUser: user.uid})}><FontAwesomeIcon icon={faPlus}/> Charge </Button>
                    <Button variant="outline-danger " className=" m-1" onClick={this.deleteUser.bind(this , user.uid)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                    <Link to={"edit/"+user.uid} className="btn btn-sm btn-outline-warning p-2"><FontAwesomeIcon icon={faEdit}/> Modify</Link>

                </Card.Body>

            </Card>)}

                </td><td width="800">
                    <div  className="w-500 align-content-center bg-gradient p-4">

                    <ChargeUser val={this.state.selectedUser}/>

                    </div>
            </td></tr>

                </tbody></Table>

                </div>
        );

        }

}
