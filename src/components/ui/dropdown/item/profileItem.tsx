import profileAvatar from '@/components/ui/dropdown/image/userAvatar.jpg'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from '@/components/ui/dropdown/dropdown.module.scss'

export const ProfileItem = () => {
  const profile = { avatar: profileAvatar, email: 'j&johnson@gmail.com', name: 'IVAN' }

  return (
    <DropdownMenu.Item className={s.dropdownMenuItem}>
      <div className={s.container}>
        <div className={s.avatar}>
          <img alt={'profileAvatar'} src={profile.avatar || undefined} />
        </div>
        <div className={s.containerInfo}>
          <div className={s.name}>{profile.name}</div>
          <div className={s.email}>{profile.email}</div>
        </div>
      </div>
    </DropdownMenu.Item>
  )
}
