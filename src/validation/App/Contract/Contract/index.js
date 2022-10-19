import { toBoolean } from "../../../../utility/Utils";
import Core from "../../../core";
export default Core.Object({
  FirstParty: Core.String(),
  SecondParty: Core.String(),
  ContractDate: Core.String(),
  Property: Core.String(),
  ContractType: Core.String(),
  StartContract: Core.String(),
  HandoverDate: Core.String(),
  EndContract: Core.String(),
  RequestedAmt: Core.Number(),
  Lawyer: Core.String(),
  PropertyValue: Core.Number(),
  ValueCurrency: Core.String(),
});
