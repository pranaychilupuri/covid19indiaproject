import './index.css'

const Footer = () => (
  <footer>
    <div className="footer-container">
      <h1 className="title">
        COVID19<span className="india-text">INDIA</span>
      </h1>
      <p className="para-text">
        we stand with everyone fighting on the front lines
      </p>
      <div className="d-flex flex-row justify-content-center">
        <img
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624528081/samples/Vector_ws7ph8.png"
          className="reddit-logo"
          alt="reddit"
        />
        <img
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624528081/samples/instagram_vcqkd2.png"
          className="insta-logo"
          alt="instagram"
        />
        <img
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624528081/samples/path3611_afht9n.png"
          className="twitter-logo"
          alt="twitter"
        />
      </div>
    </div>
  </footer>
)

export default Footer
