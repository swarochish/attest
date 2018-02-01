import gql from 'graphql-tag'

export default gql`
  query masterEntity($masterEntityID: String) {
    masterEntity(masterEntityID: $masterEntityID) {
      id
      businessUnits
      statuses
      tags
      lawyers
  }
}
`
