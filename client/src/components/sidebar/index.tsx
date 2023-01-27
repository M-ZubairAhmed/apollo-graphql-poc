import { Button, ButtonGroup } from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'

const ALL_CATEGORIES_QUERY = gql`
  query GetAllCategories {
    categories {
      id
      label
    }
  }
`

function Sidebar() {
  const { data } = useQuery(ALL_CATEGORIES_QUERY)

  return (
    <ButtonGroup vertical>
      {data?.categories?.map((category: any) => (
        <Button variant="outline-secondary">{category.label}</Button>
      ))}
    </ButtonGroup>
  )
}

export default Sidebar
