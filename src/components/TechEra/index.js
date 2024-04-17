import './index.css'

import {Link} from 'react-router-dom'

const TechEra = props => {
  const {course} = props
  const {id, name, logoUrl} = course

  return (
    <li>
      <Link className="course-link" to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} className="logo" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default TechEra
