// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import Proptypes from 'prop-types';
import {
  Grid,
  CheckSquare,
  MessageSquare,
  Mail,
  Calendar,
} from 'react-feather';
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';

const BreadCrumbs = (props) => {
  // ** Props
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbParent4,
    breadCrumbActive,
    breadCrumbActiveLink,
  } = props;

  return (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? (
              <h2 className="content-header-title float-left mb-0">
                {breadCrumbTitle}
              </h2>
            ) : (
              ''
            )}
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link to="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag="li" className="text-primary">
                  {breadCrumbParent}
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    <Link to={`${breadCrumbActiveLink}`}>
                      {breadCrumbParent3}
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent4 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent4}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag="li" active>
                  {!!breadCrumbActiveLink ? (
                    <>
                      {typeof breadCrumbActive === 'string'
                        ? `${breadCrumbActive}`
                        : breadCrumbActive}
                    </>
                  ) : (
                    <>
                      {typeof breadCrumbActive === 'string'
                        ? `${breadCrumbActive}`
                        : breadCrumbActive}
                    </>
                  )}
                  {/* {breadCrumbActive} */}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BreadCrumbs;

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired,
};
