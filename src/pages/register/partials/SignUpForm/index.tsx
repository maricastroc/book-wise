import { useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { handleApiError } from '@/utils/handleApiError'
import { api } from '@/lib/axios'
import { z } from 'zod'

import { InputContainer } from '@/components/core/InputContainer'
import { FormErrors } from '@/components/core/FormErrors'
import { Button } from '@/components/core/Button'
import { Input } from '@/components/core/Input'
import { LinkButton } from '@/components/core/LinkButton'
import AvatarDefaultImage from '../../../../../public/assets/avatar_mockup.png'

import {
  AvatarSection,
  DeleteAvatarButton,
  Wrapper,
  AvatarUploadWrapper,
} from './styles'
import { Form } from '@/components/core/Form'
import { AvatarUploadPreview } from '@/components/core/AvatarUploadPreview'
import { TrashSimple } from 'phosphor-react'
import { ImageCropper } from '@/components/shared/ImageCropper'
import { FileInput } from '@/components/core/FileInput'

const signUpFormSchema = z.object({
  email: z.string().min(3, { message: 'E-mail is required.' }),
  name: z.string().min(3, { message: 'Name is required.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  avatarUrl: z
    .custom<File | undefined>()
    .refine((file) => !file || file instanceof File, {
      message: 'Avatar must be a valid file',
    })
    .optional(),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUpForm() {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [showCropper, setShowCropper] = useState(false)

  const [originalImage, setOriginalImage] = useState<string | null>(null)

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: SignUpFormData) {
    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('name', data.name)

    if (data?.avatarUrl) {
      formData.append('avatarUrl', data.avatarUrl)
    }

    try {
      setIsLoading(true)

      await api.post(`/user/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('User successfully registered!')
      router.push('/')
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('avatarUrl', file)

      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)

        setOriginalImage(reader.result as string)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCroppedImage = (croppedImage: string) => {
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'avatar.jpg', {
          type: 'image/jpeg',
        })

        setValue('avatarUrl', file)
        setAvatarPreview(croppedImage)
        setShowCropper(false)
      })
  }

  const handleDeleteAvatar = () => {
    setAvatarPreview(null)
    setValue('avatarUrl', undefined)

    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  return (
    <>
      <Wrapper>
        <h2>Sign Up</h2>

        <Dialog.Root open={!!originalImage && showCropper}>
          <ImageCropper
            src={originalImage as string}
            onCrop={handleCroppedImage}
            aspectRatio={1}
            onClose={() => setShowCropper(false)}
          />
        </Dialog.Root>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <AvatarSection>
            <InputContainer>
              <AvatarUploadWrapper>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <FileInput
                    hasBorder={false}
                    buttonText="Choose file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    content={watch('avatarUrl')?.name || 'Add your avatar'}
                  />
                </div>

                {avatarPreview && (
                  <DeleteAvatarButton
                    type="button"
                    onClick={handleDeleteAvatar}
                    aria-label="Remove avatar"
                  >
                    <TrashSimple size={18} />
                  </DeleteAvatarButton>
                )}
              </AvatarUploadWrapper>

              {errors.avatarUrl && (
                <FormErrors error={errors.avatarUrl.message} />
              )}
            </InputContainer>
            <AvatarUploadPreview
              avatarPreview={avatarPreview}
              defaultImage={AvatarDefaultImage.src}
            />
          </AvatarSection>

          <InputContainer>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input placeholder="Name" {...field} />}
            />
            {errors.name && (
              <FormErrors error={errors.name.message && 'Name is required.'} />
            )}
          </InputContainer>

          <InputContainer>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input placeholder="Email Address" {...field} />
              )}
            />
            {errors.email && <FormErrors error={errors.email.message} />}
          </InputContainer>

          <InputContainer>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password" placeholder="Password" {...field} />
              )}
            />
            {errors.password && <FormErrors error={errors.password.message} />}
          </InputContainer>

          <Button
            type="submit"
            content="Create your account"
            isSubmitting={isSubmitting || isLoading}
            style={{
              marginTop: '1rem',
            }}
          />
        </Form>

        <LinkButton
          type="button"
          onClick={() => {
            router.push('/')
          }}
          style={{ marginTop: '1rem' }}
        >
          Already have an account? <span>Login</span>
        </LinkButton>
      </Wrapper>
    </>
  )
}
