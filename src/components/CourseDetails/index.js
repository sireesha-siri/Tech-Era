import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CourseDetails extends Component {
  state = {status: apiStatus.initial, courseDetails: {}}

  componentDidMount() {
    this.getCourseDetailsView()
  }

  getCourseDetailsView = async () => {
    this.setState({status: apiStatus.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)

    const data = await response.json()

    if (response.ok === true) {
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(formattedData)
      this.setState({courseDetails: formattedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  successView = () => {
    const {courseDetails} = this.state

    return (
      <div className="success-course-container">
        <img
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
          className="image-style"
        />

        <div className="course-details-container">
          <h1 className="success-course-heading">{courseDetails.name}</h1>
          <p className="success-course-description">
            {courseDetails.description}
          </p>
        </div>
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

      <button
        type="button"
        className="retry-button"
        onClick={this.getCourseDetailsView}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" height={100} width={100} />
    </div>
  )

  courseDetailsView = () => {
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
          {this.courseDetailsView()}
        </Link>
      </div>
    )
  }
}

export default CourseDetails
