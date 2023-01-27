import { Spinner, Stack } from 'react-bootstrap'

import { gql, useQuery } from '@apollo/client'

import NoteView from '../note_view'

const ALL_NOTES = gql`
  query GetAllNotes($categoryId: String) {
    notes(categoryId: $categoryId) {
      id
      content
      category {
        label
      }
    }
  }
`

interface Props {
  selectedCategoryId: string
}

function NotesList(props: Props) {
  const { loading, data } = useQuery(ALL_NOTES, {
    variables: {
      categoryId: props.selectedCategoryId
    },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    return <Spinner animation="border" />
  }

  return (
    <Stack gap={4}>
      {data.notes.map((note: any) => (
        <NoteView
          key={note.id}
          id={note.id}
          content={note.content}
          category={note.category.label}
        />
      ))}
    </Stack>
  )
}

export default NotesList
