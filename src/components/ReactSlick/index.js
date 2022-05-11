import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import HeaderContext from '../../HeaderContext/HeaderContext'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {topRatedList: [], dataStatus: 'loading'}

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data.books)

    if (response.ok === true) {
      this.setState({
        dataStatus: 'success',
      })
      const formattedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      this.setState(
        {
          topRatedList: formattedData,
        },
        this.getSuccessData,
      )
    } else {
      this.setState({
        dataStatus: 'failure',
      })
    }
  }

  renderSlider = () => {
    const {topRatedList} = this.state
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value
          const heading = theme ? 'h1-dark' : ''
          const para = theme ? 'p-dark' : ''
          return (
            <Slider {...settings}>
              {topRatedList.map(eachLogo => {
                const {id, coverPic, title, authorName} = eachLogo
                return (
                  <li key={id}>
                    <Link to={`/books/${id}`}>
                      <div className="slick-item">
                        <img
                          className="slick-logo-image"
                          src={coverPic}
                          alt={title}
                        />
                        <h1 className={`book-title ${heading}`}>{title}</h1>
                        <p className={`author-name ${para}`}>{authorName}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </Slider>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  getSuccessData = () => (
    <HeaderContext.Consumer>
      {value => {
        const {theme} = value
        const slickCont = theme ? 'slick-dark' : ''
        return (
          <ul className={`slick-container ${slickCont}`}>
            {this.renderSlider()}
          </ul>
        )
      }}
    </HeaderContext.Consumer>
  )

  getLoadingSpinner = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onclickTryAgainBtn = () => {
    this.getBooksData()
  }

  getErrorImage = () => (
    <div>
      <img
        src="https://res.cloudinary.com/gopiganesula/image/upload/v1652253045/Group_7522_uhwe2g_1_lzo5eg.jpg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.onclickTryAgainBtn}>
        Try Again
      </button>
    </div>
  )

  getDataBasedOnStatus = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'loading':
        return this.getLoadingSpinner()
      case 'success':
        return this.getSuccessData()
      case 'failure':
        return this.getErrorImage()
      default:
        return null
    }
  }

  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value

          const slickCont = theme ? 'slick-dark' : ''
          const heading = theme ? 'h1-dark' : ''
          return (
            <div className={`main-container ${slickCont}`}>
              <div className="heading-button-cont">
                <h1 className={`topRated-books-text ${heading}`}>
                  Top Rated Books
                </h1>
                <div className="find-books-slick">
                  <Link to="/shelf">
                    <button type="button" className="topRated-btn">
                      Find Books
                    </button>
                  </Link>
                </div>
              </div>
              {this.getDataBasedOnStatus()}
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default ReactSlick
