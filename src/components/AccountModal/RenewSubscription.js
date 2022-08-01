import { PayWith } from '@FixedOptions'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'reactstrap'
import CustomSelect from '../CustomSelect'
import UpgradeCards from './UpgradeCards'
const RenewSubscription = () => {
    const { t } = useTranslation()
    const [way, setWay] = useState("NassWallet")
    const onChange = e => { setWay(e.value) }
    return (
        <Container fluid className="RenewSubscription" tag="fieldset">
            <legend>{t("RenewSubscription")}</legend>
            <Row >
                <Col sm='12'>
                    <label>{t("Pay with")}</label>
                    <CustomSelect options={PayWith} value={way} onChange={onChange} />
                    <UpgradeCards wa={way} />
                </Col>
            </Row>
        </Container>

    )
}

export default RenewSubscription