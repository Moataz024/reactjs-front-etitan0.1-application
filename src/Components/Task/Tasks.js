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

export default class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.changed =this.changed.bind(this);
        this.submitTask=this.submitTask.bind(this);

    }
    initialState = {
        tid : '',
        task_Name : '',
        taskDescription : '',
        priority : '',
        status : '',

    }
    componentDidMount() {
        const taskId = this.props.match.params.tid;
        console.log(this.props.match.params.tid);


        if (taskId){
            this.findTaskById(taskId);

        }



    }

    findTaskById = (taskId) =>{
        axios.get("http://localhost:8080/task/"+taskId)
            .then(response =>{
                if (response.data != null){
                    this.setState({
                        tid : response.data.tid,
                        task_Name : response.data.task_Name,
                        taskDescription : response.data.taskDescription,
                        priority : response.data.priority,
                        status : response.data.status
                    });

                }
            });
    }

    submitTask= event =>{
        event.preventDefault();
        let url = "http://localhost:8080/task/createTask";
        axios.post(url,{
            task_Name : this.state.task_Name,
            taskDescription : this.state.taskDescription,
            priority : this.state.priority,
            status : this.state.status
        },{
            headers : { "Content-Type": "application/json; charset=UTF-8"  }
        })
            .then(response => {
                console.log(response);
            })


    }
    resetTask= () =>{
        this.setState(() => this.initialState);
    }
    changed= event =>{
        this.setState({
                [event.target.name]:event.target.value
            }
        );
    }
    updateTask = event => {
        event.preventDefault();
        const task = {
            tid: this.state.tid,
            task_Name : this.state.task_Name,
            taskDescription : this.state.taskDescription,
            priority : this.state.priority,
            status : this.state.status,
        };
        const json = JSON.stringify(task);
        axios({
            method: 'put',
            url: 'http://localhost:8080/task/updateTask/' + this.state.tid,
            data: json,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
            .then(response => {
                if (response.data != null) {
                    console.log(response.data);
                    alert("Task updated successfuly");
                }
            });
    }


    render() {
        const {task_Name , taskDescription , status , priority } = this.state;
        return (
            <div>

                <Card className="border border-dark bg-dark text-white">
                    <CardHeader><FontAwesomeIcon icon={this.state.tid ? faEdit : faPlusCircle}/>{this.state.tid ? "Update" : "Create"} task</CardHeader>
                    <Card.Body>

                        <Form onReset={this.resetTask} onSubmit={this.state.tid ? this.updateTask : this.submitTask} id="projectFormId">

                            <Form.Group className="mb-3" controlId="formBasicProjectName" >
                                <Form.Label>Task name</Form.Label>
                                <Form.Control required onChange={this.changed} value={task_Name} name="task_Name" type="text" placeholder="Task name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDescription" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control required onChange={this.changed} value={taskDescription} name="taskDescription"  type="textarea" placeholder="Description" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCompletion">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control required onChange={this.changed} value={priority} name="priority" type="number" placeholder="Priority (1-4)" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select name="status" onChange={this.changed} value={status}>
                                    <option>Select status...</option>
                                    <option value="TO DO">TO DO</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="TESTING">TESTING</option>
                                    <option value="DEPLOYED">DEPLOYED</option>
                                    <option value="DONE">DONE</option>
                                </Form.Select>
                            </Form.Group>
                            <Card.Footer>
                                <ReactBootstrap.Button variant="primary" type="submit" >
                                    <FontAwesomeIcon icon={faSave}/>{this.state.tid ? "Update" : "Create"}
                                </ReactBootstrap.Button>
                                <ReactBootstrap.Button variant="outline-light" type="reset" className="m-2">
                                    <FontAwesomeIcon icon={faUndo}/>  Reset
                                </ReactBootstrap.Button>
                                <Link to="/tasks" className="btn btn-sm btn-outline-info p-2">
                                    <FontAwesomeIcon icon={faList}/> Tasks list
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

