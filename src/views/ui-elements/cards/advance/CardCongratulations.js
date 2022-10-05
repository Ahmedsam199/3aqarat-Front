// ** Icons Imports
import { Award, Globe, Home } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import { Global } from '@emotion/react'

const CardCongratulations = () => {
  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <img
          className="congratulations-img-left"
          src={decorationLeft}
          alt="decor-left"
        />
        <img
          className="congratulations-img-right"
          src={decorationRight}
          alt="decor-right"
        />
        <Avatar
          icon={<Globe size={28} />}
          className="shadow"
          color="primary"
          size="xl"
        />
        <div className="text-center">
          <h1 className="mb-1 text-white">
            {" "}
            Welcome To Al-Jazary <br></br>
            <span style={{ color: "#ff9f43" }}>Real Estate</span>
          </h1>
          <CardText className="m-auto w-75">
            <strong>
              {/* <i> */}
              <h1></h1>
              {/* </i> */}
            </strong>
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
}

export default CardCongratulations
