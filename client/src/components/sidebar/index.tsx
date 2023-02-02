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

interface Props {
  onClick: (value: string) => void
}

function Sidebar(props: Props) {
  const { data } = useQuery(ALL_CATEGORIES_QUERY)

  function handleClick(event: any) {
    props.onClick(event.target.value)
  }

  return (
    <ButtonGroup vertical
    >
      {data?.categories?.map((category: any) => (
        <Button
          variant="outline-secondary"
          key={category.id}
          value={category.id}
          onClick={handleClick}
          >{category.label}</Button>
      ))}
    </ButtonGroup>
  )
}

export default Sidebar
