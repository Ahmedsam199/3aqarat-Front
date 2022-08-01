import Styled from 'styled-components'
const colorOption = [
  { status: "new", color: "#226E5C" },
  { status: "draft", color: "#FCA651" },
  { status: "submitted", color: "#4099C7" },
  { status: "cancelled", color: "#E52020" },
]
const Circle = Styled.span`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  border-radius: 50%;
  margin-left:1rem;
  background-color:${props => colorOption.find(x => x.status === props.status)?.color??"#000"};
  &:hover{
    filter:brightness(180%);
  }

`
export default Circle
