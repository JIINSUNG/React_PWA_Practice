import "./App.css";
import { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("granted!");
      const token = await getToken(messaging, {
        vapidKey:
          "BHjD-QwXA6zqIuzljdGDa909FgrEfEvQOtlWm2uiGnRh_BuURXzNSBlFCrapbOkf8UUMRzuqd3CMA0AlDk888yQ",
      }).then((currentToken) => {
        console.log("Token Gen", currentToken);
      });
    } else if (permission === "denied") {
      alert("Notification permission denied");
    }
  }
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/about">About</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/users">Users</Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
