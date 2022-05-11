import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import HeaderContext from '../../HeaderContext/HeaderContext'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import SmallNavCont from '../SmallNavCont'

class BookItemDetails extends Component {
  state = {bookData: {}, dataStatus: 'loading'}

  componentDidMount() {
    this.getBookItemData()
  }

  getBookItemData = async () => {
    const {match} = this.props
    const {params} = match
    const bookId = params.id
    const url = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    // console.log(id)
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const book = data.book_details
      console.log(book)
      const updatedData = {
        authorName: book.author_name,
        coverPic: book.cover_pic,
        aboutBook: book.about_book,
        rating: book.rating,
        readStatus: book.read_status,
        title: book.title,
        aboutAuthor: book.about_author,
      }
      this.setState({bookData: updatedData, dataStatus: 'success'})
    } else {
      this.setState({
        dataStatus: 'failure',
      })
    }
  }

  getBookItemDetails = () => {
    const {bookData} = this.state
    const {
      title,
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
    } = bookData

    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value

          const homeCont = theme ? 'dark-home' : ''
          const heading = theme ? 'h1-dark' : ''
          const innerCont = theme ? 'slick-dark' : ''
          const para = theme ? 'p-dark' : ''

          return (
            <>
              <div className={`book-item-details-cont ${homeCont}`}>
                <div className={`book-details-cont ${innerCont}`}>
                  <div className="book-details-items-cont">
                    <img src={coverPic} alt={title} className="book-image" />
                    <div className="books-content-cont ">
                      <h1 className={`shelf-book-title ${heading}`}>{title}</h1>
                      <p className={`shelf-author-name ${para}`}>
                        {authorName}
                      </p>
                      <div className="rating-cont">
                        <p className={`shelf-book-rating ${para}`}>
                          Avg Rating
                        </p>
                        <BsFillStarFill
                          color="#FBBF24"
                          size={15}
                          className="star-icon"
                        />
                        <p className={`${para}`}> {rating}</p>
                      </div>
                      <p className={`shelf-book-status ${para}`}>
                        Status:{' '}
                        <span className="status-text">{readStatus}</span>
                      </p>
                    </div>
                  </div>
                  <hr className="book-item-line" />
                  <div>
                    <h1 className={`item-heading ${heading}`}>About Author</h1>
                    <p className={`item-desc ${para}`}>{aboutAuthor}</p>
                    <h1 className={`item-heading ${heading}`}>About Book</h1>
                    <p className={`item-desc ${para}`}>{aboutBook}</p>
                  </div>
                </div>
              </div>
              {/*  small device output */}

              <div className={`small-book-item-details-cont ${homeCont}`}>
                <div className={`small-book-details-items-cont ${homeCont}`}>
                  <img
                    src={coverPic}
                    alt={title}
                    className="small-book-image"
                  />
                  <div className={`small-books-content-cont ${homeCont}`}>
                    <h1 className={`small-shelf-book-title ${para}`}>
                      {title}
                    </h1>
                    <p className={`small-shelf-author-name ${para}`}>
                      {authorName}
                    </p>
                    <div className="small-rating-cont">
                      <p className={`small-shelf-book-rating ${para}`}>
                        Avg Rating
                      </p>
                      <BsFillStarFill
                        color="#FBBF24"
                        size={15}
                        className="small-star-icon"
                      />
                      <p className={`small-rating ${para}`}> {rating}</p>
                    </div>
                    <p className={`small-shelf-book-status ${para}`}>
                      Status: <span className="status-text">{readStatus}</span>
                    </p>
                  </div>
                </div>
                <hr className="small-line" />
                <div>
                  <h1 className={`small-item-heading ${heading}`}>
                    About Author
                  </h1>
                  <p className={`small-item-desc ${para}`}>{aboutAuthor}</p>
                  <h1 className={`small-item-heading ${heading}`}>
                    About Book
                  </h1>
                  <p className={`small-item-desc ${para}`}>{aboutBook}</p>
                </div>
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  onclickTryAgainBtn = () => {
    this.getBookItemData()
  }

  getFailureImage = () => (
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

  getLoader = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getDataOnTheBasicsOfStatus = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'loading':
        return this.getLoader()
      case 'success':
        return this.getBookItemDetails()
      case 'failure':
        return this.getFailureImage()
      default:
        return null
    }
  }

  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {showNavCont} = value

          return (
            <>
              <Header />
              {showNavCont ? <SmallNavCont /> : ''}
              <div className="blog-container">
                {this.getDataOnTheBasicsOfStatus()}
                <Footer />
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default BookItemDetails
