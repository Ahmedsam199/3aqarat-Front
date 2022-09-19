import { t } from "i18next";
import format from 'number-format.js';
import { FormatNumber } from '../FixedOptions';

export const buildPage = ({ content, title }) => `
  <head>
   <style>
    @media print
      {
      .page-break  { display:block; page-break-before:always; }

      }
        table{
          width:100%;
          
          
        }
        table, th, td
        {
          border-collapse:collapse;
          border: 1px solid black;
          text-align:center;
        }
        th{
           font-size:.8rem;
           font-weight:600;
           padding:0 0.5rem;
           background:#787272;
           color:white;
        }
       td{
         font-size:.8rem;
         font-weight:400;
         
           }
       table tbody td:nth-child(2){
         min-width: 126px;
       }
       footer{
         text-align:center;
         margin-top:1rem;
       }
       h1{
         text-align:center;
       }
       .spacing{
         padding:0.5rem;
       }
   </style>
  </head>
  <body>
  <h1>${title}</h1>
  ${content}
  </body>
  `;
export const checkTime = (data) => {
    return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
        data
    );
};
export const changeDateFormat = (date) => {
    const _date = new Date(date.slice(0, date.length - 1));
    return `${_date?.toLocaleDateString()}-${_date?.toLocaleTimeString()}`;
};
export const fixValue = (data) => {
    if (typeof data === 'boolean') return data ? 'true' : 'false';
    if (typeof data === 'number') return data.toFixed(2);
    if (checkTime(data)) return changeDateFormat(data);
    if (typeof data === 'string') return data;
    return '';
};
export const buildHTMLTable = ({ data = [], numberedRow = false, shift = 0 }) => {
    
    const _keys = Object.keys(data[0]);
    
    let Table = `<table>`;
    // add header for table
    Table += '<tr>';
    if (numberedRow)
        Table += `<th>#</th>`;
    for (let j = 0; j < _keys?.length; j++) {
        Table += `<th>${t(`${_keys[j]}`)}</th>`;
    }
    Table += '</tr>';
    // add body for  table
    for (let i = 0; i < data?.length; i++) {
        Table += '<tr>';
        if (numberedRow)
            Table += `<td>${shift + i + 1}</td>`;
        for (let j = 0; j < _keys.length; j++) {
            Table += `<td>${fixValue(data[i][_keys[j]])}</td>`;
        }
        Table += '</tr>';
    }
    Table += '</table>';
    return Table;
};
export const buildHTMLTableV2 = ({ data = [], numberedRow = false }) => {
    const _keys = Object.keys(data[0]);
    
    let Table = `<table>`;
    // add header for table
    Table += '<thead><tr>';
    if (numberedRow)
        Table += `<th>#</th>`;
    for (let j = 0; j < _keys?.length; j++) {
        Table += `<th>${t(`${_keys[j]}`)}</th>`;
    }
    Table += '</tr></thead>';
    // add body for  table
    Table += '<tbody>';
    for (let i = 0; i < data?.length; i++) {
        Table += '<tr>';
        if (numberedRow)
            Table += `<td>${i + 1}</td>`;
        for (let j = 0; j < _keys.length; j++) {
            Table += `<td>${fixValue(data[i][_keys[j]])}</td>`;
        }
        Table += '</tr>';
    }
    Table += '</tbody>';
    Table += '</table>';
    return Table;
};
export const dividedData = ({
    data,
    countOfRow = 38,
    firstCountOfRow = 33,
    numberedRow = false,
    shift = 0,

}) => {
    let content = '',
        index = 0,
        pageCount = 0;
    const First_WINDOW_LENGTH = firstCountOfRow;
    const WINDOW_LENGTH = countOfRow;
    // first page
    content += buildHTMLTable({ data: data.slice(0, First_WINDOW_LENGTH), numberedRow });
    content += `<footer>-${shift + 1}-</footer> <div class="page-break"></div> `; // next page
    for (
        index = First_WINDOW_LENGTH, pageCount = 2;
        index + WINDOW_LENGTH < data.length + WINDOW_LENGTH;
        index += WINDOW_LENGTH, pageCount++
    ) {
        content += buildHTMLTable({
            data: data.slice(index, index + WINDOW_LENGTH),
            numberedRow,
            shift: firstCountOfRow + countOfRow * (pageCount - 2)
        });
        content += ` <footer>-${shift + pageCount}-</footer> <div class="page-break"></div> `;
    }

    return content;
};

