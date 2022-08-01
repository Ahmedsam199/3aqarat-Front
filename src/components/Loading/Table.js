import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Table = ({ columns = 1, widths = [] }) => {
    console.log("hacker_it", columns)
    return (
        <tr >
            {
                widths.map((x, i) => (
                    <td style={{ width: x, paddingLeft: "1rem" }}>
                        <Skeleton
                            className="react-loading-skeleton mb-1"
                            count={7}
                            height={30}
                        />
                    </td>
                ))
            }
        </tr>
    )
}

export default Table