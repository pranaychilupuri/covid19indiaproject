import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624271464/samples/Group_7484_s4lfi1.png"
      className="not-found-img"
      alt="not-found"
    />
    <h1 className="page-not-found">PAGE NOT FOUND</h1>
    <p className="sorry-paragraph">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="home-button" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
