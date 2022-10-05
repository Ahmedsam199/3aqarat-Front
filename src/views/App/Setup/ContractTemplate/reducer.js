import { getSubstring } from '@utils'
const processHTML = (html) => {
    const [htmlData] = getSubstring({ string: html, start: "id=\"Body-start-html\">", end: "<div style=\"display:none;\" id=\"Body-end-html\"></div>", inner: true });
    const [Footer] = getSubstring({ string: html, start: "id=\"Footer-html\" src=\"", end: "\"", inner: true});
    const [Header] = getSubstring({ string: html, start: "id=\"Header-html\" src=\"", end: "\"", inner: true});
    return {
        htmlData, Footer, Header
    }
}
export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'initValues': {
            
            const { htmlData, Footer, Header } = processHTML(payload.HTML)
            return {
                ...state,
                copyCount: payload.CopyCount,
                htmlData,
                Footer,
                Header,
                printName: payload.Name,
                isReceipt: payload.IsReceipt,
                isRtl: payload.IsRtl,
                isDefault: payload.IsDefault,
                printOnSubmit: payload.PrintOnSubmit,
                tableHeadersColor: payload.TableHeadersColor ?? "#000",
            }
        }
        case 'setCopyCount': {
            return { ...state, copyCount: payload }
        }
        case 'setDisplayColorPicker': {
            return { ...state, displayColorPicker: payload }
        }
        case 'setTableHeadersColor': {
            return { ...state, tableHeadersColor: payload }
        }
        case 'setColor': {
            return { ...state, color: payload }
        }
        case 'setIsReceipt': {
            return { ...state, isReceipt: payload }
        }
        case 'setPrintOnSubmit': {
            return { ...state, printOnSubmit: payload }
        }
        case 'setIsRtl': {
            return { ...state, isRtl: payload }
        }
        case 'setDoctype': {
            return { ...state, doctype: payload }
        }
        case 'setHtmlData': {
            return { ...state, htmlData: payload }
        }
        case 'setPrintName': {
            return { ...state, printName: payload }
        }
        case 'setIsDefault': {
            return { ...state, isDefault: payload }
        }
        case 'setFooter': {
            return { ...state, Footer: payload }
        }
        case 'setHeader': {
            return { ...state, Header: payload }
        }
        default:
            return state;
    }
};
export const initialState = (params) => ({
    displayColorPicker: false,
    copyCount: 1,
    tableHeadersColor: '#000',
    htmlData: "",
    Footer: null,
    Header: null,
    printName: params.name,
    doctype: params.doctype,
    PrintOnSubmit: params.PrintOnSubmit === 'true' ? true : false,
    isDefault: params.isDefault === 'true' ? true : false,
    isReceipt: params.isReceipt === 'true' ? true : false,
    isRtl: params.isRtl === 'true' ? true : false,
});