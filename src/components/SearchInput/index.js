import {Component} from 'react'
import {Link} from 'react-router-dom'
import Home from '../Home'
import Footer from '../Footer'
import './index.css'

class SearchInput extends Component {
  state = {
    searchInput: [],
  }

  updateSearchInput = value => {
    this.setState({
      searchInput: value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchData = event => {
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

  renderData() {
    const {searchInput} = this.state
    const {statesList} = this.props
    const searchResults = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <ul id="search-container" className="search-bar-container">
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
          onChange={this.searchResults}
          onFocus={this.renderSearchBar}
        />
      </div>
      {this.renderData()}
      {this.renderTotalCases()}
      {this.renderIndiaCasesList()}
      <Footer />
    </>
  )
}

export default SearchInput
