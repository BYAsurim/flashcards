import { PersonalInformation } from '@/components/profile'
import { Page } from '@/components/ui'
import { router } from '@/router/router'
import {
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
      await deleteAccount().unwrap()
      await logout().unwrap()
      await router.navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }
  const upDateProfileHandler = async (data: FormData) => {
    try {
      await upDateProfile(data).unwrap()
    } catch (e) {
      console.log(e)
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
