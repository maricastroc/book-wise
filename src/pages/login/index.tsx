import { Icon } from '@iconify/react'
import { RocketLaunch } from 'phosphor-react'
import {
  ButtonAccess,
  ButtonsContainer,
  CoverContainer,
  Heading,
  Container,
  Separator,
  WelcomeContainer,
} from './styles'
import Image from 'next/image'
import CoverImage from '../../../public/assets/cover.png'
import Logo from '../../../public/assets/logo.svg'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function Login() {
  const router = useRouter()

  async function handleSignIn(provider: string) {
    if (provider === 'google') {
      await signIn('google', { callbackUrl: '/home' })
    } else if (provider === 'github') {
      await signIn('github', { callbackUrl: '/home' })
    } else router.push('/home')
  }

  return (
    <>
      <NextSeo title="Login | Book Wise" />
      <Container>
        <CoverContainer>
          <Image
            fetchPriority="high"
            src={Logo}
            alt="Application logo."
            width={210}
            quality={100}
            className="logo_image"
          />
          <Image
            fetchPriority="high"
            src={CoverImage}
            alt="Application logo featuring a woman lying on a couch reading a book in the background."
            width={700}
            quality={100}
            className="cover_image"
          />
        </CoverContainer>
        <Separator />
        <WelcomeContainer>
          <Heading>
            <h2>Welcome!</h2>
            <p>Please, login or enter as a guest.</p>
          </Heading>
          <ButtonsContainer>
            <ButtonAccess onClick={() => handleSignIn('google')}>
              <Icon icon="flat-color-icons:google" />
              <p>Login with Google</p>
            </ButtonAccess>
            <ButtonAccess onClick={() => handleSignIn('github')}>
              <Icon icon="ant-design:github-outlined" color="white" />
              <p>Login with GitHub</p>
            </ButtonAccess>
            <ButtonAccess onClick={() => handleSignIn('visitor')}>
              <RocketLaunch size={32} className="rocket-icon" />
              <p>Access as a guest</p>
            </ButtonAccess>
          </ButtonsContainer>
        </WelcomeContainer>
      </Container>
    </>
  )
}
