import React, {Component} from 'react';
import {Container, Navbar , Col} from "react-bootstrap";


export default class Footer extends Component {

    render() {
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        Footer
                    </Col>
                </Container>

            </Navbar>

        );

    }

}

