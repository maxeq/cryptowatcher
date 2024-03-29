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
  width?: string;
  height?: string;
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
  width,
  height,
}: Props) => {
  const {
    data: cryptoArrayData,
    isLoading,
    error,
  } = useSWR<Data>(
    `/api/coins/getArrayDataRedis${_id ? `?_id=${_id}` : ''}`,
    fetcher,
    {
      revalidateOnMount: true,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  if (error)
    return <ErrorMessage error={error} />;

  if (isLoading)
    return (
      <div>

      </div>
    );

  const item = cryptoArrayData.getarray.find(item => item._id === _id);

  if (!item) {
    return (
      <div
        style={{
          width: width,
          height: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        No data found for the given id
      </div>
    );
  }

  return (
    <Charts
      id={item._id}
      cryptoArray={item.array_current_price}
      showXLabel={showXLabel}
      showYLabel={showYLabel}
      width={width}
      height={height}
    />
  );
};

export default ChartFetcher;
