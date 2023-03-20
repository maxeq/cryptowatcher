import React from 'react';
import useSWR from 'swr';
import Charts from '@/components/charts/Chart';
import Loader from '../icons/Loader';
import ErrorMessage from '../errorMessage';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Props {
  _id?: string;
  showXLabel?: boolean;
  showYLabel?: boolean;
}

interface Data {
  getarray: {
    _id: string;
    array_current_price: number[];
  }[];
}

const ChartFetcher: React.FC<Props> = ({
  _id,
  showXLabel,
  showYLabel,
}: Props) => {
  const {
    data: cryptoArrayData,
    isLoading,
    error,
  } = useSWR<Data>(
    `/api/coins/getArrayData${_id ? `?_id=${_id}` : ''}`,
    fetcher,
    {
      revalidateOnMount: true,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  if (error) return <ErrorMessage error={error} />;
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  const item = cryptoArrayData.getarray.find(item => item._id === _id);

  if (!item) return <div>No data found for the given id</div>;

  return (
    <Charts
      id={item._id}
      cryptoArray={item.array_current_price}
      showXLabel={showXLabel}
      showYLabel={showYLabel}
    />
  );
};

export default ChartFetcher;
