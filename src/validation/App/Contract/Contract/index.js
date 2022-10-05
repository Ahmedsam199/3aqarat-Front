import { toBoolean } from "../../../../utility/Utils";
import Core from "../../../core";
export default Core.Object({
  FirstParty: Core.String(),
  SecondParty: Core.String(),
  ContractDate: Core.String(),
  Property: Core.String(),
  ContractType: Core.String(),
  RentCurrency: Core.String(false).when("TypeOfTran", {
    is: (value) => !toBoolean(value),
    then: Core.String(),
  }),
  IsFurnished: Core.Boolean(),
  ContractStarts: Core.String(),
  HandoverDate: Core.String(),
  PaidAmt: Core.Number({ more: -1 }).when("TypeOfTran", {
    is: (value) => toBoolean(value),
    then: Core.Number(),
    otherwise: (schema) => schema.transform((value) => 1),
  }),
  PaidCurrency: Core.String(false).when("TypeOfTran", {
    is: (value) => toBoolean(value),
    then: Core.String(),
  }),
  ContractEnds: Core.String(),
  RequestedAmt: Core.Number(),
  RentFor: Core.Number({ more: -1 }).when("TypeOfTran", {
    is: (value) =>!toBoolean(value),
    then: Core.Number(),
    otherwise: (schema) => schema.transform((value) => 1),
  }),
  AdvanceAmt: Core.Number(),
  Lawyer: Core.String(),
  AdvanceCurrency: Core.String(),
  InsuranceAmt: Core.Number(),
  InsuranceCurrency: Core.String(),
  TypeOfTran: Core.String(),
});
