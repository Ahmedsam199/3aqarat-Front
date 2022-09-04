import Core from "../../core";
export default Core.Object({
  FullName: Core.String(),
  Cell: Core.String(false),
  Phone: Core.String(),
  Address: Core.String(false),
  Gender: Core.Boolean(),
  Remarks: Core.String(),
});
