import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
const { ipcRenderer } = require('electron');
const PrintOptionDropDown = ({ options, doctype, party }) => {
    const { t } = useTranslation()
    const [isPrintReceiptDisabled, setIsPrintReceiptDisabled] = useState()
    const handlePrintA4Request = (e) => {
        setIsPrintReceiptDisabled(true);
        setTimeout(() => setIsPrintReceiptDisabled(false), 2000);
        // const invoice = getValues();
        // const mappedItems = [];
        // invoice.itemsTbl.map((x) => {
        //     const item = allItems.find((z) => {
        //         return z.Series === x.itemSeries;
        //     });
        //     mappedItems.push({
        //         ...x,
        //         itemName: item.ItemName,
        //     });
        // });

        // const info = getInfo();
        // const userData = getUserData();
        // const request = {
        //     User: mobileUser,
        //     CashAmount: invoice.cashAmount,
        //     ChangeAmount: result.changeAmount,
        //     ChangeCurrency: invoice.changeCurrency,
        //     ChangeExchangeRate: 1,
        //     DiscountAmt: invoice.discount ? invoice.discount : 0,
        //     DiscountBy: invoice.discountType,
        //     ItemsTbl: mappedItems,
        //     NetTotal: result.netTotal,
        //     OutstandingAmount: 0,
        //     PaidAmount: 31.1,
        //     PayCurrency: Currencies.find((x) => x.Series === invoice.payCurrency)
        //         .Symbol,
        //     PayCurrencySymbol: '',
        //     PayExchangeRate: 1,
        //     PostingDate: Moment(invoice.postingDate, 'yyyy-MM-DD HH:mm')
        //         .toLocaleString()
        //         .replaceAll(',', ''),
        //     Remarks: '',
        //     Series: invoice.series,
        //     Status: invoice.status,
        //     Total: result.total ? result.total : 0,
        //     img: localStorage.getItem('imgBase64'),
        //     Phone: info.Phone,
        //     Address: info.Address,
        //     CompanyName: info.AccountName,
        //     email: userData.email,
        //     partyFullName: party.PartyName,
        //     AddressCustomer: party.Address,
        //     CustomerPhone: party.Phone,
        //     TotalDebtAmt: totalPartyDebtAmt,
        // };

        // const id = invoice.series;

        ipcRenderer.send(`asynchronous-message-Print${doctype}`, {
            // ...request,
            // id,
        });
    };

    const handlePrintRequest = (e) => {
        setIsPrintReceiptDisabled(true);
        setTimeout(() => setIsPrintReceiptDisabled(false), 2000);
        // const invoice = getValues();

        // const mappedItems = [];
        // invoice.itemsTbl.map((x) => {
        //     const item = allItems.find((z) => {
        //         console.log(z.Series, x.itemSeries);
        //         return z.Series === x.itemSeries;
        //     });
        //     mappedItems.push({
        //         ...x,
        //         itemName: item.ItemName,
        //     });
        // });

        // const info = JSON.parse(localStorage.getItem('info'));
        // const currParty = Party.find((x) => x.Series === invoice.Party);
        // const request = {
        //     CashAmount: invoice.cashAmount,
        //     ChangeAmount: result.changeAmount,
        //     ChangeCurrency: Currencies.find(
        //         (x) => x.Series === invoice.changeCurrency
        //     ).Symbol,
        //     ChangeExchangeRate: 1,
        //     DiscountAmt: invoice.discount,
        //     DiscountBy: invoice.discountType,
        //     ItemsTbl: mappedItems,
        //     NetTotal: toMonyFormat({
        //         val: result.netTotal,
        //         symbol: '',
        //     }),
        //     OutstandingAmount: 0,
        //     PaidAmount: 31.1,
        //     DefaultCurrency: defaultCurrency.Symbol,
        //     PayCurrency: Currencies.find((x) => x.Series === invoice.payCurrency)
        //         .Symbol,
        //     PayCurrencySymbol: '',
        //     PayExchangeRate: 1,
        //     PostingDate: Moment(invoice.postingDate).format('YYYY-MM-DD HH:mm'),
        //     Remarks: '',
        //     Series: invoice.series,
        //     Status: invoice.status,
        //     Total: result.total,
        //     img: localStorage.getItem('imgBase64'),
        //     type: 'Order',
        //     Phone: info.Phone,
        //     Address: info.Address,
        //     CompanyName: info.AccountName,
        //     partyFullname: currParty.PartyName,
        //     AddressCustomer: currParty.Address,
        //     CustomerPhone: currParty.Phone,
        //     TotalDebtAmt: totalPartyDebtAmt,
        //     TotalDebtAfterPay: totalPartyDebtAmt + invoice.cashAmount,
        // };

        // const id = invoice.series;

        ipcRenderer.send(
            'asynchronous-message-PrintReceipt',
            {
                // ...request,
                // id,
            }
        );
    };

    const handleCustomPrint = async (htmlString, isRtl, isReceipt, copyCount) => {
        setIsPrintReceiptDisabled(true);
        setTimeout(() => setIsPrintReceiptDisabled(false), 2000);
        // const invoice = getValues();

        // const mappedItems = [];
        // invoice.itemsTbl.map((x) => {
        //     const item = allItems.find((z) => {
        //         return z.Series === x.itemSeries;
        //     });
        //     mappedItems.push({
        //         ...x,
        //         itemName: item.ItemName,
        //     });
        // });

        // const info = JSON.parse(localStorage.getItem('info'));
        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const currParty = Party.find((x) => x.Series === invoice.Party);

        // const request = {
        //     User: mobileUser,
        //     CashAmount: invoice.cashAmount,
        //     ChangeAmount: result.changeAmount,
        //     ChangeCurrency: Currencies.find(
        //         (x) => x.Series === invoice.changeCurrency
        //     ).Symbol,
        //     ChangeExchangeRate: 1,
        //     DiscountAmt: invoice.discountAmt ? invoice.discountAmt : 0,
        //     DiscountBy: invoice.discountBy,
        //     ItemsTbl: mappedItems,
        //     NetTotal: result.netTotal,
        //     OutstandingAmount: 0,
        //     PaidAmount: invoice.cashAmount,
        //     PayCurrency: Currencies.find((x) => x.Series === invoice.payCurrency)
        //         .Symbol,
        //     PayCurrencySymbol: '',
        //     DefaultCurrency: Currencies.find((x) => x.Series === defaultCurrency)
        //         .Symbol,
        //     PayExchangeRate: 1,
        //     PostingDate: Moment(invoice.postingDate).format('YYYY-MM-DD HH:mm'),
        //     Remarks: '',
        //     Series: invoice.series,
        //     Status: invoice.status,
        //     Total: result.total ? result.total : 0,
        //     img: localStorage.getItem('imgBase64'),
        //     Phone: info.Phone,
        //     Address: info.Address,
        //     CompanyName: info.AccountName,
        //     email: userData.email,
        //     partyFullname: currParty.PartyName,
        //     AddressCustomer: currParty.Address,
        //     CustomerPhone: currParty.Phone,
        //     TotalDebtAmt: totalPartyDebtAmt,
        //     TotalDebtAfterPay:
        //         totalPartyDebtAmt + result.netTotal - invoice.cashAmount,
        // };

        // const id = invoice.series;

        const keysRegex = await get(
            `${Routes.printKeys.getPrintkeysRegex}?Doctype=DT-5`
        );
        console.log(keysRegex);
        if (isReceipt === false)
            ipcRenderer.send(
                'asynchronous-message-PrintCustom',
                // {
                //     ...request,
                //     id,
                //     html: htmlString,
                //     regexObj: keysRegex.data,
                //     isRTL: isRtl,
                //     copyCount: copyCount,
                // }
            );
        else
            ipcRenderer.send(
                'asynchronous-message-PrintReceipt',
                // {
                //     ...request,
                //     id,
                //     html: htmlString,
                //     regexObj: keysRegex.data,
                //     isRTL: isRtl,
                //     copyCount: copyCount,
                // }
            );
    };

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle
                color="primary"
                caret
                disabled={isPrintReceiptDisabled}
            >
                {t('Print')}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem tag="a" onClick={handlePrintRequest}>
                    {t("Print Default Receipt")}
                </DropdownItem>
                <DropdownItem
                    tag="a"
                    onClick={handlePrintA4Request}
                >
                    {t("Print Default Receipt A4")}
                </DropdownItem>
                {options?.map((x) => {
                    return (
                        <DropdownItem
                            tag="a"
                            onClick={(e) =>
                                handleCustomPrint(
                                    x.HTML,
                                    x.isRtl,
                                    x.isReceipt,
                                    x.copyCount
                                )
                            }
                        >
                            {x.Name}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </UncontrolledButtonDropdown>

    )
}

export default PrintOptionDropDown
