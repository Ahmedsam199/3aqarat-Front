import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import PreviewValue from '../PreviewValue'
const License = () => {
    const { t } = useTranslation()
    const { AccountInfo: { LicenseStart, LicenseEnd, AccountName, LicenseType } } = useSelector(state => state)
    return (
        <Container fluid className="License" tag="fieldset">
            <legend>{t("License")}</legend>
            <Row >
                <Col sm='6'>
                    <PreviewValue label='Name' value={AccountName.replace('[', '').replace(']', '')} />
                </Col>
                <Col sm='6'>
                    <PreviewValue label='LicenseType' value={LicenseType} />
                </Col>
                <Col sm='6'>
                    <PreviewValue label='StartDate' value={LicenseStart} />
                </Col>
                <Col sm='6'>
                    <PreviewValue label='StartEnd' value={LicenseEnd} />
                </Col>
            </Row>
        </Container>
    )
}

export default License