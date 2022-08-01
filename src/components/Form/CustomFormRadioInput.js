// ** Reactstrap Imports
import { t } from 'i18next'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormGroup, Input, Label } from 'reactstrap'
import { v4 as uuidV4 } from 'uuid'
const RadioColors = ({ name, title, color = "primary", options = [], column = true }) => {
    const { formState: { errors }, register, control, getValues } = useFormContext()
    const _defaultValue = useWatch({
        control,
        name
    })
    return (
        <div className={`d-flex justify-content-between align-items-center flex-${column ? "column" : "row"}`}>
            <Label Label for={`${name}`} className={column ? "mb-2" : ""}>
                <h5 className={`d-inline ${column ? "text-center" : ""}`}>{t(title ?? name)}  </h5>
            </Label>
            <div className={`form-check form-check-${color} ${column ? "w-100" : "ml-4"} flex-grow-1 d-flex justify-content-between align-items-center`}>
                {
                    options.map((x, i) => {
                        const _id = `${x.value}-${uuidV4()}`
                        return (
                            <Label className='form-check-label' >
                                <Input
                                    type='radio'
                                    defaultChecked={x.value === _defaultValue}
                                    innerRef={register({
                                        required: true,
                                    })}
                                    control={control}
                                    name={name}
                                    value={x.value}
                                    id={_id}
                                />
                                {x.label}
                            </Label>
                        )
                    }
                    )
                }
                {/* <Input type='radio' id='radio-primary' />
                <Label className='form-check-label' for='radio-primary'>
                    2
                </Label> */}
            </div>
        </div>
    )
}
export default RadioColors
