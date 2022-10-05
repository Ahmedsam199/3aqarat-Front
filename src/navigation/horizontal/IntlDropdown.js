// ** Third Party Components
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
const IntlDropdown = () => {
  // ** Hooks
  
  const { i18n } = useTranslation()
const img =
  "<img src'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47FZB1fv1hovR4mn-b1SaHFlr3muL_TXooH4Ex_gO2g&s'></img>";
  // ** Vars
  const langObj = {
    en: "English",
    de: "German",
    fr: "French",
    pt: "Portuguese",
    tr:"Turkish",
    iq: "Iraq",
    img: "Kurdish",
  };

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
  }

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={(e) => e.preventDefault()}
      >
        <ReactCountryFlag
          svg
          className="country-flag flag-icon"
          countryCode={i18n.language === "en" ? "us" : i18n.language}
        />
        <span className="selected-language">{langObj[i18n.language]}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "en")}
        >
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">English</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "iq")}
        >
          <ReactCountryFlag className="country-flag" countryCode="iq" svg />
          <span className="ms-1">Iraq</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "tr")}
        >
          <ReactCountryFlag className="country-flag" countryCode="tr" svg />
          <span className="ms-1">Turkish</span>
        </DropdownItem>

        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "kr")}
        >
          <img
            height={14}
            width={18}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47FZB1fv1hovR4mn-b1SaHFlr3muL_TXooH4Ex_gO2g&s"
          ></img>
          <span className="ms-1">Kurdish</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default IntlDropdown
