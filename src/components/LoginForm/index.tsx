import { useState } from 'react'
import { Icon } from '@iconify/react'
import { RocketLaunch, SignIn } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'
import { signIn } from 'next-auth/react'

import { SignUpModal } from '@/components/SignUpModal'
import { CustomLabel } from '@/components/shared/Label'
import { InputContainer } from '@/components/shared/InputContainer'
import { FormErrors } from '@/components/shared/FormErrors'
import { CustomButton } from '@/components/shared/Button'

import {
  Input,
  SignUpBtn,
  FormContainer,
  Divider,
  AuthContainer,
  AuthOptions,
  AuthItem,
  HorizontalDivider,
} from './styles'

import { useScreenSize } from '@/utils/useScreenSize'
import { toast } from 'react-toastify'

const loginFormSchema = z.object({
  email: z.string().min(3, { message: 'E-mail is required.' }),
  password: z.string().min(3, { message: 'Password is required' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

interface LoginFormProps {
  onClose?: () => void
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  const router = useRouter()

  const isMobile = useScreenSize(480)

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn(provider: string) {
    setIsLoading(true)

    if (provider === 'google') {
      await signIn('google', { callbackUrl: '/home' })
    } else if (provider === 'github') {
      await signIn('github', { callbackUrl: '/home' })
    } else router.push('/home')

    setIsLoading(false)

    if (onClose) {
      onClose()
    }
  }

  async function onSubmit(data: LoginFormData) {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      console.error('Login failed', result.error)
    } else {
      toast.success('Welcome to the Book Wise!')
      router.push('/home')
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <CustomLabel>Your e-mail here:</CustomLabel>
          <Input placeholder="myuser@email.com" {...register('email')} />
          {errors.email && <FormErrors error={errors.email.message} />}
        </InputContainer>

        <InputContainer>
          <CustomLabel>Your password here:</CustomLabel>
          <Input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          {errors.password && <FormErrors error={errors.password.message} />}
        </InputContainer>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <SignUpBtn
              type="button"
              onClick={() => {
                setIsSignUpModalOpen(true)
              }}
            >
              Still don&apos;t have an account? Click here to sign up!
            </SignUpBtn>
          </Dialog.Trigger>
          {isSignUpModalOpen && (
            <SignUpModal
              onClose={() => {
                setIsSignUpModalOpen(false)
              }}
            />
          )}
        </Dialog.Root>

        <CustomButton
          type="submit"
          content="Sign in"
          icon={<SignIn size={24} />}
          isSubmitting={isSubmitting || isLoading}
        />
        <Divider />

        <AuthContainer>
          <p>Or Login with:</p>
          <AuthOptions>
            <AuthItem type="button" onClick={() => handleSignIn('google')}>
              <Icon icon="flat-color-icons:google" fontSize={24} />
              <p>Google</p>
            </AuthItem>
            {!isMobile && <HorizontalDivider />}
            <AuthItem type="button" onClick={() => handleSignIn('github')}>
              <Icon
                icon="ant-design:github-outlined"
                color="white"
                fontSize={24}
              />
              <p>Github</p>
            </AuthItem>
            {!isMobile && <HorizontalDivider />}
            <AuthItem type="button" onClick={() => router.push('/home')}>
              {<RocketLaunch size={24} />}
              <p>Guest</p>
            </AuthItem>
          </AuthOptions>
        </AuthContainer>
      </FormContainer>
    </>
  )
}
