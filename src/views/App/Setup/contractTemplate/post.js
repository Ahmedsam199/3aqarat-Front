import CustomSelect from '@Component/CustomSelect';
import ImageInput from '@Component/inputComponent/Image';
import Breadcrumbs from '@components/breadcrumbs';
import { insertItem, updateItem } from '@store/actions/data';
import { Editor } from "@tinymce/tinymce-react";
import { toasty } from '@toast';
import { getSubstring, toBoolean } from '@utils';
import { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { PlusSquare } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col, FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import AddTable from './addTable';
import { initialState, reducer } from './reducer';
import { buildHtmlTable, EDITOR_CONFIG, makeTemplateHtml, registerAutocompleter, registerEmoji } from './utils';
const Post = () => {
  const { t } = useTranslation()
  const params = useParams();
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const { PrintKeys: AllPrintKeys, DocType, tempData: { network }, ContractTemplate ,} = useSelector((state) => state);
  const PrintKeys = useMemo(() =>
    AllPrintKeys.
      filter(x => x.Doctype == params?.doctype).
      map(x => x.PrintKeys)?.
      reduce((s, x) => ([...s, ...x])),
    [params?.doctype, AllPrintKeys])
  const [tempHTML, setTempHTML] = useState()
  const [{
    copyCount,
    isReceipt,
    printOnSubmit,
    isRtl,
    doctype,
    tableHeadersColor,
    displayColorPicker,
    htmlData,
    printName,
    isDefault,
    Footer,
    Header,

  }, dispatch] = useReducer(reducer, initialState(params));

  // #region config editor
  const editorRef = useRef()
  // #endregion
  useEffect(() => {
    if (params.series) {
      dispatch({ type: "initValues", payload: ContractTemplate.find((x) => x.Series === params.series) })
    } else {
      dispatch({ type: "setHeader", payload: localStorage.getItem('imgBase64') })
    }
  }, []);

  const onSubmit = () => {
    const request = {
      Series: params.series ?? '',
      Name: printName,
      HTML: makeTemplateHtml({ Footer, Header, Html: editorRef.current.getContent(), isReceipt, isRtl }),
      tableHeadersColor,
      Doctype: params.doctype,
      IsRtl: isRtl,
      IsReceipt: isReceipt,
      IsDefault: isDefault,
      CopyCount: copyCount,
      PrintOnSubmit: printOnSubmit,
    };
    dispatchRedux(
      params.series
        ? updateItem('ContractTemplate', request)
        : insertItem('ContractTemplate', request)
    )
      .then((res) => {
        toasty({ type: "success" });
        navigate('/Setup/ContractTemplate');
      })
      .catch((err) => {
        console.log('hacker_it_err', err);
      });
  };
  const changeFile = (e, name) => {
    dispatch({ type: `set${name}`, payload: e });
  };
  const applyTable = ({ name, attributes, old }) => {
    const table = buildHtmlTable({ name, attributes })
    if (old) {
      let tempHTML = editorRef.current.getContent()
      const [old] = getSubstring({ string: tempHTML, start: `<table id="${name}"`, end: "</table>" })
      tempHTML = tempHTML.replace(old, table)
      dispatch({ type: "setHtmlData", payload: tempHTML })
    }
    else
      dispatch({ type: "setHtmlData", payload: editorRef.current.getContent() + table })
    // tinymce.activeEditor.execCommand("mceInsertContent", false, table);
  }
  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <Breadcrumbs
            breadCrumbTitle="ContractTemplate"
            breadCrumbParent="Setup"
            breadCrumbParent3="ContractTemplate"
            breadCrumbActive={params.series ? params.series : 'New'}
            Series={params.series}
            breadCrumbActiveLink="/Setup/ContractTemplate"
          />
        </div>
        <div>
          <Button.Ripple color="primary" onClick={() => onSubmit()}>
            {t("Submit")}
          </Button.Ripple>
        </div>
      </div>
      <Card>
        <CardBody>
          <Row className="mt-1 mb-50">
            <Col lg="3" md="4">
              <FormGroup>
                <Label>
                  {t("Print Name")}:
                </Label>
                <Input
                  placeholder="print Name"
                  value={printName}
                  onChange={(e) => {
                    dispatch({ type: "setPrintName", value: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>
                  {t("Doctype")}:
                </Label>
                <CustomSelect
                  valueName="Series"
                  textName="DocType"
                  value={doctype}
                  isDisabled={true}
                  options={DocType}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>
                  {t("Copy Count")}:
                </Label>
                <Input
                  placeholder="Copy Count"
                  value={copyCount}
                  onChange={(e) => {
                    dispatch({ type: "setCopyCount", value: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>
                  {t("Table Headers Color")}:
                </Label>
                <div className="color-container">
                  <div
                    className="swatch"
                    onClick={() => dispatch({ type: "setDisplayColorPicker", payload: !displayColorPicker })}
                  >
                    <div className="color" style={{ background: tableHeadersColor }} />
                  </div>
                  {displayColorPicker ? (
                    <div className="popover">
                      <div
                        className="cover"
                        onClick={() =>
                          dispatch({ type: "setDisplayColorPicker", payload: !displayColorPicker })
                        }
                      />
                      <ChromePicker
                        color={tableHeadersColor}
                        onChangeComplete={(e) => {
                          dispatch({
                            type: "setTableHeadersColor", payload: e.hex
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            <Col className="d-flex align-items-center justify-content-between" md="4">
              <FormGroup>
                <Label>
                  <Input
                    id="isReceipt"
                    disabled={true}
                    type="checkbox"
                    checked={isReceipt}
                    onChange={(e) => {
                      dispatch({ type: "setIsReceipt", payload: e.target.checked });
                    }}
                  />
                  {t("isReceipt")}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    id="isRtl"
                    type="checkbox"
                    checked={isRtl}
                    onChange={(e) => {
                      dispatch({ type: "setIsRtl", payload: e.target.checked });
                    }}
                  />
                  {t("isRTL")}
                </Label>
              </FormGroup>

              <FormGroup>
                <Label>
                  <Input
                    id="isDefault"
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => {
                      dispatch({ type: "setIsDefault", payload: e.target.checked });
                    }}
                  />
                  {t("isDefault")}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  <Input
                    id="printOnSubmit"
                    type="checkbox"
                    checked={printOnSubmit}
                    onChange={(e) => {
                      dispatch({ type: "setPrintOnSubmit", payload: e.target.checked });
                    }}
                  />
                  {t("printOnSubmit")}
                </Label>
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-between align-items-center" md={{ size: "3", offset: "1" }}>
              <a className="d-flex flex-column justify-content-center align-items-center" onClick={() => setTempHTML(editorRef.current.getContent())}>
                <PlusSquare />
                {t("Table")}
              </a>
              <ImageInput title={"Header"} onChange={(e) => changeFile(e, "Header")} />
              {
                !toBoolean(params.isReceipt) &&
                <ImageInput title={"Footer"} onChange={(e) => changeFile(e, "Footer")} />
              }
            </Col>
          </Row>
          <Editor
            ref={editorRef}
            onInit={(evt, editor) => (editorRef.current = editor)}
            id="editor"
            cloudChannel="5-dev"
            init={{
              ...EDITOR_CONFIG,
              setup: (localEditor) => {
                registerEmoji(localEditor);
                registerAutocompleter(localEditor, PrintKeys);
              }
            }}
            initialValue={htmlData}
          />
        </CardBody>
      </Card>
      <AddTable
        Doctype={doctype}
        row={tempHTML}
        onToggle={() => setTempHTML(null)}
        onComplete={(values) => { applyTable(values) }}
      />
    </Fragment>
  );
};
export default Post;
