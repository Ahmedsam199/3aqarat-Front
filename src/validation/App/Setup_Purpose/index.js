import Core from "../../core";
export default Core.Object({
  Purpose: Core.String(),
  IsPayable: Core.Boolean(),
  DefaultAmt: Core.Number({}),
  DefaultCurrency: Core.String(),
});
