import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Stonks</h1>
      <Form.Control type="text" placeholder="Enter stock" />
    </div>
  );
}

export default App;
