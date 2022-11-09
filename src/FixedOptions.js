export const Lang = [
  { value: 0, label: "Kurdish" },
  { value: 1, label: "Arabic" },
  { value: 2, label: "English" },
  { value: 3, label: "Turkish" },
];

export const ActivityTypes = [
  { label: "Add", value: 0 },
  { label: "Update", value: 1 },
  { label: "Delete", value: 2 },
];
export const BaseOnOptionsPaymentTermTemplate = [
  { label: "1 Month", value: 0 },
  { label: "6 Month", value: 1 },
  { label: "1 Year", value: 2 },
];
export const Doctype = [
  { Series: "DT-1", DocTypeName: "Branches" },
  { Series: "DT-2", DocTypeName: "Contract" },
  { Series: "DT-3", DocTypeName: "ContractTemplate" },
  { Series: "DT-4", DocTypeName: "ContractType" },
  { Series: "DT-5", DocTypeName: "Party" },
  { Series: "DT-6", DocTypeName: "Payment" },
  { Series: "DT-7", DocTypeName: "Permissions" },
  { Series: "DT-8", DocTypeName: "Property" },
  { Series: "DT-9", DocTypeName: "PropertyAttr" },
  { Series: "DT-10", DocTypeName: "PropertyType" },
  { Series: "DT-11", DocTypeName: "Purpose" },
  { Series: "DT-12", DocTypeName: "Roles" },
  { Series: "DT-13", DocTypeName: "Territory" },
  { Series: "DT-14", DocTypeName: "Users" },
  { Series: "DT-15", DocTypeName: "Currency" },
];

export const FormatOptions = [
  { label: "#.###,##", value: "#.###,##" },
  { label: "#,###.##", value: "#,###.##" },
  { label: "# ###.##", value: "# ###.##" },
  { label: "#.###", value: "#.###" },
  { label: "#,##,###.##", value: "#,##,###.##" },
  { label: "#,###", value: "#,###" },
  { label: "# ###", value: "# ###" },
  { label: "# ###,##", value: "# ###,##" },
  { label: "#, ###.##", value: "#, ###.##" },
  { label: "#'###.##", value: "#'###.##" },
  { label: "#.#", value: "#.#" },
];

export const PaymentTypeOptions = [
  { label: "Receive", value: false },
  { label: "Pay", value: true },
];
export const PurposesOptions = [
  {
    value: "materialReceipt",
    label: "Material Receipt",
  },
  {
    value: "damage",
    label: "Damage",
  },
];

export const StatusList = [
  {
    value: "Order",
    label: "Order",
  },
  {
    value: "Pending",
    label: "Pending",
  },
];
export const DiscountsList = [
  {
    value: "Percent",
    label: "Percent",
  },
  {
    value: "Amount",
    label: "Amount",
  },
];
export const DiscountsList_Boolean = [
  { label: "Percentage", value: false },
  { label: "Price", value: true },
];

export const BooleanColors = {
  false: "light-danger",
  true: "light-success",
};
export const BooleanColors2 = {
  false: "light-danger",
  true: "light-success",

};
export const PartyTypeOptions = [
  { label: "Customer", value: false },
  { label: "Supplier", value: true },
];
export const ForOptions = [
  {
    value: "Sell",
    label: "Sell",
  },
  {
    value: "Buy",
    label: "Buy",
  },
];

export const PriorityOptions = Array.from({ length: 10 }).map((x, i) => ({
  label: i + 1,
  value: i + 1,
}));
export const PricingRuleApplyOn = [
  { label: "Item", value: false },
  { label: "Item Group", value: true },
];
export const PayWith = [
  { label: "NassWallet", value: "NassWallet" },
  { label: "Item Group", value: "true" },
  { label: "hacker", value: "hacker" },
];
export const FormatNumber = {
  undefined: "#.##0,00",
  null: "#.##0,00",
  "": "#.##0,00",
  "#.###,##": "#.##0,00",
  "#,###.##": "#,##0.00",
  "# ###.##": "# ##0.00",
  "# ###,##": "# ##0,00",
  "#, ###.##": "#, ##0.00",
  "#.###": "0.000",
  "#,###": "0,000",
  "# ###": "0 000",
  "#'###.##": "#'##0.00",
  "#,##,###.##": "#,##,##0.00",
  "#.#": "0.##########################",
};

