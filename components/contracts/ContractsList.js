import { gql, graphql } from 'react-apollo'
import ContractSubList from './ContractSubList'
import _ from 'underscore'

const contracts = gql`
  query {
    contracts {
      id
      internalParties
      externalParties
      effectiveDate
      status
      tags
      businessUnit
    }
  }
`
export default graphql(contracts, {
  options: {
    variables: {}
  },
  props: ({ data }) => ({
    data
  })
})(ContractSubList)
