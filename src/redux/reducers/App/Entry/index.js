
import Currency from "./Currecny/index";
import DocType from "./DocType/index";
import Setup from "./Setup";
import Property from "./Property";
import Contract from "./Contract";
import PrintKeys from './'
export default {
  ...Setup,
  ...Property,
  ...Contract,
    Currency,
  DocType,


};

