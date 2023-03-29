function formatPrice(value: number, decimalPlaces = 0, includeCurrencySymbol = true) {
  if (value == null) {
    return '--';
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);

  let result;
  if (includeCurrencySymbol) {
    result = formattedValue;
  } else {
    result = formattedValue.replace('$', '');
  }

  // Remove trailing zeros after the decimal point
  result = result.replace(/\.00$/, '');

  return result;
}


function formatPercent(percent: number | null) {
  if (percent == null) {
    return null;
  }

  const formattedPercent = parseFloat(Number(percent).toFixed(2));

  return formattedPercent + '%';
}

function extractValues(obj = [], prop = '') {
  return obj.map(item => item[prop]);
}

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.abs((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)}s`;
  }

  const diffInMinutes = diffInSeconds / 60;
  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m`;
  }

  const diffInHours = diffInMinutes / 60;
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  }

  const diffInDays = diffInHours / 24;
  return `${Math.floor(diffInDays)}d`;
};

export { formatPrice, extractValues, formatPercent, formatTimeAgo };
