import Core from "../../core";
export default Core.Object({
  FullName: Core.String(),
  UserName: Core.String(),
  Password: Core.String(),
  DefaultLanguage: Core.String(),
  DefaultCurrency: Core.String(),
  FromDate: Core.String(),
  ToDate: Core.String(),
  Disabled:Core.Boolean(),
});
