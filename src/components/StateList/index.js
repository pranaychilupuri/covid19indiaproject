import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Graphs from '../Graphs'
import LineGraph from '../LineGraph'
import Footer from '../Footer'
import './index.css'

class StateList extends Component {
  state = {
    stateDetails: {},
    isDataTaken: false,
    state: '',
    stateWiseCasesData: {},
    graph: [],
    lineGraphData: [],
    nameHighlight: 'Confirmed',
  }

  componentDidMount() {
    this.getStateDataFromApi()
  }

  getStateDataFromApi = async () => {
    const {match} = this.props
    const {params} = match
    const {key, stateName} = params

    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )

    const covidIndiaCasesData = await response.json()

    const stateDetailsIndex = Object.keys(covidIndiaCasesData).filter(
      eachKey => eachKey === key,
    )

    const graphResponse = await fetch(
      'https://api.covid19india.org/v4/min/timeseries-AP.min.json',
    )

    const graphDataFromApi = await graphResponse.json()
    const data = covidIndiaCasesData[stateDetailsIndex]

    const spreadTrendsData = await fetch(
      `https://api.covid19india.org/v4/min/timeseries-${key}.min.json`,
    )

    const spreadTrendsDataObject = await spreadTrendsData.json()
    const spreadTrendsTotalData = Object.keys(spreadTrendsDataObject).map(
      stateCode => spreadTrendsDataObject[stateCode].dates,
    )

    const spreadTrendsTotalDataArr = Object.keys(
      spreadTrendsTotalData[0],
    ).map(newDate => [newDate, spreadTrendsData[0][newDate]])

    const prevThreeMonthsData = spreadTrendsTotalDataArr.slice(
      spreadTrendsTotalDataArr.length - 90,
      spreadTrendsTotalDataArr.length,
    )

    const confirmedCasesData = this.getConfirmedCases(graphDataFromApi)

    this.setState({
      stateDetails: data,
      isDataTaken: true,
      state: stateName,
      stateWiseCasesData: graphDataFromApi,
      graph: confirmedCasesData,
      lineGraphData: prevThreeMonthsData,
    })
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="Oval" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTotalCases = () => {
    const {stateDetails, nameHighlight} = this.state
    const confirmedCasesHighlight =
      nameHighlight === 'Confirmed' ? 'confirmed-background' : ''
    const activeCasesHighlight =
      nameHighlight === 'Active' ? 'active-background' : ''
    const recoveredCasesHighlight =
      nameHighlight === 'Recovered' ? 'recovered-background' : ''
    const deceasedCasesHighlight =
      nameHighlight === 'Deceased' ? 'deceased-background' : ''
    return (
      <div className="card-container" id="cardContainer">
        <button
          className={`confirmed card confirmed-button button ${confirmedCasesHighlight}`}
          type="button"
          onClick={this.confirmedListRender}
        >
          <p className="card-title">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624607864/samples/confirmed_ljqhqd.jpg"
            alt="confirmed"
          />
          <p className="card-count">{stateDetails.total.confirmed}</p>
        </button>
        <button
          className={`tested card tested-button button ${activeCasesHighlight}`}
          type="button"
          onClick={this.getActiveCases}
        >
          <p className="card-title">Active</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624608336/samples/active_kznoup.jpg"
            alt="active"
          />
          <p className="card-count">
            {stateDetails.total.confirmed -
              stateDetails.total.recovered -
              stateDetails.total.deceased}
          </p>
        </button>
        <button
          className={`recovered card recovered-button button ${recoveredCasesHighlight}`}
          type="button"
          onClick={this.getRecoveredCases}
        >
          <p className="card-title">Recovered</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624608862/samples/recovered_jub9io.jpg"
            alt="recovered"
          />
          <p className="card-count">{stateDetails.total.recovered}</p>
        </button>
        <button
          className={`deceased card deceased-button button ${deceasedCasesHighlight}`}
          type="button"
          onClick={this.getDeceasedCases}
        >
          <p className="card-title">Deceased</p>
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1624609143/samples/deceased_sbms21.jpg"
            alt="deceased"
          />
          <p className="card-count">{stateDetails.total.deceased}</p>
        </button>
      </div>
    )
  }

  renderTopDistrictCases = () => {
    const {stateDetails} = this.state
    const {districts} = stateDetails
    return (
      <>
        <h1 className="district-name-heading">Top Districts</h1>
        <ul className="district-container">
          {Object.keys(districts).map(key => (
            <li className="districts-list" key={key}>
              <p className="district-number">
                {districts[key].total.confirmed}
              </p>
              <p className="district-name">{key}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  getConfirmedCases = stateWiseCasesData => {
    const {AP} = stateWiseCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.confirmed,
    ])
    const prevTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const graphData = ['#9A0E31', prevTenDaysConfirmedCases]
    return graphData
  }

  confirmedListRender = () => {
    const {stateWiseCasesData} = this.state
    const {AP} = stateWiseCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.confirmed,
    ])
    const prevTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const graphData = ['#9A0E31', prevTenDaysConfirmedCases]

    this.setState({
      graph: graphData,
      nameHighlight: 'Confirmed',
    })
  }

  getActiveCases = () => {
    const {stateWiseCasesData} = this.state
    const {AP} = stateWiseCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.tested,
    ])
    const prevTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const graphData = ['#0A4FA0', prevTenDaysConfirmedCases]

