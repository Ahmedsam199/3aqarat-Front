import Core from "../../../core";
export default Core.Object({
  PaymentType: Core.String(),
  Currency: Core.String(),
  DefaultAmount: Core.Number(),
  DefaultForContract:Core.Boolean()
});
