import React, { useMemo } from 'react'
import { Input, FormGroup } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';

const Image = ({ title, Icon, onChange, base64 = true }) => {
    const id = useMemo(() => uuidv4(), [])
    const getBase64 = (e, cb) => {
        let blob = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64String = reader.result;
            cb(base64String.substr(base64String.indexOf(", ") + 1))
        };
    }
    return (
        <FormGroup>
            <label for={id} style={{ background: "red" }}>{title ?? <Icon size={40} />} </label>
            <Input id={id} type="file" style={{ display: "none" }} onChange={e => {
                base64 ?
                    getBase64(e, onChange) : onChange(e)
            }} />
        </FormGroup>
    )
}

export default Image