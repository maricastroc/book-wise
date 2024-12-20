import { NextSeo } from 'next-seo'
import {
  CoverContainer,
  Heading,
  SignInPageWrapper,
  DividerLine,
  WelcomeContainer,
  WelcomeContent,
} from './styles'

import Image from 'next/image'
import CoverImage from '../../../public/assets/cover.png'
import Logo from '../../../public/assets/logo.svg'
import SignInForm from '@/components/shared/SignInForm'
import { useLoadingOnRouteChange } from '@/utils/useLoadingOnRouteChange'
import { LoadingPage } from '@/components/shared/LoadingPage'
import { useAppContext } from '@/contexts/AppContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const isRouteLoading = useLoadingOnRouteChange()

  const router = useRouter()

  const { loggedUser } = useAppContext()

  useEffect(() => {
    if (loggedUser) {
      router.push('/home')
    }
  }, [loggedUser, router])

  return (
    <>
      <NextSeo title="Login | Book Wise" />
      {isRouteLoading ? (
        <LoadingPage />
      ) : (
        <SignInPageWrapper>
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
          <DividerLine />
          <WelcomeContainer>
            <WelcomeContent>
              <Heading>
                <h2>Welcome!</h2>
                <p>Please, login or enter as a guest.</p>
              </Heading>
              <SignInForm />
            </WelcomeContent>
          </WelcomeContainer>
        </SignInPageWrapper>
      )}
    </>
  )
}