    this.setState({
      graph: graphData,
      nameHighlight: 'Active',
    })
  }

  getRecoveredCases = () => {
    const {stateWiseCasesData} = this.state
    const {AP} = stateWiseCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.recovered,
    ])
    const prevTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const graphData = ['#216837', prevTenDaysConfirmedCases]

    this.setState({
      graph: graphData,
      nameHighlight: 'Recovered',
    })
  }

  getDeceasedCases = () => {
    const {stateWiseCasesData} = this.state
    const {AP} = stateWiseCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.deceased,
    ])
    const prevTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const graphData = ['#474C57', prevTenDaysConfirmedCases]

    this.setState({
      graph: graphData,
      nameHighlight: 'Deceased',
    })
  }

  renderLineGraphCharts = () => {
    const {lineGraphData} = this.state
    const spreadTrendsConfirmedCasesCount = lineGraphData.map(
      eachItem => eachItem[1].total.confirmed,
    )
    const spreadTrendsActiveCasesCount = lineGraphData.map(
      eachItem =>
        eachItem[1].total.confirmed -
        eachItem[1].total.recovered -
        eachItem[1].total.deceased,
    )
    const spreadTrendsRecoveredCasesCount = lineGraphData.map(
      eachItem => eachItem[1].total.recovered,
    )
    const spreadTrendsDeceasedCasesCount = lineGraphData.map(
      eachItem => eachItem[1].total.deceased,
    )
    const spreadTrendsVaccinatedCount = lineGraphData.map(
      eachItem => eachItem[1].total.vaccinated,
    )
    const spreadTrendsTestedCount = lineGraphData.map(
      eachItem => eachItem[1].total.tested,
    )
    const spreadTrendsTestedPositiveRatio = lineGraphData.map(
      eachItem => eachItem[1].total.tested / eachItem[1].total.confirmed,
    )
    return (
      <>
        <LineGraph
          graphData={spreadTrendsConfirmedCasesCount}
          graphHeading="Confirmed"
          graphColor="confirmed-heading"
          graphBgColor="confirmed-graph"
          color="#ff037a"
        />
        <LineGraph
          graphData={spreadTrendsActiveCasesCount}
          graphHeading="Total Active"
          graphColor="active-heading"
          graphBgColor="active-graph"
          color="#007bff"
        />
        <LineGraph
          graphData={spreadTrendsRecoveredCasesCount}
          graphHeading="Recovered"
          graphColor="recovered-heading"
          graphBgColor="recovered-graph"
          color="#27a243"
        />
        <LineGraph
          graphData={spreadTrendsDeceasedCasesCount}
          graphHeading="Deceased"
          graphColor="deceased-heading"
          graphBgColor="deceased-graph"
          color="#6c757d"
        />
        <LineGraph
          graphData={spreadTrendsTestedCount}
          graphHeading="Tested"
          graphColor="tested-heading"
          graphBgColor="tested-graph"
          color="#9673b9"
        />
        <LineGraph
          graphData={spreadTrendsVaccinatedCount}
          graphHeading="Vaccine"
          graphColor="vaccine-heading"
          graphBgColor="vaccine-graph"
          color="#f95581"
        />
        <LineGraph
          graphData={spreadTrendsTestedPositiveRatio}
          graphHeading="Tested Positive Ratio"
          graphColor="tested-positive-ratio-heading"
          graphBgColor="tested-positive-ratio-graph"
          color="#FD7E14"
        />
      </>
    )
  }

  renderStateWiseDetails = () => {
    const {stateDetails, state, graph} = this.state
    const dateString = stateDetails.meta.last_updated
    const newDate = new Date(dateString)
    const monthName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return (
      <>
        <div className="state-container">
          <div className="state-details-update-container">
            <h1 className="state-heading">{state}</h1>
            <p className="date-text">{`Last updated date on ${
              monthName[newDate.getMonth()]
            } ${newDate.getDate()}th ${newDate.getFullYear()}.`}</p>
          </div>
          <div className="state-details-update-container">
            <p className="tested-samples-text">Tested</p>
            <p className="tested-samples-count">{stateDetails.total.tested}</p>
          </div>
        </div>
        {this.renderTotalCases()}
        {this.renderTopDistrictCases()}
        <Graphs graph={graph} />
        <div className="line-graph-container">
          <h1 className="spread-trend-heading">Spread Trends</h1>
          <button className="spread-trend-button" type="button">
            Cumulative
          </button>
          <button className="spread-trend-button" type="button">
            Daily
          </button>
        </div>
        {this.renderLineGraphCharts()}
        <Footer />
      </>
    )
  }

  render() {
    const {isDataTaken} = this.state
    return (
      <div className="state-page-container">
        {isDataTaken ? this.renderStateWiseDetails() : this.renderSpinner()}
      </div>
    )
  }
}

export default StateList
