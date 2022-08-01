import ReactPaginate from "views/extensions/pagination";

const CustomPagination = ({ currentPage, length, handlePagination }) => (
  <ReactPaginate
    previousLabel={""}
    nextLabel={""}
    forcePage={currentPage}
    onPageChange={(page) => handlePagination(page)}
    pageCount={length / 7 || 1}
    breakLabel={"..."}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
    activeClassName={"active"}
    pageClassName={"page-item"}
    nextLinkClassName={"page-link"}
    nextClassName={"page-item next"}
    previousClassName={"page-item prev"}
    previousLinkClassName={"page-link"}
    pageLinkClassName={"page-link"}
    breakClassName="page-item"
    breakLinkClassName="page-link"
    containerClassName={
      "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    }
  />
);

export default CustomPagination;
