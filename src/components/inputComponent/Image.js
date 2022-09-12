import React, { useMemo } from 'react';
import { Image } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Input } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
const InputImage = ({ title, Icon, onChange, base64 = true }) => {
    const { t } = useTranslation()
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
        <>
            <label for={id} >{
                title ?
                    <div className='d-flex flex-column align-items-center'>
                        <Image />
                        {t(title)}
                    </div>
                    : <Icon size={40} />}
            </label>
            <Input id={id} type="file" style={{ display: "none" }} onChange={e => {
                base64 ?
                    getBase64(e, onChange) : onChange(e)
            }} />
        </>
    )
}

export default InputImage