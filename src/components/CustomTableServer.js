import Loading from '@componentsLocal/Loading';
import { convertObjectToParam, deepCopy, removeNullValue } from '@utils';
import axios from 'axios';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import ReactPaginate from 'react-paginate';
import Empty from './Empty';

const PER_PAGE = 10;
const CustomTableReport = forwardRef(
  (
    { filters, columns, url, ignoreTotalKeys = [], loadStyle = 'normal' },
    ref
  ) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    useImperativeHandle(ref, () => ({
      refresh: updateFilters,
    }));
    const fetchDate = async (params = '') => {
      try {
        setLoading(true);
        // !back
        const p = `Skipped=${page * PER_PAGE}&Length=${PER_PAGE}`;
        const response = await axios.get(
          `${url}${!!params ? `${params}&${p}` : `?${p}`}`
        );

        if (!(!!response && !!response.data[0] && response.data[0].length >= 2))
          throw new Error('data wrong');
        const { Total_Rows } = response.data[0].at(response.data[0].length - 1);
        response.data[0].pop();
        setTotal(Total_Rows);
        setData(response.data[0]);
      } catch (e) {
        console.error('hacker_it error', e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    const CustomPagination = () => {
      const count = Number(Math.ceil(total / PER_PAGE));
      return (
        <>
          <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            pageCount={count || 1}
            forcePage={page}
            activeClassName="active"
            onPageChange={(page) => setPage(page.selected)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={
              'pagination react-paginate justify-content-end my-2 pr-1'
            }
          />
        </>
      );
    };
    const updateFilters = async () => {
      try {
        const _filter = removeNullValue(deepCopy(filters));
        console.log('hacker_it', _filter);
        const _params = await convertObjectToParam(_filter);
        fetchDate(_params);
      } catch (e) {
        console.error('hacker_it error', e);
      }
    };
    useEffect(() => {
      updateFilters();
    }, [filters, page]);
    return !data.length ? (
      <Empty />
    ) : (
      <DataTable
        noHeader
        pagination
        striped
        columns={columns}
        paginationServer
        paginationTotalRows={total}
        paginationPerPage={PER_PAGE}
        paginationComponent={CustomPagination}
        className="react-dataTable"
        progressPending={loading}
        progressComponent={<Loading className="table-loading" />}
        sortIcon={<ChevronDown size={10} />}
        data={data}
      />
    );
  }
);

export default CustomTableReport;
