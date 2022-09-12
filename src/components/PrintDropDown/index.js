import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import { printFun } from '../../print';
const PrintDropDown = ({ Doctype, getDate }) => {
    const { t } = useTranslation()
    const [processing, setProcessing] = useState(false)
    const { ContractTemplate: AllContractTemplate, PrintKeys: AllPrintKeys } = useSelector(state => state)
    const PrintKeys = useMemo(() => AllPrintKeys.filter(x => Doctype.some(y => y == x.Doctype)), [AllContractTemplate, Doctype])
    const ContractTemplate = useMemo(() => AllContractTemplate.filter(x => Doctype.some(y => y == x.Doctype)), [AllContractTemplate, Doctype])
    const handleCustomPrint = async (props) => {
        const data = await getDate()
        setProcessing(true)
        printFun({ tools: { ...props, PrintKeys }, data }).then(() => {
            setProcessing(false)
        })
    };
    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle
                color="primary"
                caret
                disabled={processing}
            >
                {t("Print")}
            </DropdownToggle>
            <DropdownMenu>
                {ContractTemplate?.map((x) => {
                    return (
                        <DropdownItem
                            tag="a"
                            onClick={(e) =>
                                handleCustomPrint(
                                    {
                                        templateHtml: x.HTML,
                                        isRtl: x.isRtl,
                                        isReceipt: x.isReciept,
                                        copyCount: x.copyCount
                                    }
                                )
                            }
                        >
                            {x.Name}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </UncontrolledButtonDropdown >
    )
}

export default PrintDropDown