import { confirmAlert2 } from '@alerts'
import { toBoolean } from '@utils'
import classnames from 'classnames'
import CustomSelectWithGroup from '@Component/CustomSelectWithGroup'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import {
    FormGroup,
    Label
} from 'reactstrap'
import { ErrorMessage } from '../ErrorMessage'
function CustomFormSelect({
    name,
    title,
    loading = false,
    textName = "label",
    data,
    groups,
    isMulti,
    valueName = "value",
    IsDisabled = false,
    hacConfirmMessage = false,
    isClearable = false,
    IsHidden = false,
    ...restCustom
}) {
    const { t } = useTranslation()
    const { formState: { errors }, control, getValues } = useFormContext()
    const changeValue = (val, onChange) => {

        if (isMulti) {
            onChange(val?.map(x => x[`${valueName}`]) ?? null)
        } else {
            onChange(val[`${valueName}`] ?? null)
        }
    }
    const _write = toBoolean(useWatch({ control, name: "_write" }))
    const _previousValue = useWatch({ control, name: [name] })
    return (
        <FormGroup>
            {!IsHidden &&
                <>
                    <>
                        <Label for={`${name}`}>
                            {t(`${title ?? name}`)}
                        </Label>
                        {!loading ?
                            <Controller
                                control={control}
                                name={`${name}`}
                                render={({ field: { onChange, ref, ...rest } }) => {
                                    return (
                                        <CustomSelectWithGroup
                                            {...rest}
                                            value={data.find(x => x[`${valueName}`] === rest.value) ?? null}
                                            isClearable={isClearable}
                                            className={classnames({
                                                'is-invalid': errors[`${name}`],
                                            })}
                                            isMulti={isMulti}
                                            textName={textName}
                                            valueName={valueName}
                                            inputRef={ref}
                                            onChange={(val) => {
                                                if (!isMulti && _previousValue[name] === val[`${valueName}`]) return
                                                if (!hacConfirmMessage) {
                                                    changeValue(val, onChange)
                                                } else {
                                                    confirmAlert2(null,
                                                        () => {
                                                            changeValue(val, onChange)
                                                        },
                                                        "en")
                                                }
                                            }}
                                            groups={groups}
                                            data={data}
                                            isDisabled={IsDisabled || !_write}
                                            {...restCustom}
                                        />
                                    )
                                }}
                            /> :
                            <div className='d-flex align-items-end' style={{ overflow: "hidden" }}>
                                <Skeleton height={37} width={400} />
                            </div>
                        }
                        <ErrorMessage error={errors[`${name}`]?.message} />
                    </>
                </>
            }
        </FormGroup>
    )
}

export default React.memo(CustomFormSelect)
