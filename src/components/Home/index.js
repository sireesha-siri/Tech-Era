import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TechEra from '../TechEra'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {status: apiStatus.initial, coursesList: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({status: apiStatus.loading})

    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)

    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

      this.setState({coursesList: formattedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  successView = () => {
    const {coursesList} = this.state

    return (
      <div className="success-container">
        <h1 className="success-heading">Courses</h1>

        <ul className="courses-list">
          {coursesList.map(each => (
            <TechEra key={each.id} course={each} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />

      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>

      <button type="button" className="retry-button" onClick={this.getCourses}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" height={100} width={100} />
    </div>
  )

  homeView = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.successView()

      case apiStatus.failure:
        return this.failureView()

      case apiStatus.loading:
        return this.loadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Link to="/" className="home-link">
          {this.homeView()}
        </Link>
      </div>
    )
  }
}

export default Home
