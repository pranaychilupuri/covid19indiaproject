import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="logo-and-title-container">
      <Link to="/">
        <img
          alt="covid19india"
          className="logo"
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624264430/samples/COVID19INDIA_1_t09thg.png"
        />
      </Link>
    </div>
    <div>
      <Link className="route-link" to="/">
        Home
      </Link>
      <Link className="route-link" to="/about">
        About
      </Link>
    </div>
  </nav>
)

export default Header
