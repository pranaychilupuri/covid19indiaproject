import {Component} from 'react'
import SearchItem from '../SearchItem'
import './index.css'

class SearchInput extends Component {
  state = {
    searchInput: '',
  }

  updateSearchInput = value => {
    this.setState({
      searchInput: value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    const {statesList} = this.props
    const newStatesList = statesList.map(eachState => ({
      stateCode: eachState.state_code,
      stateName: eachState.state_name,
    }))
    const searchResults = newStatesList.filter(eachState =>
      eachState.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div className="search-container">
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
              className="search-icon-image"
              alt="search icon"
            />
            <input
              className="search-input"
              type="search"
              placeholder="Enter the State"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
          <ul className="list">
            {searchResults.map(eachState => (
              <SearchItem
                key={eachState.stateCode}
                searchDetails={eachState}
                updateSearchInput={this.updateSearchInput}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SearchInput
