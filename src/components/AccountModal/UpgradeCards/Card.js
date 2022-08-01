export const Card = ({
    imageSource,
    month,
    price,
    discount = '',
    handler,
}) => (
    <div className="UpgradeCard" onClick={() => handler(price)}>
        <div>
            <img className="UpgradeImage" src={imageSource} />
        </div>
        <h3>{month}</h3>
        <h6>
            <span className="Discount">{discount}</span>
            <span> </span>
            <span className="UpgradePrice">{price}</span>
        </h6>
        <p>/per user</p>
    </div>
);