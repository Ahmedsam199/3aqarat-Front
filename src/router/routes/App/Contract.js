
const Contract = lazy(() => import('../../../views/App/contract/contracts'))
const ContractPOST = lazy(() => import('../../../views/App/contract/contracts/post'))
const Payment = lazy(() => import('../../../views/App/contract/payment'))
const PaymentPOST = lazy(() => import('../../../views/App/contract/payment/post'))
export default [
    {
        element: <Contract />,
        path: "/App/Contract/Contract",

        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <ContractPOST />,
        path: "/App/Contract/NewContract",
        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <ContractPOST />,
        path: "/App/Contract/UpdateContract/:series",
        meta: {
            action: "read",
            resource: "DT-2",
        },
    },
    {
        element: <Payment />,
        path: "/App/Contract/Payment",
        meta: {
            action: "read",
            resource: "DT-6",
        },
    },
    {
        element: <PaymentPOST />,
        path: "/App/Contract/NewPayment",
        meta: {
            action: "read",
            resource: "DT-6",
        },
    },
    {
        element: <PaymentPOST />,
        path: "/App/Contract/UpdatePayment/:series",
        meta: {
            action: "read",
            resource: "DT-6",
        },
    }
]