/**
 * react
 */
import React from 'react';

/**
 * react router plugin
 */
import { Routes, Route, Outlet, Link } from "react-router-dom";

/**
 * first page
 * foodPage
 */
import FoodPage from '../food/index';

/**
 * Application
 * 
 * register router
 * showin first page
 */
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Basic Example</h1>

                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="food" element={<FoodPage />} />

                        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </div>
        )
    }
}

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/food">Food</Link>
                    </li>
                    <li>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </div>
    )
}

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const Dashboard = () => <div>Dashboard</div>;
const NoMatch = () =>
    <div>
        <h2>Nothing to see here!</h2>
        <p>
            <Link to="/">Go to the home page</Link>
        </p>
    </div>
    ;

export default App;