import React, { useEffect, useState } from 'react'
import { Card as UpgradeCard } from './Card'
const monthImg =
    require(`@src/assets/images/AccountModal/diamond#1.png`).default,
    halfYearImg =
        require(`@src/assets/images/AccountModal/diamond#2.png`).default,
    yearImg =
        require(`@src/assets/images/AccountModal/diamond#3.png`).default;
const UpgradeCards = ({ way }) => {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // const fetchUsers = async () => {
        //     const response = await get(Routes.Users.read);
        //     setUsers(response?.data?.filter((e) => e.Series !== undefined));
        // };
        // fetchUsers();
    }, []);

    const handleClick = (amount) => {
        amount = amount.replace('$', '');
        amount = parseInt(amount) * 1480.0 * users.length;
        amount = amount + '';

        setLoading(true);
        apiClient
            .post(Routes.Payment.NassWallet, {
                amount,
            })
            .then((res) => {
                setLoading(false);
                shell.openExternal(res.data.routingUrl);
            })
            .catch((e) => {
                console.log('Joseph', e);
            });
    };
    return (
        <>
            <div className='UpgradeContainer'>
                {loading && (
                    <Spinner
                        style={{ position: 'fixed', top: '50%', left: '50%' }}
                        color="white"
                        size="lg"
                        className="mr-1"
                    />
                )}
                <UpgradeCard
                    imageSource={monthImg}
                    month="1 Month"
                    price="$15"
                    handler={handleClick}
                />
                <UpgradeCard
                    imageSource={halfYearImg}
                    month="6 Month"
                    price="$82.2"
                    discount="$90"
                    handler={handleClick}
                />
                <UpgradeCard
                    imageSource={yearImg}
                    month="1 Year"
                    price="$165.0"
                    discount="$180.0"
                    handler={handleClick}
                />
            </div>
        </>
    );
};




export default UpgradeCards