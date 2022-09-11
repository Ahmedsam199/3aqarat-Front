const Owner = lazy(() => import('../../../views/App/Property/Owner'))
const Attribute = lazy(() => import('../../../views/App/Property/Property_Attribute'))
const Property = lazy(() => import('../../../views/App/Property/Property'))
const PropertyPOST = lazy(() => import('../../../views/App/Property/Property/post'))
const Territory = lazy(() => import('../../../views/App/Property/Territory'))


export default [
    {
        element: <Property />,
        path: "/Properties/Properties",
        meta: {
            action: "read",
            resource: "DT-8",
        },
    },
    {
        path: "/Properties/Property/New",
        element: <PropertyPOST />,
        meta: {
            action: "read",
            resource: "DT-8",
        },
    },
    {
        element: <PropertyPOST />,
        path: "/Properties/Property/Update/:series",
        meta: {
            action: "read",
            resource: "DT-8",
        },
    },
    {
        element: <Territory />,
        path: "/Properties/Territory",
        meta: {
            action: "read",
            resource: "DT-13",
        },
    },
    {
        element: <Owner />,
        path: "/Properties/Owner",
        meta: {
            action: "read",
            resource: "DT-5",
        },
    },
    {
        element: <Attribute />,
        path: "/Properties/Attribute",
        meta: {
            action: "read",
            resource: "DT-9",
        },
    },
]