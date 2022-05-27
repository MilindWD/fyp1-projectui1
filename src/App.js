import "./index.css";
import React, { useEffect, useState } from "react";
import {Col, Container, Dropdown, Row} from 'react-bootstrap';

//colors
//#181f2a : black



import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import getData from "./data";



export default function App() {

  const [model, setModel] = useState("Logistic Regression");
  const [dataSet, setDataSet] = useState("SENTIMENT140");
  const [attribute, setAttribute] = useState("accuracy");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData(model,  dataSet, attribute));
  }, [model, dataSet, attribute]);

  const handleModelChange = eventkey => {
    console.log(eventkey);
    setModel(eventkey);
  }

  const handleDataSetChange = eventkey => { 
    setDataSet(eventkey);
  }

  const handleAttributeChange = eventkey => {
    setAttribute(eventkey);
  }

  return (
    <Container style={{alignItems: 'center'}}>
    <Container>
      <div style={{textAlign: 'center', padding: '1%', color: '#FFF205', fontFamily: 'Outfit'}}>
        <h1 style={{fontSize: '3rem', fontWeight: '800'}}>Impact of Word embedding on Text Classification 
        </h1>
      </div>
      <div style={{textAlign: 'center', padding: '1%', color: '#FFF205', fontFamily: 'Outfit', fontSize: '1.5rem'}}>
        Below graph represents the results obtained
      </div>
      <div>
      <Row style={{textAlign: 'center'}}> 
        <Col xs={6}><Dropdown onSelect={handleModelChange}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{backgroundColor: '#FFF205', outline: 'none', borderRadius: '0', fontWeight: '600'}}>
          {model}
        </Dropdown.Toggle>
      
        <Dropdown.Menu >
          <Dropdown.Item eventKey='Logistic Regression'>Logistic Regression</Dropdown.Item>
          <Dropdown.Item eventKey='SVM' >SVM</Dropdown.Item>
          <Dropdown.Item eventKey='DecisionTreeClassifier' >DecisionTree Classifier</Dropdown.Item>
          <Dropdown.Item eventKey='LSTM'>LSTM</Dropdown.Item>
          <Dropdown.Item eventKey='DNN'>DNN</Dropdown.Item>
          <Dropdown.Item eventKey='GRU'>GRU</Dropdown.Item>
          {dataSet!=='All'?<Dropdown.Item eventKey='All'>All</Dropdown.Item>:<></>}
        </Dropdown.Menu>
      </Dropdown></Col>
      <Col xs={6}>
      <Dropdown onSelect={handleDataSetChange}>
      <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{backgroundColor: '#FFF205', outline: 'none', borderRadius: '0', fontWeight: '600'}}>
        {dataSet}
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
        <Dropdown.Item eventKey='SENTIMENT140'>SENTIMENT140</Dropdown.Item>
        <Dropdown.Item eventKey='IMDb50'>IMDb50</Dropdown.Item>
        <Dropdown.Item eventKey='CAA_NRC'>CAA_NRC</Dropdown.Item>
        {model!=='All'?<Dropdown.Item eventKey='All'>All</Dropdown.Item>:<></>}
      </Dropdown.Menu>
    </Dropdown>
      </Col>
      </Row>
      </div>
    </Container>
    
    <Container style={{height: '50vh', paddingTop: '10%'}} className="d-flex align-items-center justify-content-center text-center not-found-container">
    <BarChart
    width={800}
    height={400}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="white"/>
    <XAxis dataKey="name" stroke="white"/>
    <YAxis stroke="white"/>
    <Tooltip />
    <Legend />
    {model!=='All'&&dataSet!=='All'?<><Bar type="monotone" dataKey="accuracy" fill="#82ca9d" />
    <Bar type="monotone" dataKey="f1" fill="red" />
    <Bar type="monotone" dataKey="precision" fill="yellow" />
    <Bar type="monotone" dataKey="recall" fill="white" /></>:<>
    <Bar type="monotone" dataKey="Bag of Words" fill="#82ca9d" />
    <Bar type="monotone" dataKey="tfidf" fill="red" />
    <Bar type="monotone" dataKey="GloVe" fill="yellow" />
    <Bar type="monotone" dataKey="Word2Vec" fill="white" />
    <Bar type="monotone" dataKey="fastText" fill="purple" />
    </>}
    
    
  </BarChart> 
  
  
  
  </Container>
  <Container></Container>
  {model!=='All'&&dataSet!=='All'?<></>:<><div style={{textAlign:'center', marginTop: '5%'}}>
  <Dropdown onSelect={handleAttributeChange}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{backgroundColor: '#FFF205', outline: 'none', borderRadius: '0', fontWeight: '600'}}>
          {attribute}
        </Dropdown.Toggle>
      
        <Dropdown.Menu >
          <Dropdown.Item eventKey='accuracy'>accuracy</Dropdown.Item>
          <Dropdown.Item eventKey='f1' >f1</Dropdown.Item>
          <Dropdown.Item eventKey='precision' >precision</Dropdown.Item>
          <Dropdown.Item eventKey='recall'>recall</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
  </div></>}
  
    </Container>
    
  );
}
