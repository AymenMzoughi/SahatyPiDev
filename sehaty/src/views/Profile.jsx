import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Figure from 'react-bootstrap/Figure';
import { Badge, ListGroup, Container, Row, Col, Card, OverlayTrigger, Popover, Image, Tabs, Tab } from 'react-bootstrap';

const PatientListDocteur = () => {
    return (
        <>
            <Container>
                <Row>


                    <Col>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src="holder.js/171x180"
                            />
                            <Figure.Caption>
                                Photo de profile
                            </Figure.Caption>
                        </Figure>
                    </Col>


                    <Col xs={6}>
                       
                    </Col>
                    <Col>3 of 3</Col>
                </Row>


                <Row>
                    <Col>
                    <ListGroup as="ol" numbered>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Subheading</div>
                                    Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                    14
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Subheading</div>
                                    Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                    14
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Subheading</div>
                                    Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                    14
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                        
                    </Col>
                    <Col xs={5}>2 of 3 (wider)</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>

        </>
    );
};

export default PatientListDocteur;