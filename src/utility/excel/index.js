import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { buildHTMLTable } from "@utils";
export const exportToCsv = ({ data, fileName, SheetNames, isMutlSheets, isTwoTable }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  let _data = data
  if (isTwoTable) {
    const _tbl_1 = buildHTMLTable(data[0])
    const _tbl_2 = buildHTMLTable(data[1])
    let worksheet_tmp1 = XLSX.utils.table_to_sheet(_tbl_1);
    let worksheet_tmp2 = XLSX.utils.table_to_sheet(_tbl_2);
    let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 })
    let b = XLSX.utils.sheet_to_json(worksheet_tmp2, { header: 1 })
    _data = a.concat(['']).concat(b)
  }
  let Sheets = {}
  if (isMutlSheets)
    for (let i = 0; i < data.length; i++) {
      Sheets[SheetNames[i]] = XLSX.utils.json_to_sheet(_data[i])
    }
  else
    Sheets = {
      [SheetNames[0]]: XLSX.utils.json_to_sheet(_data, { skipHeader: isTwoTable })
    }

  const wb = { Sheets, SheetNames };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const finalData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(finalData, new Date().toISOString() + "__" + fileName + fileExtension);
}
//  ! help for excel

export const readExcel = async (file) => {
  return new Promise(async (resolve, reject) => {
    const fileReader = await new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = (e) => {
      const data = {}
      const bufferArray = e?.target.result
      const wb = XLSX.read(bufferArray, { type: "buffer" })
      let ws
      for (let item of wb.SheetNames) {
        const wsname = wb.SheetNames[0]
        let ws = wb.Sheets[item]
        data[item] = XLSX.utils.sheet_to_json(ws, { defval: null })
      }
      resolve(data)
    }
  })
}
