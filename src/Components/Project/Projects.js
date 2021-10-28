import React , {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import * as ReactBootstrap from 'react-bootstrap';
import CardHeader from "react-bootstrap/CardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import axios from 'axios';
import {faList} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.changed =this.changed.bind(this);
        this.submitProject=this.submitProject.bind(this);

    }
    initialState = {
        pid : '',
        p_name : '',
        description : '',
        Status : '',
        Completion : ''

    }
    componentDidMount() {
        const projectId = this.props.match.params.pid;
        console.log(this.props.match.params.pid);


        if (projectId){
            this.findProjectById(projectId);

        }



    }

    findProjectById = (projectId) =>{
        axios.get("http://localhost:8080/project/"+projectId)
            .then(response =>{
                if (response.data != null){
                    this.setState({
                        pid : response.data.pid,
                        p_name : response.data.p_name,
                        description : response.data.description,
                        Status : response.data.status,
                        Completion : response.data.completion
                    });

                }
            });
    }


    submitProject= event =>{
        event.preventDefault();
        const project = {
            p_name : this.state.p_name,
            description : this.state.description,
            Status : this.state.Status,
            Completion : this.state.Completion,

        };

        const json = JSON.stringify(project);
        axios({
                method: 'post',
                url: 'http://localhost:8080/project/createProject',
                data: json,
                headers: { "Content-Type": "application/json; charset=UTF-8"  }

            }
        )
            .then(function (response) {
                alert(json);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    resetProject= () =>{
        this.setState(() => this.initialState);
    }
    changed= event =>{
        this.setState({
                [event.target.name]:event.target.value
            }
        );
    }

    updateProject = event => {
        event.preventDefault();
        const project = {
            pid: this.state.pid,
            p_name : this.state.p_name,
            description : this.state.description,
            status : this.state.Status,
            completion : this.state.Completion
        };
        const json = JSON.stringify(project);
        axios({
            method: 'put',
            url: 'http://localhost:8080/project/update/'+this.state.pid,
            data: json,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
            .then(response => {
                if (response.data != null) {
                    console.log(response.data);
                    alert("Project updated successfuly");
                }
            });
    }


    render() {
        const {p_name , description , Status , Completion } = this.state;
        return (
            <div>

                <Card className="border border-dark bg-dark text-white">
                    <CardHeader><FontAwesomeIcon icon={this.state.pid ?  faEdit : faPlusCircle}/>     {this.state.pid ? "Update" : "Create" }  project</CardHeader>
                    <Card.Body>

                        <Form onReset={this.resetProject} onSubmit={this.state.pid ? this.updateProject : this.submitProject} id="projectFormId">

                            <Form.Group className="mb-3" controlId="formBasicProjectName" >
                                <Form.Label>Project name</Form.Label>
                                <Form.Control required onChange={this.changed} value={p_name} name="p_name" type="text" placeholder="Project name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDescription" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control required onChange={this.changed} value={description} name="description"  type="textarea" placeholder="Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCompletion">
                                <Form.Label>Completion</Form.Label>
                                <Form.Control required onChange={this.changed} value={Completion} name="Completion" type="number" placeholder="Completion" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select name="Status" onChange={this.changed} value={Status}>
                                    <option>Select status...</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="IN PROGRESS">In progress</option>
                                    <option value="INACTIVE">Inactive</option>
                                </Form.Select>
                            </Form.Group>
                            <Card.Footer>
                                <ReactBootstrap.Button variant="primary" type="submit" >
                                    <FontAwesomeIcon icon={faSave}/>   {this.state.pid ? "Update" : "Create"}
                                </ReactBootstrap.Button>
                                <ReactBootstrap.Button variant="outline-light" type="reset" className="m-2">
                                    <FontAwesomeIcon icon={faUndo}/>  Reset
                                </ReactBootstrap.Button>
                                <Link to="/projects" className="btn btn-sm btn-outline-info p-2">
                                    <FontAwesomeIcon icon={faList}/> Projects list
                                </Link>
                            </Card.Footer>
                        </Form>
                    </Card.Body>

                </Card>
                <br/>
                <br/>

            </div>


        );
    }
}

