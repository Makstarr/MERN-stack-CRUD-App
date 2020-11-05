import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
    import "./app.css";

    import AddPost from "./components/add";
  
    import PostsList from "./components/list";

    class App extends Component {
      render() {
        return (
          <div className="list row">
          <div className="col-md-8">
            <nav className="navbar">
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
              </div>
            </nav>
    </div>
            <div className="container">
              <Switch>
                <Route exact path={["/", "/posts"]} component={PostsList} />
                <Route exact path="/add" component={AddPost} />
            
              </Switch>
            </div>
          </div>
        );
      }
    }

    export default App;