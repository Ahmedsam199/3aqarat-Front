import Core from '../../core'
export default Core.Object({
    PartyType: Core.String(),
    PartyName: Core.String(),
    DefaultCurrency: Core.String(),
    Phone: Core.String(),
    IsDefault: Core.Boolean(),
    Disabled: Core.Boolean(),
    Cell: Core.String(false),
    Address: Core.String(false),
    ContactPerson: Core.String(false),
})