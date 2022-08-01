import classes from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
const PreviewValue = ({ label = "", value = "", column = false }) => {
    const { t } = useTranslation()
    return (
        <div className={classes("preview-value d-flex justify-content-start align-items-center", { "flex-column": !!column })}>
            <span className='title'> {t(label)} :</span>
            <span className={classes("value", { "px-1": !column })}>{value}</span>
        </div>
    )
}

export default PreviewValue