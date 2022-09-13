import { lazy } from 'react'

const Contract = lazy(() => import('../../../views/App/contract/contracts'))
const ContractPOST = lazy(() => import('../../../views/App/contract/contracts/post'))
const Payment = lazy(() => import('../../../views/App/contract/payment'))
const PaymentPOST = lazy(() => import('../../../views/App/contract/payment/post'))
export default [
    {
        element: <Contract />,
        path: "/Contract/Contract",

        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <ContractPOST />,
        path: "/Contract/NewContract",
        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <ContractPOST />,
        path: "/Contract/UpdateContract/:series",
        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <Payment />,
        path: "/Contract/Payment",
        meta: {
            action: "read",
            resource: "DT-6",
        },
    },
    {
        element: <PaymentPOST />,
        path: "/Contract/NewPayment",
        meta: {
            action: "read",
            resource: "DT-6",
        },
    },
    {
        element: <PaymentPOST />,
        path: "/Contract/UpdatePayment/:series",
        meta: {
            action: "read",
            resource: "DT-6",
        },
    }
]