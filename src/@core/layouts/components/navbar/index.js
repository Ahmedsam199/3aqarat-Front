// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <Fragment>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
