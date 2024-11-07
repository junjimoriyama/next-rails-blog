import LogoutButton from '@/app/auth/logout/LogoutButton'
import UserInfo from '@/app/users/userInfo/UserInfo'
import './header.scss'

const Header = () => {
  
  return (
    <header>
      <LogoutButton/>
      <UserInfo />
    </header>
  )
}

export default Header