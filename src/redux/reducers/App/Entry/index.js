
import Contract from "./Contract";
import Currency from "./Currecny/index";
import DocType from "./DocType/index";
import Property from "./Property";
import Setup from "./Setup";
export default {
  ...Setup,
  ...Property,
  ...Contract,
    Currency,
  DocType,


};

