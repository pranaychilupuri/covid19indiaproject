import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    searchInput: [],
    totalCases: {},
    isConfirmedCases: false,
    covid19IndiaDetails: [],
  }

  componentDidMount() {
    this.getDetailsFromApi()
  }

  getDetailsFromApi = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const covidCasesIndia = await response.json()
    const {TT} = covidCasesIndia
    delete covidCasesIndia.TT
    this.setState({
      covid19IndiaDetails: covidCasesIndia,
      isConfirmedCases: true,
      totalCases: TT,
    })
  }

  updateSearchInput = event => {
    const searchUser = event.target.value
    const searchResults = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchUser.toLowerCase()),
    )
    this.setState({
      searchInput: searchResults,
    })
  }

  renderSearchDat = event => {
    const searchDataEl = document.getElementById('searchData')
    searchDataEl.value = event.target.textContent
  }

  removeSearchData = () => {
    const searchContainerEl = document.getElementById('searchContainer')
    searchContainerEl.style.display = 'none'
  }

  renderSearchBar = () => {
    const searchContainerEl = document.getElementById('searchContainer')
    searchContainerEl.style.display = 'block'
  }

  renderData = () => {
    const {searchInput} = this.state

    return (
      <ul id="searchContainer" className="search-bar-container">
        {searchInput.map(eachState => (
          <Link
            to={`/${eachState.state_name}/${eachState.state_code}`}
            key={eachState.state_code}
            className="link-card"
          >
            <li className="search-item" onClick={this.renderSearchData}>
              <p className="statename">{eachState.state_name}</p>
              <div className="statecode-container">
                <p className="statecode">{eachState.state_code}</p>
                <i
                  className="arrow-image fa fa-chevron-right"
                  aria-hidden="true"
                >
                  {' '}
                </i>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderNameOfState = index => {
    const state = statesList[index]
    if (state !== undefined) return state.state_name
    return ''
  }

  renderTotalCases = () => {
    const {totalCases} = this.state

    return (
      <div className="totalcases-container">
        <div className="confirmed-container total">
          <p>Confirmed</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624607864/samples/confirmed_ljqhqd.jpg"
            alt="confirmed"
          />
          <p>{totalCases.total.confirmed}</p>
        </div>
        <div className="tested-container total">
          <p>Active</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624608336/samples/active_kznoup.jpg"
            alt="active"
          />
          <p>
            {totalCases.total.confirmed -
              totalCases.total.recovered -
              totalCases.total.deceased}
          </p>
        </div>
        <div className="recover-container total">
          <p>Recovered</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624608862/samples/recovered_jub9io.jpg"
            alt="recovered"
          />
          <p>{totalCases.total.recovered}</p>
        </div>
        <div className="deceased-container total">
          <p>Deceased</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624609143/samples/deceased_sbms21.jpg"
            alt="deceased"
          />
          <p>{totalCases.total.deceased}</p>
        </div>
      </div>
    )
  }

  renderIndiaCasesList = () => {
    const {covid19IndiaDetails} = this.state

    return (
      <div className="state-wise-cases-container">
        <div className="state-list titles-list">
          <p className="list-state statename">State/UT</p>
          <p className="list-state">Confirmed</p>
          <p className="list-state">Active</p>
          <p className="list-state">Recovered</p>
          <p className="list-state">Deceased</p>
          <p className="list-state">Population</p>
        </div>

        <div className="">
          {Object.keys(covid19IndiaDetails).map((key, index) => (
            <Link
              to={`/${this.renderNameOfState(index)}/${key}`}
              key={key}
              className="link-card"
            >
              <li className="list-state-item">
                <p className="list-state statename">
                  {this.renderNameOfState(index)}
                </p>
                <p className="list-state confirmed-container">
                  {covid19IndiaDetails[key].total.confirmed}
                </p>
                <p className="list-state tested-container">
                  {covid19IndiaDetails[key].total.tested}
                </p>
                <p className="list-state recovered-container">
                  {covid19IndiaDetails[key].total.recovered}
                </p>
                <p className="list-state deceased-container">
                  {covid19IndiaDetails[key].total.deceased}
                </p>
                <p className="list-state population-container">
                  {covid19IndiaDetails[key].meta.population}
                </p>
              </li>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="Oval" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCovid19IndiaSearchBar = () => (
    <>
      <div className="search-list-container">
        <i className="image fa fa-search" aria-hidden="true">
          {' '}
        </i>
        <input
          type="search"
          id="searchInput"
          className="search-state"
          placeholder="Enter the State"
          onChange={this.updateSearchInput}
          onFocus={this.renderSearchBar}
        />
      </div>
      {this.renderData()}
      {this.renderTotalCases()}
      {this.renderIndiaCasesList()}
      <Footer />
    </>
  )

  render() {
    const {isConfirmedCases} = this.state
    return (
      <div className="home-container">
        {isConfirmedCases
          ? this.renderCovid19IndiaSearchBar()
          : this.renderSpinner()}
      </div>
    )
  }
}

export default Home
