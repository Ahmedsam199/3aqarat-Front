import Core from "../../../core";
export default Core.Object({
  PayParty: Core.String(false),
  ReceiveParty: Core.String(false),
  Amount: Core.Number({ min: -2 }),
  Currency: Core.String(),
  PostingDate: Core.String(),
  Contract: Core.String(),
  TotalPay:Core.Number(),
  PaymentType: Core.String(),
  // Outstanding:Core.Number(),
  
  // Remarks: Core.String(false),
});
