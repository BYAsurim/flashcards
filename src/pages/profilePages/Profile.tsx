import { toast } from 'react-toastify'

import { PersonalInformation } from '@/components/profile'
import { Page } from '@/components/ui'
import { router } from '@/router/router'
import {
  AuthErrorResponse,
  useDeleteMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpDateProfileMutation,
} from '@/services/auth'

export const Profile = () => {
  const { data } = useGetMeQuery()
  const [deleteAccount] = useDeleteMutation()
  const [logout] = useLogoutMutation()
  const [upDateProfile] = useUpDateProfileMutation()

  const deleteAccountHandler = async () => {
    try {
      await toast.promise(deleteAccount().unwrap(), { pending: 'In progress', success: 'Success' })
      await logout().unwrap()
      await router.navigate('/login')
    } catch (e) {
      const err = e as AuthErrorResponse

      toast.error(err?.data?.message ?? 'Uncaught error.')
    }
  }
  const upDateProfileHandler = async (data: FormData) => {
    try {
      await toast.promise(upDateProfile(data).unwrap(), {
        pending: 'In progress',
        success: 'Success',
      })
    } catch (e) {
      const err = e as AuthErrorResponse

      toast.error(err?.data?.message ?? 'Uncaught error.')
    }
  }

  return (
    <Page>
      <PersonalInformation
        avatar={data?.avatar}
        email={data?.email}
        logOut={logout}
        name={data?.name}
        onDelete={deleteAccountHandler}
        upDateProfile={upDateProfileHandler}
      />
    </Page>
  )
}
