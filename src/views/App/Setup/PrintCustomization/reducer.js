import { getSubstring } from '@utils'
const processHTML = (html) => {
    const [htmlData] = getSubstring({ string: html, start: "id=\"Body-start-html\">", end: "<div style=\"display:none;\" id=\"Body-end-html\"></div>", inner: true });
    const [Footer] = getSubstring({ string: html, start: "id=\"Footer-html\" src=\"", end: "\"", inner: true });
    const [Header] = getSubstring({ string: html, start: "id=\"Header-html\" src=\"", end: "\"", inner: true });
    const [WaterMark] = getSubstring({ string: html, start: "data-waterMark=\"", end: "\"></div>", inner: true });
    return {
        htmlData, Footer, Header, WaterMark
    }
}
export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'initValues': {
            const { htmlData, Footer, Header, WaterMark } = processHTML(payload.HTML)
            // console.log('hacker_it HTML', htmlData);
            // console.log('hacker_it Footer', Footer);
            // console.log('hacker_it Header', Header);
            // console.log('hacker_it WaterMark', WaterMark);
            return {
                ...state,
                copyCount: payload.copyCount,
                htmlData,
                Footer,
                Header,
                WaterMark,
                printName: payload.Name,
                isReceipt: payload.isReciept,
                isRtl: payload.isRtl,
                isDefault: payload.isDefault,
                printOnSubmit: payload.printOnSubmit,
                fontSize: payload.FontSize,
                fontFamily: payload.FontFamily,
                tableHeadersColor: payload.TableHeadersColor,
            }
        }
        case 'setDisplayColorPicker': {
            return { ...state, displayColorPicker: payload }
        }
        case 'setCopyCount': {
            return { ...state, copyCount: payload }
        }
        case 'setFontSize': {
            return { ...state, fontSize: payload }
        }
        case 'setFontFamily': {
            return { ...state, fontFamily: payload }
        }
        case 'setTableHeadersColor': {
            return { ...state, tableHeadersColor: payload }
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
        case 'setColor': {
            return { ...state, color: payload }
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
        case 'setWaterMark': {
            return { ...state, WaterMark: payload }
        }
        default:
            return state;
    }
};
export const initialState = (params) => ({
    displayColorPicker: false,
    copyCount: 1,
    fontSize: 1,
    fontFamily: '',
    tableHeadersColor: '',
    isReceipt: false,
    PrintOnSubmit: false,
    isRtl: params.isRtl === 'true' ? true : false,
    doctype: params.doctype,
    color: '#c00',
    htmlData: "",
    printName: params.name,
    isDefault: params.isDefault === 'true' ? true : false,
    Footer: null,
    Header: null,
    WaterMark: null,
});