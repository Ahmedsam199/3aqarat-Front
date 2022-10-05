export const buildHtmlTable = ({ name, attributes }) => {
  return `<table id='${name}' style="width:100%;margin:10px 0;">
        <tr style="background:#3B444B;color:white">${attributes.map(x => (`<td style="text-align:center;" data-name='${x}'>${x}</td>`)).reduce((s, x) => s + x, "")}</tr>
        <tr>${attributes.map(x => (`<td style="text-align:center;">____</td>`)).reduce((s, x) => s + x, "")}</tr>
  </table>`

}

const getStyle = ({ isReceipt }) => (
  isReceipt ?
    `
    <style>
     #Body-start-html  table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      #Body-start-html table td,#Body-start-html table th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      
      #Body-start-html table tr:nth-child(even){background-color: #f2f2f2;}
      
      #Body-start-html table tr:hover {background-color: #ddd;}
      
      #Body-start-html table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #3B444B;
        color: white;
      }
      #Body-start-html table td {
        text-align: center;
      }
    img{
      margin:0 auto;
      width:50%;
      height:150px;
    }
    </style>
  `
    :
    `<style>
        html{ 
            height: 100%; 
        }
        body{
             position: relative;
              height: 90%;
             }
        .page-header, .page-header-space {
          height: 150px;
        }
        
        .page-footer, .page-footer-space {
          height: 100px;
        }
        .page-footer {
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        
        .page-header {
          position: fixed;
          top: 0mm;
          width: 100%;
        }
        #Body-start-html  table {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        #Body-start-html table td,#Body-start-html table th {
          border: 1px solid #ddd;
          padding: 8px;
        }
        
        #Body-start-html table tr:nth-child(even){background-color: #f2f2f2;}
        
        #Body-start-html table tr:hover {background-color: #ddd;}
        
        #Body-start-html table th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: center;
          background-color: #3B444B;
          color: white;
        }
        #Body-start-html table td {
        text-align: center;
      }
        @media print
        {
          .page-break  { display:block; page-break-before:always; }
        }
    </style>`
)
const makeHTML = ({ Header, Footer, Html, isReceipt }) => (
  isReceipt ?
    `   
      <center>
        <img id="Header-html" src="${Header}" />
        <div id="Body-start-html">
              ${Html}
          <div style="display:none;" id="Body-end-html"></div>
        </div>
      </center>
      `
    :
    `   
   <div class="page-header" style="text-align:center">
    <img style="width:100%;height:100%" id="Header-html" src="${Header}" />
    </div>
    <div class="page-footer" style="text-align:center">
      <img style="width:100%;height:100%" id="Footer-html" src="${Footer}" />
    </div>
    <table style='width:100%'>
      <thead>
        <tr>
          <td>
            <!--place holder for the fixed-position header-->
            <div class="page-header-space" style="margin-bottom:10px"></div>
          </td>
        </tr>
      </thead>
      <tbody style="margin:150px 0 50px 0">
          <tr>
            <td id="Body-start-html">
              ${Html}
              <div style="display:none;" id="Body-end-html"></div>
            </td>
          </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <!--place holder for the fixed-position footer-->
            <div class="page-footer-space" style="margin-top:10px"></div>
          </td>
        </tr>
      </tfoot>
      </table>
      `
)
export const makeTemplateHtml = ({ Header, Footer, Html, isReceipt = false, isRtl = false }) => {
  return `
         <html  dir="${isRtl ? "rtl" : "ltr"}">
            ${getStyle({ isReceipt })}
            ${makeHTML({ Header, Footer, Html, isReceipt })}
         </html>       
    `
}

// #region Editor
// plugins: `advlist wizardExample  pageembed horizntalline autocomplete mentions advlink paste mention autolink lists link  charmap  anchor pagebreak code emoticons image table paste lists advlist checklist link hr charmap directionality searchreplace visualblocks code fullscreen insertdatetime media table paste code imagetools help wordcount testBTN`,
export const EDITOR_CONFIG = {
  menubar: false,
  toolbar: `undo redo  wizardExample | h1 h2 h3 h4 h5 h6  |  bold italic | styleselect fontselect fontsizeselect | forecolor backcolor  |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent |  removeformat  | code`,
  plugins: `code textcolor`,
  min_height: 800,
  max_height: 800,
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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

const getToolbarButtons = (excludeButtonAriaLabel) => {
  return document.querySelectorAll(
    `#toolbar button:not([aria-label='${excludeButtonAriaLabel}'])`
  );
}
const onCloseEmojiModal = () => {
  getToolbarButtons("Emoji picker").forEach((button) => {
    button.removeEventListener("click", onCloseEmojiModal);
  });
}
export const registerEmoji = (editor) => {
  editor.ui.registry.addButton("liaEmoji", {
    icon: "emoji",
    tooltip: "Emoji picker",
    onAction: () => {
      getToolbarButtons("Emoji picker").forEach((button) => {
        button.addEventListener("click", onCloseEmojiModal);
      })
    }
  });
}
// second
function getMatchedChars(pattern, mentions) {
  return mentions.filter((char) => {
    return char.toLowerCase().includes(pattern.toLowerCase());
  });
}
export const registerAutocompleter = (editor, mentions) => {
  editor.ui.registry.addAutocompleter("specialchars_cardmenuitems", {
    ch: "@",
    minChars: 0,
    columns: "auto",
    highlightOn: ["char_name"],
    onAction: function (autocompleteApi, rng, value) {
      editor.selection.setRng(rng);
      editor.insertContent(`<a data-mention="true" >${value}</a>`);
      // editor.insertContent(Tag);
      // tinymce.activeEditor.execCommand("mceInsertContent", false, table);
      autocompleteApi.hide();
    },
    fetch: (pattern) => {
      return new window.tinymce.util.Promise((resolve) => {
        var results = getMatchedChars(pattern, mentions).map(function (char) {
          return {
            type: "cardmenuitem",
            value: char,
            items: [
              {
                type: "cardcontainer",
                direction: "vertical",
                items: [
                  {
                    type: "cardtext",
                    text: char,
                  },
                ],
              },
            ],
          };
        });
        resolve(results);
      });
    },
  });
}


const getSubstring = ({ string, start, end, inner = false }) => {
  try {
    const _start = string.indexOf(start);
    if (_start < 0) throw new Error();
    const _stringAfterStart = string.slice(_start + start.length);
    const _end = _stringAfterStart.indexOf(end);
    if (_end < 0) throw new Error();
    return [
      string.slice(
        _start + (start.length * inner),
        _end + (end.length * !inner) + (string.length - _stringAfterStart.length)
      ),
      _end + end.length + (string.length - _stringAfterStart.length),
    ];
  } catch (error) {
    return [];
  }
};

const getAttributes = (string) => {
  let attributes = [];
  for (let index = 0; index < string.length;) {
    const [attribute, end] = getSubstring({ string: string.slice(index), start: `data-name=\"`, end: `\"`, inner: true });
    index += end || string?.length;
    // ** focus
    if (!!attribute) attributes.push({ label: attribute, value: attribute });
  }
  return attributes;
};
export const getTablesMap = (string) => {
  const tableNames = {};
  for (let index = 0; index < string.length;) {
    const [table, end] = getSubstring({ string: string.slice(index), start: "<table id", end: "</table>" });
    index += end || string?.length;
    if (!!table) {
      const [tableName] = getSubstring({ string: table, start: `id=\"`, end: `\"`, inner: true });
      const attributes = getAttributes(table);
      tableNames[tableName] = attributes;
    }
  }
  return tableNames;
};
// #endregion 