import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'


const NavBar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <img src={Logo}></img>
        </div>
        <ul>
          <li>
                <Link to="/">All tasks</Link>
            </li>
            <li>
                <Link to ="addTask">Add Task</Link>
            </li>
        </ul>
        
    </nav>
  )
}

export default NavBar