import { UserProps } from '@/@types/user'

export const getEmptyBoxMessage = (
  status: 'read' | 'reading' | 'wantToRead' | 'didNotFinish',
  userInfo: UserProps | null,
  loggedUser: UserProps | null,
): string => {
  const isLoggedUser = userInfo?.id === loggedUser?.id
  const userName = userInfo?.name?.split(' ')[0] || ''

  const messages = {
    read: isLoggedUser
      ? "This is where the books you've already read will be."
      : `This is where the books ${userName} already read will be.`,
    reading: isLoggedUser
      ? "This is where the books you're currently reading will be."
      : `This is where the books ${userName} is currently reading will be.`,
    wantToRead: isLoggedUser
      ? 'This is where the books you want to read will be.'
      : `This is where the books ${userName} want to read will be.`,
    didNotFinish: isLoggedUser
      ? "This is where the books you didn't finish will be."
      : `This is where the books ${userName} didn't finish will be.`,
  }

  return messages[status]
}
