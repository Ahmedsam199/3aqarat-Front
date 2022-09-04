// ** React Import
import React, { useEffect, useReducer, useRef } from 'react';
// ** Custom Components
import CustomSelect from '@Component/CustomSelect';
import { SuccessToast } from '@Component/SuccessToast';
import Breadcrumbs from '@components/breadcrumbs';
import { insertItem, updateItem } from '@store/actions/data';
import { toasty } from '@toast';
import { Lock, Plus, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button, Col, Input, Row, Spinner, Table
} from 'reactstrap';
const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "setRoleSeries":
      return { ...state, RoleSeries: payload };
    case "setOriginRole":
      return { ...state, originRole: payload };
    case "changeLoading":
      return { ...state, loading: !state.loading };
    case "setData":
      return { ...state, data: payload };
    case "setActiveRoles":
      return { ...state, activeRoles: payload };
    default:
      return state;
  }
}
const initialState = {
  RoleSeries: null,
  originRole: null,
  loading: false,
  data: [],
  activeRoles: [],
};
const POST = (props) => {
  const dispatchRedux = useDispatch()
  const { Roles, Doctypes, Permission } = useSelector(state => state)
  const theadRef = useRef(null)
  const [{ RoleSeries, originRole, loading, data, activeRoles }, dispatch] =
    useReducer(reducer, initialState);
  const navigate = useNavigate();
  const params = useParams();
  // ** Function to handle form submit
  useEffect(async () => {
    // const { data } = await apiClient.get(Routes.Permission.read)
    dispatch({
      type: "setActiveRoles",
      payload: Permission.map((x) => x.RoleSeries),
    });
    if (params.series) {
      if (!Permission.length) return
      const _ = Permission.find(x => x.Series === params.series)
      // return
      const { Permission, JsonData, RoleSeries } = _;
      dispatch({ type: "setData", payload: Permissions ?? JsonData })
      dispatch({ type: "setRoleSeries", payload: RoleSeries });
      dispatch({ type: "setOriginRole", payload: RoleSeries });
    }
  }, [Permission]);
  //#region role
  const changeRole = (e) => {
    dispatch({ type: "setRoleSeries", payload: e.value });

  }
  //#endregion role
  //#region Permission
  const removePermission = (index) => {
    const _ = data
    _.splice(index, 1)
    dispatch({ type: "setData", payload: [..._] })
  }
  const addPermission = (e) => {
    const _ = {
      DoctypeId: "_",
      Read: true,
      Write: true,
      Create: true,
      Delete: true,
      Amend: true,
      Cancel: true
    }
    dispatch({ type: "setData", payload: [...data, _] })

  }
  const setDocType = ({ value, label }, index) => {
    const _ = data.map((x, i) => (i === index ? { ...x, DoctypeId: value, DocTypeName: label } : x))
    dispatch({ type: "setData", payload: [..._] })

  }
  //#endregion Permission
  //#region dataTable
  const changeStatus = ({ target: { name } }, index) => {
    dispatch({
      type: "setData", payload: data.map((x, i) => {
        if (i === index) return { ...x, [name]: !x[name] }
        else return x
      })
    })
  }
  const renderRow = (row, index) => {
    return (
      <tr key={`row-${index}`}>
        <td style={{ width: "40%" }}>
          <CustomSelect
            textName="DocTypeName"
            valueName="Series"
            onChange={(e) => setDocType(e, index)}
            options={Doctypes?.filter(x => data?.findIndex(y => y.DoctypeId === x.Series) === -1 || x.Series === row.DoctypeId)}
            value={row.DoctypeId}
            className="w-100"
          />
        </td>
        <td style={{ width: "10%" }}>
          <Input onChange={(e) => changeStatus(e, index)} type='checkbox' id={`${index}-Read`} name="Read" label='' defaultChecked={row.Read} />
        </td>
        <td style={{ width: "10%" }}>
          <Input onChange={(e) => changeStatus(e, index)} type='checkbox' id={`${index}-Write`} name="Write" label='' defaultChecked={row.Write} />
        </td>
        <td style={{ width: "10%" }}>
          <Input onChange={(e) => changeStatus(e, index)} type='checkbox' id={`${index}-Create`} name="Create" label='' defaultChecked={row.Create} />
        </td>
        <td style={{ width: "10%" }}>
          <Input onChange={(e) => changeStatus(e, index)} type='checkbox' id={`${index}-Delete`} name="Delete" label='' defaultChecked={row.Delete} />
        </td>
        <td style={{ width: "10%" }}>
          <Input onChange={(e) => changeStatus(e, index)} type='checkbox' id={`${index}-Amend`} name="Amend" label='' defaultChecked={row.Amend} />
        </td>
        <td style={{ width: "10%" }}>
          <Input onChange={(e) => changeStatus(e, index)} type='checkbox' id={`${index}-Cancel`} name="Cancel" label='' defaultChecked={row.Cancel} />
        </td>
        <td style={{ width: "10%" }}>
          <Button.Ripple
            className="btn-icon"
            color="flat-danger"
            onClick={() => {
              removePermission(index);
            }}
          >
            <Trash2 size="15" />
          </Button.Ripple>
        </td>
      </tr>
    )
  }
  //#endregion dataTable
  //#region Submit
  const onSubmit = async () => {
    try {
      dispatch({ type: "changeLoading" })
      const request = {
        Series: params.series ?? "",
        RoleSeries: RoleSeries,
        JsonData: data.filter((x) => x.DoctypeId !== "_"),
      };
      if (!request.JsonData.length) {
        throw new Error("Tables empty")
      }
      dispatchRedux(params.Series ? updateItem("Permission", request) : insertItem("Permission", request)).
        then(res => {
          toast.success(<SuccessToast />, { hideProgressBar: true });
          navigate("/App/Permissions")
        }).
        catch(err => {
          console.log("hacker_it_err", err)
        })
    } catch (e) {
      toasty({ type: "Error", msg: e.message })
    } finally {
      dispatch({ type: "changeLoading" })
    }
  }
  //#endregion Submit
  useEffect(() => {
    const handleScroll = () => {
      const iconPermission = document.querySelector('#icon-permission')
      const mainContentScrollTop = document.querySelector('.container-after-titlebar')
      if (mainContentScrollTop.scrollTop > iconPermission?.offsetTop + 120) {
        theadRef.current.style.position = 'fixed'
        theadRef.current.style.zIndex = "100"
        theadRef.current.style.top = "119px"
      }
      else {
        theadRef.current.style.position = 'relative'
        theadRef.current.style.zIndex = "0"
      }
      return
    }
    document.querySelector('.container-after-titlebar')?.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.querySelector('.container-after-titlebar')?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Permissions"
        breadCrumbParent="Permissions"
        breadCrumbActive="Permissions"
        breadCrumbActiveLink="//Permissions"
      />
      <Row>
        <Col sm="12">
          <div className="mt-1 permissions">
            <div className="d-flex justify-content-between align-items-center">
              <CustomSelect
                textName="RoleName"
                valueName="Series"
                onChange={(e) => changeRole(e)}
                options={Roles?.filter(
                  (x) =>
                    x.Series === originRole ||
                    activeRoles?.findIndex((y) => y === x.Series) === -1
                )}
                // options={Roles}
                value={RoleSeries}
                className="w-25"
              />
              <Button
                color="primary"
                disabled={!RoleSeries || !data.length || loading}
                onClick={onSubmit}
              >
                {loading && (
                  <Spinner color="white" size="sm" className="mr-1" />
                )}
                {t("Save")}
              </Button>
            </div>
            <h6 className="py-1 mx-1 mb-0 font-medium-2" id="icon-permission">
              <Lock size={18} className="mr-25" />
              <span className="align-middle">{t("Permissions")}</span>
            </h6>
            <div className="permission-table">
              <Table borderless striped>
                <thead className="thead-light" ref={theadRef}>
                  <tr>
                    <th style={{ width: "40%" }}>{t("DocType")}</th>
                    <th style={{ width: "10%" }}>{t("Read")}</th>
                    <th style={{ width: "10%" }}>{t("Write")}</th>
                    <th style={{ width: "10%" }}>{t("Create")}</th>
                    <th style={{ width: "10%" }}>{t("Delete")}</th>
                    <th style={{ width: "10%" }}>{t("Amend")}</th>
                    <th style={{ width: "10%" }}>{t("Cancel")}</th>
                    <th style={{ width: "10%" }}>{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>{data.map((x, index) => renderRow(x, index))}</tbody>
              </Table>
            </div>
            <Button
              onClick={addPermission}
              color="flat-primary"
              style={{ margin: "0rem 0rem 7rem 0rem" }}
            >
              <Plus size={18} />
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default POST;
