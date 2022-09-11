import CustomSelect from '@Component/CustomSelect';
import ImageInput from '@Component/inputComponent/Image';
import Breadcrumbs from '@components/breadcrumbs';
import { ListFonts } from '@FixedOptions';
import { insertItem, updateItem } from '@store/actions/data';
import { Editor } from "@tinymce/tinymce-react";
import { toasty } from '@toast';
import { getSubstring } from '@utils';
import { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../../../components/inputComponent/Image'
import {
  Button,
  Card,
  CardBody,
  Col, FormGroup, Input, Label,
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
  const { PrintKeys: AllPrintKeys, Doctypes, tempData: { network }, PrintCustomization } = useSelector((state) => state);
  const PrintKeys = useMemo(() =>
    AllPrintKeys.
      filter(x => x.Doctype == params?.doctype).
      map(x => x.PrintKeys).
      reduce((s, x) => ([...s, ...x])),
    [params?.doctype, AllPrintKeys])
  const [tempHTML, setTempHTML] = useState()
  const [{
    displayColorPicker,
    copyCount,
    fontSize,
    fontFamily,
    tableHeadersColor,
    isReceipt,
    PrintOnSubmit,
    isRtl,
    doctype,
    color,
    htmlData,
    printName,
    isDefault,
    Footer,
    Header,
    WaterMark
  }, dispatch] = useReducer(reducer, initialState(params));

  // #region config editor
  const editorRef = useRef()
  // #endregion
  useEffect(() => {
    if (params.series) {
      dispatch({ type: "initValues", payload: PrintCustomization.find((x) => x.Series === params.series) })
    }
  }, []);

  const onSubmit = () => {
    const request = {
      Series: params.series ?? '',
      Name: printName,
      HTML: makeTemplateHtml({ Footer, Header, Html: editorRef.current.getContent(), WaterMark }),
      Doctype: params.doctype,
      IsRtl: isRtl,
      IsReceipt: isReceipt,
      IsDefault: isDefault,
      CopyCount: copyCount,
      PrintOnSubmit: PrintOnSubmit,
      FontSize: fontSize,
      IsLandscape: false,
    };
    dispatchRedux(
      params.series
        ? updateItem("ContractTemplates", request)
        : insertItem("ContractTemplates", request)
    )
      .then((res) => {
        toasty({ type: "success" });
        navigate("/Setup/PrintCustomization");
      })
      .catch((err) => {
        console.log("hacker_it_err", err);
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
            breadCrumbTitle="PrintCustomization"
            breadCrumbParent="Setting"
            breadCrumbParent3="PrintCustomization"
            breadCrumbActive={params.series ? params.series : "New"}
            Series={params.series}
            breadCrumbActiveLink="/Setting/PrintCustomization"
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
                <Label>{t("Print Name")}</Label>
                <Input
                  placeholder="print Name"
                  value={printName}
                  onChange={(e) => {
                    setPrintName(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>{t("Doctype")}</Label>
                <CustomSelect
                  valueName="Series"
                  textName="DocTypeName"
                  value={doctype}
                  onChange={async (e) => {}}
                  isDisabled={true}
                  options={Doctypes}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>{t("Copy Count")}</Label>
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
                <Label>{t("Font Size")}</Label>
                <Input
                  placeholder="Font Size"
                  value={fontSize}
                  onChange={(e) => {
                    dispatch({ type: "setFontSize", payload: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>{t("Font Family")}</Label>
                <CustomSelect
                  valueName="value"
                  textName="label"
                  value={fontFamily}
                  onChange={async (e) => {
                    dispatch({ type: "setFontFamily", payload: e.value });
                  }}
                  options={ListFonts}
                />
              </FormGroup>
            </Col>
            <Col lg="3" md="4">
              <FormGroup>
                <Label>{t("Table Headers Color")}</Label>
                <div className="color-container">
                  <div
                    className="swatch"
                    onClick={() =>
                      dispatch({
                        type: "setDisplayColorPicker",
                        payload: !displayColorPicker,
                      })
                    }
                  >
                    <div className="color" style={{ background: color }} />
                  </div>
                  {displayColorPicker ? (
                    <div className="popover">
                      <div
                        className="cover"
                        onClick={() =>
                          dispatch({
                            type: "setDisplayColorPicker",
                            payload: !displayColorPicker,
                          })
                        }
                      />
                      <ChromePicker
                        color={color}
                        onChangeComplete={(e) => {
                          dispatch({ type: "setColor", payload: e.hex });
                          dispatch({
                            type: "setTableHeadersColor",
                            payload: e.hex,
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            <Col md="1">
              <Button.Ripple
                color="primary"
                onClick={() => setTempHTML(editorRef.current.getContent())}
              >
                {t("Table")}
              </Button.Ripple>
            </Col>
            <Col
              md="2"
              className="d-flex justify-content-between align-items-center"
            >
              <Image
                title={"Footer"}
                onChange={(e) => changeFile(e, "Footer")}
              />
              <Image
                title={"WaterMark"}
                onChange={(e) => changeFile(e, "WaterMark")}
              />
              <Image
                title={"Header"}
                onChange={(e) => changeFile(e, "Header")}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    id="isRtl"
                    type="checkbox"
                    style={{ marginRight: "1rem" }}
                    checked={isRtl}
                    Disabled={true}
                  />
                  {t("isRTL")}
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    id="isReceipt"
                    type="checkbox"
                    style={{ marginRight: "1rem" }}
                    checked={isReceipt}
                    onChange={(e) => {
                      dispatch({
                        type: "setIsReceipt",
                        payload: e.target.checked,
                      });
                    }}
                  />
                  {t("isReceipt")}
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    id="isDefault"
                    type="checkbox"
                    style={{ marginRight: "1rem" }}
                    checked={isDefault}
                    onChange={(e) => {
                      dispatch({
                        type: "setIsDefault",
                        payload: e.target.checked,
                      });
                    }}
                  />
                  {t("isDefault")}
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  <Input
                    id="printOnSubmit"
                    type="checkbox"
                    checked={PrintOnSubmit}
                    style={{ marginRight: "1rem" }}
                    onChange={(e) => {
                      dispatch({
                        type: "setPrintOnSubmit",
                        payload: e.target.checked,
                      });
                    }}
                  />
                  {t("printOnSubmit")}
                </Label>
              </FormGroup>
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
              },
            }}
            initialValue={htmlData}
          />
        </CardBody>
      </Card>
      <AddTable
        Doctype={doctype}
        row={tempHTML}
        onToggle={() => setTempHTML(null)}
        onComplete={(values) => {
          applyTable(values);
        }}
      />
    </Fragment>
  );
};
export default Post;
