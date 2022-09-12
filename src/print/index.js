import { replaceMentions, replaceTables } from "./Utils";
import {PrintWithoutPopUp} from "@utils";
export const printFun = ({ data, tools, ...rest }) => {
    return new Promise((resolve, reject) => {
        const PrintKeys =
            tools.PrintKeys.map(x =>
                x.PrintKeys.
                    map(y => ({ [y]: x.Replacement })).
                    reduce((s, y) => ({ ...s, ...y }), {})).
                reduce((s, x) => ({ ...s, ...x }), {})
        const firstStep =
            replaceMentions({
                PrintKeys,
                data,
                template: tools.templateHtml,
            })
        const secondStep = replaceTables({
            data,
            template: firstStep,
        });
  PrintWithoutPopUp(secondStep);
        resolve()
    })
}