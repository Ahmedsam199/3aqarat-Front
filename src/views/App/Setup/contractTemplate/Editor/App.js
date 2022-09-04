import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./App.css";
import registerEmoji from "./EmojiHelper";
import Select from "react-select";
import {
  Modal,
  Col,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import AddTable from "./AddTable";
import { getAttributFromObject } from "../../../../../utility/Utils";

const emojiTooltipText = "Emoji picker";

const editorConfig = {
  plugins: `advlist wizardExample  pageembed horizntalline autocomplete mentions advlink paste mention autolink lists link image charmap print preview anchor export pagebreak code emoticons image table paste lists advlist checklist link hr charmap directionality
        searchreplace visualblocks code fullscreen 
        insertdatetime media table paste code imagetools  wordcount testBTN`,
  toolbar: `|undo redo  wizardExample | h1 h2 h3 h4 h5 h6  |  bold italic backcolor table | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent |code  removeformat  | image |imagetools \ export print   myCustomToolbarButton  | `,
  a11y_advanced_options: true,
  image_caption: true,
  images_upload_credentials: true,
  skin: "oxide-dark",
  typeahead_urls: true,
  browser_spellcheck: true,
  paste_data_images: true,
  height: 600,
  file_picker_types: "image",
  image_title: true,
  resize: "both",
  automatic_uploads: true,
  file_picker_types: "image",
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = function () {
      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        var id = "blobid" + new Date().getTime();
        var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(",")[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },
};

const initialValue = "";
export function getActiveEditor() {
  return window.tinymce?.activeEditor;
}

export default function App() {
  const editorRef = useRef(null);
  const [image, setImage] = useState(null);
  const [image3,setImage3]=useState(null)
//For Header And Footer
  const [image2, setImage2] = useState(null);
  const [tableData, setTableData] = useState("");
  const [EditorData2, setEditorData] = useState("");
  const [theSelectedAttr, setSelectedAttr] = useState("");
const [modal, setModal] = useState(false);
const [modal2, setModal2] = useState(false);
const [modal4, setModal4] = useState(false);
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
const toggle3 = () => setModal4(!modal4);
  const toggle4 = () => setmodal3(!modal3);
  const [activeItem, setActiveItem] = useState("");
  const toolbarId = "toolbar";
  const emojiButtonRef = useRef();
  const [portalState, setportalState] = useState(false);
  editorConfig.liaButtonState = null;
  function toggleActiveItem(button) {
    const current = getActiveEditor()?.settings?.liaButtonState;
    if (current === button) {
      setActiveItem(null);
      return false;
    } else {
      setActiveItem(button);
      return true;
    }
  }
  function handleResolve() {
    const container = document.querySelector(".tox-autocompleter");
    if (container) {
      setportalState(true);
    }
    //renderPortal();
  }

  function getToolbarButtons(excludeButtonAriaLabel) {
    return document.querySelectorAll(
      `#${toolbarId} button:not([aria-label='${excludeButtonAriaLabel}'])`
    );
  }

  function onCloseEmojiModal() {
    setActiveItem(null);
    getToolbarButtons(emojiTooltipText).forEach((button) => {
      button.removeEventListener("click", onCloseEmojiModal);
    });
  }

  const editor = useRef(null);
  function onActionForEmoji(button) {
    emojiButtonRef.current = button;
    toggleActiveItem("emoji");

    getToolbarButtons(emojiTooltipText).forEach((button) => {
      button.addEventListener("click", onCloseEmojiModal);
    });
  }

  editorConfig.setup = (localEditor) => {
    registerEmoji(localEditor, toolbarId, onActionForEmoji, emojiTooltipText);
    registerAutocompleter(localEditor, handleResolve);
  };

  function getMatchedChars(pattern) {
    return specialChars.filter((char) => {
      return char.text.includes(pattern);
    });
  }
  function registerAutocompleter(editor, onResolve) {
    editor.ui.registry.addAutocompleter("specialchars_cardmenuitems", {
      ch: "@",
      minChars: 0,
      columns: "auto",
      highlightOn: ["char_name"],
      onAction: function (autocompleteApi, rng, value) {
        editor.selection.setRng(rng);
        editor.insertContent(value);
        autocompleteApi.hide();
      },
      fetch: (pattern) => {
        return new window.tinymce.util.Promise((resolve) => {
          var results = getMatchedChars(pattern).map(function (char) {
            return {
              type: "cardmenuitem",
              value: char.value,
              label: char.text,
              items: [
                {
                  type: "cardcontainer",
                  direction: "vertical",
                  items: [
                    {
                      type: "cardtext",
                      text: char.value,
                    },
                  ],
                },
              ],
            };
          });

          resolve(results);
          onResolve();
        });
      },
    });
  }


  //Mentions
  const specialChars = [
    { text: "Name", value: "@Name" },
    { text: "Address", value: "@Address " },
    { text: "hash", value: "#" },
    { text: "dollars", value: "$" },
    { text: "percent sign", value: "%" },
    { text: "caret", value: "^" },
    { text: "ampersand", value: "&" },
    { text: "asterisk", value: "*" },
  ];
  
  const handleChange2 = (e) => {
    let blob = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64String = reader.result;

      setImage2(base64String.substr(base64String.indexOf(", ") + 1));
    };
  };

  const handleChange = (e) => {
    let blob = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64String = reader.result;

      setImage(base64String.substr(base64String.indexOf(", ") + 1));
    };
  };
  const handleChange3=(e)=>{
     let blob = e.target.files[0];
     var reader = new FileReader();
     reader.readAsDataURL(blob);
     reader.onloadend = function () {
       var base64String = reader.result;

       setImage3(base64String.substr(base64String.indexOf(", ") + 1));
     };
  }

  function printDivContent() {
    let newString = editorRef.current.getContent().replace(
      `<tr>
<td style="width: 48.8651%;">@Data</td>
<td style="width: 48.8651%;">&nbsp;</td>
</tr>`,
    );
    var windows = window.open("", "", "height=2339, width=1654");
    windows.document.write(
      "<html>",
      `<style>
 html{
  height: 100%;
  
}
body{
  position: relative;
  height: 90%;
}

body:before{
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: url('${image3}') ;
  background-repeat: no-repeat;
  background-position: center;  
  opacity: 0.06;
}
</style>`
    );
    windows.document
      .write(`<table style="width: 96.4286%; border: none; height: 234.4px; ">
<thead>
<tr style="height: 150px;">
<td style="width: 98.7654%; height: 150px;"><center><img style="position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  text-align: center;height:"120px" ; src="${image}"></center>
<div class="page-header-space" style="height: 170px;">&nbsp;</div>
</td>
</tr>
</thead>
<tbody  >
<tr style="height: 54.4px;">
<td style="width: 98.7654%; height: 54.4px;">
<p><span style="font-size: 36pt;">
${newString}
</span></p>
</td>
</tr>
</tbody>
<tfoot>
<tr style="height: 50px;">
<td style="width: 98.7654%; height: 50px;">
<div class="page-footer-space" style="position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  text-align: center;"><center><img src="${image2}"></center></div>
</td>
</tr>
</tfoot>
</table>`);

    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();
  }

  
// ADD Table ON SAVE
  const AddT = () => {
    //Search For The ID In Our String
    let indexof = editorRef.current
      .getContent()
      .indexOf(`<table id="${theSelectedAttr}">`);
    //if there is no table with this id create new 1 if there is table with this id Replace it
    if (indexof == -1) {
      // Insert To The Position of Cursor
      tinymce.activeEditor.execCommand("mceInsertContent", false, tableData);
    } else {
      let indexout = editorRef.current
        .getContent()
        .indexOf("</table>", indexof);
      let newStr2 = editorRef.current
        .getContent()
        .substring(indexof, indexout + 8);
      /* +8 is for to insert The whole Table */
      let newEditorData = editorRef.current
        .getContent()
        .replace(newStr2, tableData);
      setEditorData(newEditorData);
    }
  };

  const indexes = [];
  let indexout = [];
  let theAttr = [];
  /* Search For Mentions And Replace Them */
  const Search = () => {
    let index = 0;
    for (; index < editorRef.current.getContent().length; ) {
      if (editorRef.current.getContent()[index] === "@") {
        indexes.push(index);
        let index2 = editorRef.current.getContent().indexOf(" "||"", index);
        indexout.push(index2);
        theAttr.push({ from: index, to: index2 });
        index += 1;
      } else {
        index++;
      }
    }

    let newEditorData = editorRef.current.getContent();
    for (let y = 0; y < theAttr.length; y++) {
      let newStr2 = editorRef.current
        .getContent()
        .substring(theAttr[y].from, theAttr[y].to);

      newEditorData = newEditorData.replaceAll(newStr2, "outdata.newStr2");
      //
    }

    setEditorData(newEditorData);

    
  };
  
  
  const [modal3, setmodal3] = useState(false);

  const dummy = {
    Properties: [
      { Property: "AA", Attribute: "11", Owner: "ME", Territory: "LOL" },
      { Property: "BB", Attribute: "22", Owner: "you", Territory: "NotNul" },
      { Property: "CC", Attribute: "33", Owner: "Him", Territory: "Mul" },
    ],
    Contract: [
      { Contract: "DA", Payment: "200" },
      { Contract: "GG", Payment: "444" },
    ],
  };
  const buildHTMLTable = (data) => {
    const _keys = Object.keys(data[0]);
    const Tbl = document.createElement("table");
    const Tbody = document.createElement("tbody");
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
        Td.appendChild(document.createTextNode(data[i][_keys[j]]));
        Tr.appendChild(Td);
      }
      Tbody.appendChild(Tr);
    }
    Tbl.appendChild(Tbody);

    
    return Tbl;
  };
  const getSubstring = (string, start, end) => {
    try {
      const _start = string.indexOf(start);
      if (_start < 0) throw new Error();
      const _stringAfterStart = string.slice(_start + start.length);
      const _end = _stringAfterStart.indexOf(end);
      if (_end < 0) throw new Error();
      return [
        string.slice(
          _start,
          _end + (string.length - _stringAfterStart.length) - 1
        ),
        _end + end.length + (string.length - _stringAfterStart.length),
      ];
    } catch (error) {
      return [null];
    }
  };
  const getSubstringV2 = (string, start, end) => {
    try {
      const _start = string.indexOf(start);
      if (_start < 0) throw new Error();
      const _stringAfterStart = string.slice(_start + start.length);
      const _end = _stringAfterStart.indexOf(end);
      if (_end < 0) throw new Error();
      return [
        string.slice(
          _start + start.length,
          _end + end.length + (string.length - _stringAfterStart.length) - 1
        ),
        _end + end.length + (string.length - _stringAfterStart.length),
      ];
    } catch (error) {
      return "";
    }
  };
  const getAttributes = (string) => {
    let Data = [];
    let index = 0;
    for (; index < string.length; ) {
      const [attribute, end] = getSubstringV2(
        string.slice(index),
        `data-name=\"@`,
        `\"`
      );

      index += end || string?.length;
      if (!!attribute) Data.push(attribute);
    }

    return Data;
  };
  /**
   *
   * @param string
   * @returns array of string
   */
  

  
  const getTablesName = (string) => {
    const tableNames = {};
    let index = 0;
    for (; index < string.length; ) {
      const [table, end] = getSubstring(
        string.slice(index),
        "<table id",
        "</table>"
      );

      index += end || string?.length;
      if (!!table) {
        const [tableName] = getSubstringV2(table, `id=\"`, `\"`);
        const attributes = getAttributes(table);
        tableNames[tableName] = attributes;
      }
    }
    return tableNames;
  };

  const purefun = () => {
    const tableNames = getTablesName(editorRef.current.getContent());
    console.log("testing", tableNames);
    const mapTables = Object.keys(tableNames)
      .map((x) => {
        return {
          [`${x}`]: buildHTMLTable(
            dummy[`${x}`].map((y) => {
              return getAttributFromObject(y, tableNames[x]);
            })
          ),
        };
      })
      .reduce((s, x) => ({ ...s, ...x }), {});
      let newEditorData = editorRef.current.getContent();
Object.keys(tableNames).forEach((x)=>{
  let indexof = editorRef.current
      .getContent()
      .indexOf(`<table id="${x}">`)
      let indexout = editorRef.current
        .getContent()
        .indexOf("</table>", indexof);
      let newStr2 = editorRef.current
        .getContent()
        .substring(indexof, indexout + 8);
      /* +8 is for to insert The whole Table */
       newEditorData = newEditorData.replace(newStr2, mapTables[x].outerHTML);
        
        
        
      })
      setEditorData(newEditorData);
  };

  return (
    <>
      <Row>
        <Col>
          <Button onClick={purefun}>Table Func</Button>
          <Button onClick={Search}>Test Mention</Button>
          <Button onClick={toggle4}>Insert Table</Button>
        </Col>
        <Col>
          <Button onClick={toggle3}>Insert WaterMark</Button>
        </Col>
        <Col>
          <Button onClick={toggle}>Footer</Button>
        </Col>
        <Col>
          <Button onClick={toggle2}>Header</Button>
        </Col>
        <Col>
          <Button onClick={printDivContent}>Print</Button>
        </Col>
      </Row>

      <AddTable
        theSelectedAttr={theSelectedAttr}
        tableData={tableData}
        buildHTMLTable={buildHTMLTable}
        setSelectedAttr={setSelectedAttr}
        AddT={AddT}
        modal={modal3}
        toggle={toggle4}
        setTableData={setTableData}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <h1>Choose The Footer</h1>

          <Input type="file" onChange={handleChange2} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Done
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal4} toggle={toggle3}>
        <ModalHeader toggle={toggle3}>Modal title</ModalHeader>
        <ModalBody>
          <h1>Choose The WaterMark</h1>

          <Input type="file" onChange={handleChange3} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle3}>
            Done
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Modal title</ModalHeader>
        <ModalBody>
          <h1>Choose The Header</h1>

          <Input type="file" onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle2}>
            Done
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Editor
        ref={editor}
        onInit={(evt, editor) => (editorRef.current = editor)}
        id="editor"
        cloudChannel="5-dev"
        init={editorConfig}
        initialValue={EditorData2}
      />
    </>
  );
}
