import { Container, Content, Main } from './styles'
import { Skeleton } from '@mui/material'

export function SkeletonLibraryCard() {
  return (
    <Container>
      <Main>
        <Skeleton
          width={'100%'}
          height={'8rem'}
          variant="rounded"
          style={{ backgroundColor: 'rgba(79, 97, 158, 0.3)' }}
        />
        <Content>
          <Skeleton
            width={'100%'}
            height={'1rem'}
            variant="rounded"
            style={{ backgroundColor: 'rgba(79, 97, 158, 0.3)' }}
          />
          <Skeleton
            width={'100%'}
            height={'1rem'}
            variant="rounded"
            style={{ backgroundColor: 'rgba(79, 97, 158, 0.3)' }}
          />
        </Content>
      </Main>
    </Container>
  )
}
