import { buildHTMLTable, buildHTMLTableV2, fixValue, replaceMentions, replaceTables } from "./Utils";
import { PrintWithoutPopUp } from "./Utils";
import print from "print-js";
export const printFun = ({ data, tools, ...rest }) => {
    return new Promise((resolve, reject) => {
      const PrintKeys = tools.PrintKeys.map((x) =>
        x.PrintKeys.map((y) => ({ [y]: x.Replacement })).reduce(
          (s, y) => ({ ...s, ...y }),
          {}
        )
      ).reduce((s, x) => ({ ...s, ...x }), {});
      const firstStep = replaceMentions({
        PrintKeys,
        data,
        template: tools.templateHtml,
      });
      const secondStep = replaceTables({
        data,
        template: firstStep,
      });
      var ua = navigator.userAgent.toLowerCase();
      var isAndroid = ua.indexOf("android") > -1;
      if (isAndroid) {
      function printDiv() {
            var a = window.open('', '', 'height=500, width=500');
            a.document.write(secondStep);
            a.document.close();
            a.print();
            
        }
      printDiv();}
      else{
          PrintWithoutPopUp(secondStep);
      }

      resolve();
    })
}



const buildHTMLTable2 = (data) => {
  const _keys = Object.keys(data[0]);
  const Tbl = document.createElement('table');
  const Tbody = document.createElement('tbody');
  // add header for table
  const Tr = Tbl.insertRow();
  for (let j = 0; j < _keys.length; j++) {
    const Td = Tr.insertCell();
    Td.appendChild(document.createTextNode(_keys[j]));
    Tr.appendChild(Td);
  }
  // add body for  table
  for (let i = 0; i < data.length; i++) {
    const Tr = Tbl.insertRow();
    for (let j = 0; j < _keys.length; j++) {
      const Td = Tr.insertCell();
      Td.appendChild(document.createTextNode(fixValue(data[i][_keys[j]])));
      Tr.appendChild(Td);
    }
    Tbody.appendChild(Tr);
  }
  Tbl.appendChild(Tbody);
  return Tbl;
};
export const PrintReport = ({ data, filters, title, ...rest }) => {
  // const _filters = removeNullValue(filters);
  
 let TABLE=(buildHTMLTable2(data)); 
PrintWithoutPopUp(TABLE.outerHTML);
    
      
    
}