const getSubstring = ({ string, start, end, inner = false }) => {
    try {
        const _start = string.indexOf(start);
        if (_start < 0) throw new Error();
        const _stringAfterStart = string.slice(_start + start.length);
        const _end = _stringAfterStart.indexOf(end);
        if (_end < 0) throw new Error();
        return [
            string.slice(
                _start + (start.length * inner),
                _end + (end.length * !inner) + (string.length - _stringAfterStart.length)
            ),
            _end + end.length + (string.length - _stringAfterStart.length),
        ];
    } catch (error) {
        return [];
    }
};
const getMentionValue = ({ mention, PrintKeys, data }) => {
    try {
        console.log('hacker_it', PrintKeys[mention]);
        return (data.hasOwnProperty(PrintKeys[mention])) ? data[PrintKeys[mention]] : PrintKeys[mention]
    } catch (error) {
        console.error('hacker_it_error', error)
        return ""
    }
}
export const replaceMentions = ({ template, data, PrintKeys }) => {
    try {
        let tempString = template
        for (let index = 0; index < template.length;) {
            const [mention, end] = getSubstring({ string: template.slice(index), start: '<a data-mention="true">', end: '</a>', inner: true });
            tempString = tempString.replace(mention, getMentionValue({ mention, PrintKeys, data }))
            index += end;
        }
        return tempString
    } catch (error) {
        console.error('hacker_it_error', error)
        return ""
    }
};

const getAttributeFromObject = (x, arr) => {
    return arr
        .map((y) => {
            return { [y]: x[y] };
        }).
        reverse().
        reduce((x, s) => ({ ...s, ...x }), {});
};
const replaceTable = ({ name, realTable, template, tempString }) => {
    try {
        let startIndex = template.indexOf(`<table id="${name}"`)
        let endIndex = template.indexOf("</table>", startIndex);
        // to get last chart of table
        endIndex += 8;
        let templateTable = template.substring(startIndex, endIndex);
        return tempString.replace(templateTable, realTable);
    } catch (error) {
        console.error('hacker_it_error', error)
        return ""
    }
}
const getAttributes = (string) => {
    let attributes = [];
    for (let index = 0; index < string.length;) {
        const [attribute, end] = getSubstring({ string: string.slice(index), start: `data-name=\"`, end: `\"`, inner: true });
        index += end || string?.length;
        if (!!attribute) attributes.push(attribute);
    }
    return attributes;
};
const getTablesMap = (string) => {
    const tableNames = {};
    for (let index = 0; index < string.length;) {
        const [table, end] = getSubstring({ string: string.slice(index), start: "<table id", end: "</table>" });
        index += end || string?.length;
        if (!!table) {
            const [tableName] = getSubstring({ string: table, start: `id=\"`, end: `\"`, inner: true });
            const attributes = getAttributes(table);
            tableNames[tableName] = attributes;
        }
    }
    return tableNames;
};

/**
 * 
 * @param {template, data, PrintKeys} param0 
 * @returns string with real data
 */

export const replaceTables = ({ template, data, PrintKeys }) => {
    try {
        let tempString = template
        const attributesTableMap = getTablesMap(template);
        const htmlTablesMap = Object.keys(attributesTableMap).
            map((x, index) => {
                return ({
                    [`${x}`]:
                        data[`${x}`].length ?
                            buildHTMLTableV2({
                                numberedRow: true,
                                data: data[`${x}`].
                                    map((y) => (getAttributeFromObject(y, attributesTableMap[x])))
                            }) : ""
                })
            }).
            reduce((s, x) => ({ ...s, ...x }), {});
        Object.keys(htmlTablesMap).forEach(x => {
            tempString = replaceTable({ name: x, realTable: htmlTablesMap[x], template, tempString })
        })
        return tempString
    } catch (error) {
        console.error('hacker_it_error', error)
        return ""
    }
};
export const formatMoney = function ({ val, tempSymbol = null, Symbol = null, Format = null }) {
    const _formatNumber = FormatNumber.hasOwnProperty(Format)
        ? FormatNumber[Format]
        : FormatNumber[null];
    return format(
        `${_formatNumber} ${tempSymbol ?? Symbol}`,
        parseFloat(val ?? 0)
    );
};

export const PrintWithoutPopUp = (HTML) => {
    var frame1 = document.createElement("iframe");
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow
        ? frame1.contentWindow
        : frame1.contentDocument.document
            ? frame1.contentDocument.document
            : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write(HTML);
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
};