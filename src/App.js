import 'react-bootstrap/dist/react-bootstrap.min'
import './App.css';
import NavigationBar from "./Components/NavigationBar";
import {Container , Row , Col} from "react-bootstrap";
import Welcome from "./Components/Welcome";
import Footer from './Components/Footer';
import Users from "./Components/User/Users";
import UsersList from "./Components/User/UsersList";
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import ProjectsList from "./Components/Project/ProjectsList";
import Projects from "./Components/Project/Projects";
import Tasks from "./Components/Task/Tasks"
import TasksList from "./Components/Task/TasksList"
import ChargeUser from "./Components/User/ChargeUser";
function App() {

  const  marginTop = {
    marginTop : "20px"
  };

  return (
      <Router>
        <div>
        <NavigationBar/>
    <Container>
      <Row>
        <Col style={marginTop}>
          <Switch>
            <Route path="/" exact component={Welcome}/>
            <Route path="/createUser" exact component={Users}/>
            <Route path="/displayUsers" exact component={UsersList}/>
            <Route path="/displayUsers#:uid" exact component={ChargeUser}/>
            <Route path="/projects" exact component={ProjectsList}/>
            <Route path="/createProject" exact component={Projects}/>
            <Route path="/tasks" exact component={TasksList}/>
            <Route path="/createTask" exact component={Tasks}/>
            <Route path="/edit/:uid" exact component={Users}/>
            <Route path="/editproject/:pid" exact component={Projects}/>
            <Route path="/edittask/:tid" exact component={Tasks}/>
          </Switch>
        </Col>
      </Row>
    </Container>
        <Footer/>
        </div>
      </Router>
  );
}

export default App;