export const ListFonts = [
  { value: "Arial Black", label: "Arial Black" },
  { value: "Bahnschrift", label: "Bahnschrift" },
  { value: "Calibri", label: "Calibri" },
  { value: "Arial", label: "Arial" },
  { value: "Cambria", label: "Cambria" },
  { value: "Cambria Math", label: "Cambria Math" },
  { value: "Candara", label: "Candara" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Consolas", label: "Consolas" },
  { value: "Constantia", label: "Constantia" },
  { value: "Corbel", label: "Corbel" },
  { value: "Courier New", label: "Courier New" },
  { value: "Ebrima", label: "Ebrima" },
  { value: "Franklin Gothic Medium", label: "Franklin Gothic Medium" },
  { value: "Gabriola", label: "Gabriola" },
  { value: "Gadugi", label: "Gadugi" },
  { value: "Georgia", label: "Georgia" },
  { value: "HoloLens MDL2 Assets", label: "HoloLens MDL2 Assets" },
  { value: "Impact", label: "Impact" },
  { value: "Ink Free", label: "Ink Free" },
  { value: "Javanese Text", label: "Javanese Text" },
  { value: "Leelawadee UI", label: "Leelawadee UI" },
  { value: "Lucida Console", label: "Lucida Console" },
  { value: "Lucida Sans Unicode", label: "Lucida Sans Unicode" },
  { value: "Malgun Gothic", label: "Malgun Gothic" },
  { value: "Marlett", label: "Marlett" },
  { value: "Microsoft Himalaya", label: "Microsoft Himalaya" },
  { value: "Microsoft JhengHei", label: "Microsoft JhengHei" },
  { value: "Microsoft New Tai Lue", label: "Microsoft New Tai Lue" },
  { value: "Microsoft PhagsPa", label: "Microsoft PhagsPa" },
  { value: "Microsoft Sans Serif", label: "Microsoft Sans Serif" },
  { value: "Microsoft Tai Le", label: "Microsoft Tai Le" },
  { value: "Microsoft YaHei", label: "Microsoft YaHei" },
  { value: "Microsoft Yi Baiti", label: "Microsoft Yi Baiti" },
  { value: "MingLiU-ExtB", label: "MingLiU-ExtB" },
  { value: "Mongolian Baiti", label: "Mongolian Baiti" },
  { value: "MS Gothic", label: "MS Gothic" },
  { value: "MV Boli", label: "MV Boli" },
  { value: "Myanmar Text", label: "Myanmar Text" },
  { value: "Nirmala UI", label: "Nirmala UI" },
  { value: "Palatino Linotype", label: "Palatino Linotype" },
  { value: "Segoe MDL2 Assets", label: "Segoe MDL2 Assets" },
  { value: "Segoe Print", label: "Segoe Print" },
  { value: "Segoe Script", label: "Segoe Script" },
  { value: "Segoe UI", label: "Segoe UI" },
  { value: "Segoe UI Historic", label: "Segoe UI Historic" },
  { value: "Segoe UI Emoji", label: "Segoe UI Emoji" },
  { value: "Segoe UI Symbol", label: "Segoe UI Symbol" },
  { value: "SimSun", label: "SimSun" },
  { value: "Sitka", label: "Sitka" },
  { value: "Sylfaen", label: "Sylfaen" },
  { value: "Symbol", label: "Symbol" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
  { value: "Verdana", label: "Verdana" },
  { value: "Webdings", label: "Webdings" },
  { value: "Wingdings", label: "Wingdings" },
  { value: "Yu Gothic", label: "Yu Gothic" },
];

export const GenderOptions = [
  { label: "Male", value: true },
  { label: "Female", value: false },
  
];
export const ContractStatus=[
  {label:"Draft",value:false},{label:"Submitted",value:true}
]
export const Tables = {
  "DT-2": [
    {
      label: "Attributes",
      value: "Attributes",
      attributes: [
        { label: "Attribute", value: "Attributes" },
        { label: "Value", value: "AttributesValue" },
      ],
    },
    {
      label: "Furnitures",
      value: "Furnitures",
      attributes: [
        { label: "Subject", value: "Subject" },
        { label: "Statue", value: "Statue" },
        { label: "Price", value: "Price" },
        { label: "Currency", value: "Currency" },
        { label: "Qty", value: "Qty" },
      ],
    },
    {
      label: "ExtraPayment",
      value: "ExtraPayment",
      attributes: [
        { label: "PaymentType", value: "PaymentType" },
        { label: "FromParty", value: "FromParty" },
        { label: "ToParty", value: "ToParty" },
        { label: "Amount", value: "Amount" },
        { label: "PaidCurrency", value: "PaidCurrency" },
      ],
    },
  ],
    
  "DT-8": [
    {
      label: "Attribute",
      value: "Attribute",
      attributes: [
        { label: "Attribute", value: "Attribute" },
        { label: "Value", value: "Value" },
      ],
    },
    {
      label: "Furnitures",
      value: "Furnitures",
      attributes: [
        { label: "Subject", value: "Subject" },
        { label: "Statue", value: "Statue" },
        { label: "Price", value: "Price" },
        { label: "Currency", value: "Currency" },
        { label: "Qty", value: "Qty" },
      ],
    },
  ],
};
