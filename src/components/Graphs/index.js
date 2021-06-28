import {Bar} from 'react-chartjs-2'
import './index.css'

const Graphs = props => {
  const {graph} = props
  const stateItem = graph[1]
  const data = {
    labels: [
      stateItem[0][0],
      stateItem[1][0],
      stateItem[2][0],
      stateItem[3][0],
      stateItem[4][0],
      stateItem[5][0],
      stateItem[6][0],
      stateItem[7][0],
      stateItem[8][0],
      stateItem[9][0],
    ],
    itemSets: [
      {
        data: [
          stateItem[0][1],
          stateItem[1][1],
          stateItem[2][1],
          stateItem[3][1],
          stateItem[4][1],
          stateItem[5][1],
          stateItem[6][1],
          stateItem[7][1],
          stateItem[8][1],
          stateItem[9][1],
        ],
        backgroundColor: [graph[0]],
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  }
  const optionsData = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <>
      <Bar className="graph" data={data} optionsData={optionsData} />
    </>
  )
}

export default Graphs
