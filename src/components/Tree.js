import { ChevronDown, ChevronRight, File, Folder, Minus } from 'react-feather';
import { useState, useEffect } from 'react';
import RowActions from 'components/RowActions';
import { isEmpty } from '@utils'
const Tree = ({ subject, onEdit, onDelete, data = [] }, shift) => {
  const [dataTree, setDataTree] = useState(null)
  useEffect(() => {
    if (data.length) {
      const keys = Object.keys(data[0])
      const focusParent = keys.find(item => item.indexOf("Parent") >= 0)
      const focusName = keys.find(item => item.indexOf("Name") >= 0)
      setDataTree(data.map(item => ({ ...item, Name: item[`${focusName}`], Parent: item[`${focusParent}`] })))
    }
  }, [data])
  return (
    <>
      {dataTree
        ? dataTree
          .filter((x) => isEmpty(x.Parent))
          .map((node) => (
            <TreeNode
              subject={subject}
              key={node.Series}
              tree={dataTree}
              node={node}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        : ''}
    </>
  );
};

const TreeNode = ({ node, tree, subject, onEdit, onDelete, shift = 0 }) => {
  const [childVisible, setChildVisiblity] = useState(true);
  const children = tree.filter((x) => x.Parent == node.Series);
  return (
    <>
      <tr>
        <td>
          <div
            className="d-tree-head"
            style={{ paddingLeft: shift }}
            onClick={(e) => setChildVisiblity((v) => !v)}
          >
            {children.length > 0 ? (
              childVisible ? (
                <ChevronDown size={18} className="d-inline" />
              ) : (
                <ChevronRight size={18} className="d-inline" />
              )
            ) : (
              <span style={{ width: 16, display: 'inline-block' }}></span>
            )}
            {node.IsGroup ? (
              <Folder size={17} className="mx-1" color="#ff9f43" />
            ) : (
              <File size={17} className="mx-1" color="#28c76f" />
            )}

            {node.Name}
          </div>
        </td>
        <td>
          <RowActions
            subject={subject}
            rowId={node.Series}
            onDelete={() => onDelete(node.Series)}
            onEdit={() => onEdit(node)}
          />
        </td>
      </tr>
      {children &&
        childVisible &&
        children.map((node) => (
          <TreeNode
            subject={subject}
            key={node.Series}
            tree={tree}
            node={node}
            shift={shift + 20}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </>
  );
};

export default Tree;
