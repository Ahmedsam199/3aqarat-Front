import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./App.css";
import registerEmoji from "./EmojiHelper";

import { Modal,Col,Row, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

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

const emojiTooltipText = "Emoji picker";

const editorConfig = {
  plugins: `advlist wizardExample  pageembed horizntalline autocomplete mentions advlink paste mention autolink lists link image charmap print preview anchor export pagebreak code emoticons image table paste lists advlist checklist link hr charmap directionality
        searchreplace visualblocks code fullscreen 
        insertdatetime media table paste code imagetools help wordcount testBTN`,
  toolbar: `|undo redo  wizardExample | h1 h2 h3 h4 h5 h6  |  bold italic backcolor table | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent |  removeformat  | image |imagetools \ export print  myCustomToolbarButton  | `,
  a11y_advanced_options: true,
  image_caption: true,
  images_upload_credentials: true,
  typeahead_urls: true,
  browser_spellcheck: true,
  paste_data_images: true,
  height: 1200,
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
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const log = () => {
    dispatch({ type: "add", Data: editorRef.current.getContent() });
  };

  const [content, setContent] = useState("");
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
  const specialChars = [
    { text: "Name", value: "@Name" },
    { text: "Address", value: "@Address" },
    { text: "hash", value: "#" },
    { text: "dollars", value: "$" },
    { text: "percent sign", value: "%" },
    { text: "caret", value: "^" },
    { text: "ampersand", value: "&" },
    { text: "asterisk", value: "*" },
    { text: "Header", value: "@Header" },
    { text: "Header", value: "@Header" },
  ];

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
  const saveData = useSelector((state) => state);

  const [image, setImage] = useState(null);

  const footer = `  
 <img width="800" height="65px" src=${image}   >  `;

  const Header = `  
  <img width="800" height="65px" src=${image}   >  `;
  const Footer = `  
  <img width="800" height="65px" src=${image}   >  `;
  const [image2, setImage2] = useState(null);
  const handleChange2 = (e) => {
    let blob = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64String = reader.result;

      setImage2(base64String.substr(base64String.indexOf(", ") + 1));

      let newData = saveData.Data.replace(
        `
<td style="width: 98.7654%; height: 50px;">@Footer</td>`,
        `
           <td style="width: 98.7654%; height: 50px;">
   <div style=" position: fixed;
   height: 50px;
  bottom: 0;
  width: 100%;
   /* for demo */
   /* for demo */" class="page-footer">
    <img src=${image2}></p>
  </div>
  </td>`
      );

      dispatch({ type: "add", Data: newData });
    };
  };

  const handleChange = (e) => {
    let blob = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64String = reader.result;

      setImage(base64String.substr(base64String.indexOf(", ") + 1));

      let newData = saveData.Data.replace(
        `
<td style="width: 98.7654%; height: 50px;">@Footer</td>`,
        `
           <td style="width: 98.7654%; height: 50px;">
   <div style=" position: fixed;
   height: 50px;
  bottom: 0;
  width: 100%;
   /* for demo */
   /* for demo */" class="page-footer">
    <img src=${image}></p>
  </div>
  </td>`
      );

      dispatch({ type: "add", Data: newData });
    };
  };
  const [newData, setNewData] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
      })

      .catch((err) => {
        console.log("failed toffetch");
      });
  }, []);
  let y = 0;
  var datas = "";
  for (let x = 0; x < data.length; x += 5) {
    datas += `<br><br><br><br><br><br> <table style="page-break-after: always;">
            <tr ><td> ${data[x].id}<td>${data[x].title}</tr>
            <tr><td > ${data[x + 1].id}<td>${data[x + 1].title}</tr>
            <tr><td > ${data[x + 2].id}<td>${data[x + 2].title}</tr>
            <tr><td > ${data[x + 3].id}<td>${data[x + 3].title}</tr>
            <tr style="page-break-after: always;"><td> ${data[x + 4].id}<td>${
      data[x + 4].title
    }</tr>
            </table>`;
  }
  var headers = `<div style="position: fixed;
          height: 100px;
  top: 0mm;
  width: 100%;
   /* for demo */
   /* for demo */" class="page-header" style="text-align: center">
    <p>@Headers</p>
    
  </div>`;
  var foot = `
  <div style=" position: fixed;
   height: 50px;
  bottom: 0;
  width: 100%;
   /* for demo */
   /* for demo */" class="page-footer">
    <p>@Footer</p>
  </div>`;
  var emptys = `<table>

    <thead>
      <tr>
        <td>
          <!--place holder for the fixed-position header-->
          <div style=" height: 50px;" class="page-header-space"></div>
        </td>
      </tr>
    </thead> 
    <tbody>
      <tr>
        <td style="width:1200px">
        @Data
        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td>
          <!--place holder for the fixed-position footer-->
          <div style=" height: 50px;" class="page-footer-space"></div>
        </td>
      </tr>
    </tfoot>

  </table> `;
  function printDivContent() {
    var divElementContents = "Test";
    let newString = editorRef.current.getContent().replace(
      `<tr>
<td style="width: 48.8651%;">@Data</td>
<td style="width: 48.8651%;">&nbsp;</td>
</tr>`,
      tableRows2
    );
    var windows = window.open("", "", "height=400, width=400");
    windows.document.write("<html>");
    windows.document
      .write(`<table style="width: 96.4286%; border: none; height: 234.4px;">
<thead>
<tr style="height: 150px;">
<td style="width: 98.7654%; height: 150px;"><center><img style="position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  text-align: center;height:"120px" ; src="${image}" ></center>
<div class="page-header-space" style="height: 170px;">&nbsp;</div>
</td>
</tr>
</thead>
<tbody>
<tr style="height: 54.4px;">
<td style="width: 98.7654%; height: 54.4px;">
<p><span style="font-size: 36pt;">${newString}</span></p>
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
    windows.document.write(divElementContents);
    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();
  }

  const data2 = [
    { name: "AAA", Phone: "077" },
    { name: "BBB", Phone: "075" },
  ];
  const tableRows2 = data2.map((info) => {
    return `<tr><td>${info.name}</td><td>${info.Phone}</td></tr>`;
  });

  const table = ` <table className="table table-stripped">

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
          ${tableRows2}
        </thead>
        <tbody></tbody>
        </table>`;
  let phrase = "<table><tr><td>@Data</td>@Hola</tr></table>";
  let men = [];
  var ment = ["@Hola", "@Data", "@Name"];
  for (let i = 0; i < ment.length; i++) {
    let result = phrase.match(ment[i]);
    if (result === null) {
    } else {
      men.push(result);
    }
  }
  console.log(men);
  men.forEach((x) => {
    let tablerow = `<td>${x}</td>`;
    console.log(tablerow);
  });

  return (
    <>
      <Row>
        <Col>
          <Button style={{ marginTop: "10px" }} onClick={toggle}>
            Footer
          </Button>
        </Col>
        <Col>
          <Button style={{ marginTop: "10px" }} onClick={toggle2}>
            Header
          </Button>
        </Col>
        <Col>
          <Button onClick={printDivContent}>Print</Button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <h1>Choose The Footer</h1>

          <Input type="file" onChange={handleChange2} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
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
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle2}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Editor
        ref={editor}
        onInit={(evt, editor) => (editorRef.current = editor)}
        id="editor"
        cloudChannel="5-dev"
        init={editorConfig}
        initialValue={""}
      />
      <Button style={{ marginTop: "10px" }} variant="primary" onClick={log}>
        Save
      </Button>
    </>
  );
}
