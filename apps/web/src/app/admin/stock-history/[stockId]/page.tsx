'use client';
import { axiosInstance } from '@/axios/axios';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { DateContext } from '../page';
import { Box, Pagination, useMediaQuery, useTheme } from '@mui/material';
import StockDetailMobileComponent from '@/components/admin/StockDetailMobile';
import moment from 'moment';
import StockDetailPCComponent from '@/components/admin/StockDetailPC';
import LoadingPage from '@/components/loading';

export interface StockDetail {
  id: string;
  createdAt: string;
  productName: string;
  storeName: string;
  invoiceNo: string;
  status: string;
  qty: number;
  note: string;
}
interface Props {
  params: { stockId: string; date: string };
}
const Page: React.FC<Props> = ({ params }) => {
  const { date } = useContext(DateContext);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<StockDetail[]>([]);
  const { stockId } = params;
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const fetchStocks = () => {
    axiosInstance()
      .get('/summaries/v9/page/' + page, {
        params: { id: stockId, date },
      })
      .then((res) => {
        setStocks(res.data.result);
        setPageCount(res.data.pageCount);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchStocks();
  }, [page]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (isSmallScreen) {
    return (
      <>
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          Stock History
        </h2>
        {stocks.length > 0 ? (
          <>
            <h3 className="text-xl font-bold text-green-700 mb-4">
              {stocks[0].productName + ', ' + moment(date).format('MMMM YYYY')}
            </h3>
            <h3 className="text-xl font-bold text-green-700 mb-4">
              Branch : {stocks[0].storeName}
            </h3>
            <Box>
              {stocks.map((stock, index) => (
                <StockDetailMobileComponent
                  {...stock}
                  key={stock.id}
                  index={index}
                />
              ))}
              <Pagination
                count={pageCount}
                page={page}
                color="primary"
                className="flex justify-center my-4"
                onChange={handleChange}
              />
            </Box>
          </>
        ) : (
          <LoadingPage />
        )}
      </>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-green-500 mb-4">Stock History</h2>
      {stocks.length > 0 ? (
        <>
          <h3 className="text-xl font-bold text-green-700 mb-4">
            {stocks[0].productName +
              ', ' +
              moment(date).format('MMMM YYYY') +
              ' - Branch : ' +
              stocks[0].storeName}
          </h3>
          <StockDetailPCComponent stocks={stocks} />
          <Pagination
            count={pageCount}
            page={page}
            color="primary"
            className=" flex justify-center my-4"
            onChange={handleChange}
          />
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Page;
