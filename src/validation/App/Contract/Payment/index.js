import Core from "../../../core";
export default Core.Object({
  PayParty: Core.String(false),
  ReceiveParty: Core.String(false),
  Amount: Core.Number( {min:-2}),
  Currency: Core.String(),
  PostingDate: Core.String(),
  Reference: Core.String(),
  Purpose: Core.String(),
  For: Core.String(false),
  Remarks: Core.String(false),
});
