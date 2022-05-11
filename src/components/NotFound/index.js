import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-cont">
    <img
      src="https://res.cloudinary.com/gopiganesula/image/upload/v1652253794/Group_7484_vgkpz6_1_le4yrb.jpg"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button" className="btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
