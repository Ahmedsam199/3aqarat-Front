import Styled from 'styled-components'
const colorOption = [
  { type: "new", color: "#226E5C" },
  { type: "Order", color: "#4099C7" },
  { type: "Pending", color: "#E52020" },
]
const Circle = Styled.h5`
  text-align:center;
  border-radius: 15px;
  padding:5px 10px;
  margin-left:auto;
  background-color:${props => colorOption.find(x => x.type === props.type)?.color ?? "#000"};
  color:white !important;
  font-weight:600;
  &:hover{
    filter:brightness(180%);
  }

`
export default Circle
