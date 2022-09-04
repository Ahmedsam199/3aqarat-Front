import * as yup from 'yup';
import { parseNumber } from '../utility/Utils';
const Object = (obj = {}) => yup.object().shape(obj);

const String = (req = true) =>
  req
    ? yup.string().required()
    : yup
        .string()
        // .nullable(true)
        // .default('')
        // .transform((v) => v ?? '');

const Boolean = () =>
  yup
    .boolean()
    .nullable(true)
    .default(false)
    .transform((v) => v ?? false);

const Number = (
  { less = Infinity, more = 0, required = true } = {
    less: Infinity,
    more: 0,
    required: true,
  }
) =>
  required
    ? yup
        .number()
        // .transform((value, originalValue) => {
        //   console.log("testing", value);
        //   return ;
        //   return parseNumber(originalValue);
        // })
        .moreThan(more)
        .lessThan(less)
        .required()
    : yup.number().nullable();

const Array = ({ obj = {}, num = 1, required = true }) =>
  required
    ? yup.array().of(Object(obj)).min(num).required()
    : yup
        .array()
        .of(Object(obj))
        .nullable(true)
        .default([])
        .transform((v) => v ?? []);
const Date = () => yup.array().min(1).required();

export default {
  String,
  Boolean,
  Email: (req = true) => String(req).email(),
  Number,
  Date,
  Object,
  Array,
};

// export class Schema {
//     constructor({ type, req = true }) {
//         switch (type) {
//             case 'string':
//                 this.Schema = string(req)
//                 break;
//             case "boolean":
//                 this.Schema = boolean(req)
//                 break;
//             default: return
//         }
//     }
//     when({ value, is, then, otherwise }) {
//         this.Schema = this.Schema.when(value, {
//             is,
//             then,
//             otherwise
//         })
//         return this.Schema
//     }
//     get() {
//         return this.Schema
//     }
// }
/*
{ less = _Infinity, more = -1 }
*/
