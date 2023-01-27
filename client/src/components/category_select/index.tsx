import { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
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
  defaultValue: string
  onChange: (value: string) => void
}

function CategorySelect(props: Props) {
  const { loading, data } = useQuery(ALL_CATEGORIES_QUERY)

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    props.onChange(event.target.value)
  }

  return (
    <Form.Select
      placeholder="Filter with category"
      defaultValue={props.defaultValue}
      onChange={handleChange}
      disabled={loading}
    >
      <option value="">All categories</option>
      {data?.categories?.map((category: any) => (
        <option key={category.id} value={category.id}>
          {category.label}
        </option>
      ))}
    </Form.Select>
  )
}

export default CategorySelect
