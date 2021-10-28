import React, {Component } from 'react';
import {Card, Nav, Button, Table, ProgressBar, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faEdit,
    faCheck,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {Link} from "react-router-dom";



export default class ProjectsList extends Component {

    constructor(props) {
        super();
        this.state={
            projectList : []
        };
    }

    deleteProject = (projectId) => {
        axios.delete("http://localhost:8080/project/deleteProject/"+projectId)
            .then(response => {
                if (response.data != null){
                    alert("Project deleted");
                    window.location.reload();
                }});
    };
    componentDidMount() {

        axios.get("http://localhost:8080/project")
            .then(response => {
                this.setState({projectList: response})
            });
    };


    render() {
        return (


            <div>
                <Table ><tbody><tr>
                {this.state.projectList.length === 0 || this.state.projectList.length === null ?
                    <h1 className="align-content-center text-white-50">No projects available</h1> :

                    this.state.projectList.data.map(project =>

                        <Card  className="border border-dark bg-dark text-white m-2 ui-corner-left" style={{ width: '24rem' }}>




                            <Card.Header className="bg-gradient p-2" >
                                <Nav variant="pills" defaultActiveKey="#first">
                                    <Nav.Item>
                                        <Nav.Link href="#first">Project:</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-3">
                                <Card.Title><h4 className="text-uppercase">{project.status === "IN PROGRESS" ?
                                    <Spinner animation="grow" /> : <FontAwesomeIcon icon={faCheck}/>}  {project.p_name}</h4></Card.Title><hr/>
                                <Card.Text>
                                    <div className="m-2">
                                        <FontAwesomeIcon icon={faInfoCircle}/>    {project.description} </div>
                                    <ProgressBar variant={project.completion < 100 ? "primary" : "success"} now={project.completion} animated label={project.completion+"%"}/>

                                </Card.Text>
                                <Button variant="outline-primary" className="m-1">Go somewhere</Button>
                                <Button variant="outline-danger" className="m-1" onClick={this.deleteProject.bind(this , project.pid)}><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                                <Link to={"/editproject/"+project.pid} className="btn btn-sm btn-outline-warning p-2"><FontAwesomeIcon icon={faEdit}/> Modify</Link>

                            </Card.Body>

                        </Card>

                    )}
                </tr></tbody></Table>
            </div>
        );

    }

}
