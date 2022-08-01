import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { font } from './Amiri-Regular-normal';
import { t } from 'i18next'
import { fixValue } from '@utils';
const size = 'A3'; // Use A1, A2, A3 or A4
const orientation = 'landscape'; // portrait or landscape
const unit = 'pt';
const marginLeft = 40;
const getHeader = (data) => {
  return [Object.keys(data).map(key => t(key))]
}
const getData = (data) => {
  return Object.values(data).map(x => fixValue(x))
}
export const exportToPdf = ({
  data,
  title,
  filters,
}) => {
  const doc = new jsPDF(orientation, unit, size);
  // get header of table from data array
  const headers = getHeader(data[0]);
  const finalData = data.map((item) => getData(item));
  let content = {
    styles: { font: 'Amiri', fontSize: 10, valign: 'middle', halign: 'center' },
    margin: { left: 12, right: 12 },
    startY: 170,
    head: headers, // need this
    body: finalData,
  };
  const headers_Filter = getHeader(filters);
  const finalData_Filter = [getData(filters)];
  let content_filter = {
    styles: { font: 'Amiri', fontSize: 10, valign: 'middle', halign: 'center' },
    margin: { left: 12, right: 12 },
    startY: 70,
    head: headers_Filter,
    body: finalData_Filter,
  };

  // * config
  doc.setFontSize(30);
  doc.addFileToVFS('Amiri-Regular.ttf', font);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  doc.setFont('Amiri');
  // doc.setLanguage('ar');
  doc.setFontSize(30);
  doc.text(title, marginLeft * 13, 40);

  // * write
  doc.autoTable(content_filter);
  doc.autoTable(content);

  doc.save(`${new Date().toISOString() + '__' + title.replace(/\s/g, "")}.pdf`);
};
