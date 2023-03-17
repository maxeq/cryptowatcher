import React from "react";
import useSWR from "swr";
import Charts from '@/components/charts/Chart'
import Loader from "../icons/Loader";

interface CryptoArrayData {
  _id: string;
  array_current_price: number[];
}

interface Data {
  getarray: CryptoArrayData[];

}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  _id?: string;
  showXLabel?: boolean;
  showYLabel?: boolean;
}

const ChartFetcher: React.FC<Props> = ({ _id, showXLabel, showYLabel }: Props) => {
  const { data: cryptoArrayData, error: arrayError } = useSWR<Data>(
    `/api/coins/getArrayData${_id ? `?_id=${_id}` : ''}`,
    fetcher,
    {
      shouldRetryOnError: false,
      onSuccess: (data) => {
        console.log(data);
        return data || [];
      },
      onError: (error) => {
        console.error(error);
      },
      revalidateOnMount: true,
      dedupingInterval: 300000 // Cache for 5 minutes
    }
  );

  if (arrayError) return <div>Error loading data</div>;
  if (!cryptoArrayData) return <div><Loader /></div>;

  const item = cryptoArrayData.getarray.find((item) => item._id === _id);

  if (!item) return <div>No data found for the given id</div>;

  return (
      <Charts id={item._id} cryptoArray={item.array_current_price} showXLabel={showXLabel} showYLabel={showYLabel} />
  );
};

export default ChartFetcher;
