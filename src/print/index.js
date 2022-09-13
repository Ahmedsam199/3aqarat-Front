import { replaceMentions, replaceTables } from "./Utils";
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