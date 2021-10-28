import React, {Component} from 'react';
import {Card, Nav , Button , Table} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faEdit,
    faTrash,
    faTasks,
    faInfoCircle, faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {Link} from "react-router-dom";


export default class TasksList extends Component {

    constructor(props) {
        super();
        this.state={
            taskList : []
        };
    }


    componentDidMount() {

        axios.get("http://localhost:8080/task")
            .then(response => {
                this.setState({taskList: response})
            });
    }
    deleteTask = (taskId) => {
        axios.delete("http://localhost:8080/task/deleteTask/"+taskId)
            .then(response => {
                if (response.data != null){
                    alert("Task deleted");
                    window.location.reload();
                }});
    };


    render() {
        return (


            <div >
                <Table>
                {this.state.taskList.length <= 0 || this.state.taskList === null ?
                    <h1 className="align-content-center text-white-50">No tasks available</h1> :

                    this.state.taskList.data.map(task =>
                        <tbody><tr>  <td>
                        <Card  className="border border-dark bg-dark text-white m-2 ui-corner-left" style={{ width: '24rem' }}>




                            <Card.Header className="bg-gradient p-2" >
                                <Nav variant="pills" defaultActiveKey="#first">
                                    <Nav.Item>
                                        <Nav.Link href="#first">Task :</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-3">
                                <Card.Title><h4 className="text-uppercase"><FontAwesomeIcon icon={faTasks}/>    {task.task_Name} <FontAwesomeIcon icon={faExclamationTriangle} className={task.priority === 4 ? "text-danger" : task.priority === 3 ? "text-warning" : task.priority === 2 ? "text-white" : "text-success"}/></h4></Card.Title><hr/>
                                <Card.Text>
                                    <div className="m-2">
                                        <FontAwesomeIcon icon={faInfoCircle}/> Description :   {task.taskDescription}    </div>

                                    <FontAwesomeIcon icon={faCommentAlt} /> {task.status}   <br/>

                                </Card.Text>
                                <Button variant="outline-primary" className="m-1">Go somewhere</Button>
                                <Button variant="outline-danger" className="m-1"onClick={this.deleteTask.bind(this , task.tid)}><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                                <Link to={"edittask/"+task.tid} className="btn btn-sm btn-outline-warning p-2"><FontAwesomeIcon icon={faEdit}/> Modify</Link>
                            </Card.Body>

                        </Card>
                        </td></tr></tbody>
                    )}</Table>

            </div>
        );

    }

}
