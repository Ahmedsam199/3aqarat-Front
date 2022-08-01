import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import errorImg from '@src/assets/images/pages/error.svg'

import '@styles/base/pages/page-misc.scss'

const Error = ({ msg }) => {
    return (
        <div className='misc-wrapper'>
            <div className='misc-inner p-2 p-sm-3'>
                <div className='w-100 text-center'>
                    <h2 className='mb-1'>{msg} 💀</h2>
                    <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
                        Back to home
                    </Button>
                    <img className='img-fluid' src={errorImg} alt='Not authorized page' />
                </div>
            </div>
        </div>
    )
}
export default Error
