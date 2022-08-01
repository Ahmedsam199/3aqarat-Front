import { convertObjectToParam, deepCopy, isEmpty } from '@utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder } from 'react-feather';
import { useTranslation } from 'react-i18next';

const Tree = ({ url, filters }, shift) => {
  const { t } = useTranslation()
  const [dataTree, setDataTree] = useState(null)
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchDataTree = (data) => {
    if (data.length) {
      const keys = Object.keys(data[0])
      const focusParent = keys.find(item => item.indexOf("Parent") >= 0)
      const focusName = keys.find(item => item.indexOf("Account") >= 0)
      // return console.log("hacker_it", focusParent, focusName)
      const _DataTree = data.map(item => {
        const _item = deepCopy(item)
        delete _item[focusName]
        delete _item[focusParent]
        return ({ ..._item, Name: item[`${focusName}`], Parent: item[`${focusParent}`] })
      })
      setColumns(Object.keys(_DataTree[0]).filter(x => !["Parent", "Name"].includes(x)))
      setDataTree(_DataTree)
    }
  }
  const fetchData = async (params = "") => {
    setLoading(true);
    // !back
    const response = await axios.get(`${url}${params}`);
    if (response) {
      const { data } = response;
      if (data) {
        fetchDataTree(response.data[0]);
      } else {
        fetchDataTree([])
      }
    }
    setLoading(false);
  }
  const trigger = async () => {
    try {
      const _filter = deepCopy(filters)
      _filter.From_Date = _filter?.From_Date[0]
      _filter.To_Date = _filter?.To_Date[0]
      const _params = await convertObjectToParam(_filter)
      fetchData(_params)
    } catch (e) {
      console.error("hacker_it error", e)
    }
  }
  useEffect(() => {
    trigger()
  }, [url, filters])
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{t("Name")}</th>
          {
            columns ?
              columns.map(x => ["Parent", "Name"].includes(x) ? "" : (
                <th>{x}</th>
              )) : ""
          }
        </tr>
      </thead>
      <tbody>
        {dataTree
          ?
          dataTree
            .filter((x) => isEmpty(x.Parent))
            .map((node) => (
              <TreeNode
                key={node.Name}
                tree={dataTree}
                columns={columns}
                node={node}
              />
            ))
          : ''}
      </tbody>
    </table>
  );
};

const TreeNode = ({ key, node, tree, columns, shift = 0 }) => {
  const [childVisible, setChildVisiblity] = useState(true);
  const children = tree.filter((x) => node.Name === x.Parent);
  return (
    <>
      <tr key={key}>
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
            {children.length ? (
              <Folder size={17} className="mx-1" color="#ff9f43" />
            ) : (
              <File size={17} className="mx-1" color="#28c76f" />
            )}
            {node.Name}
          </div>
        </td>
        {
          children.length === 0 &&
          columns?.filter(x => x !== 'Name').map((x) => (
            <td>{node[x]}</td>
          ))
        }

      </tr>
      {children &&
        childVisible &&
        children.map((node) => (
          <TreeNode
            key={node.Name}
            tree={tree}
            columns={columns}
            node={node}
            shift={shift + 20}
          />
        ))}
    </>
  );
};

export default Tree;
