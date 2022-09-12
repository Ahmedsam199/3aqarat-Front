import Core from "../../../core";
export default Core.Object({
  PayParty: Core.String(false),
  ReceiveParty: Core.String(false),
  Amount: Core.Number({more:-1}),
  Currency: Core.String(),
  PostingDate: Core.String(),
  Reference: Core.String(),
  Purpose: Core.String(),
  For: Core.String(),
  Remarks: Core.String(),
});
