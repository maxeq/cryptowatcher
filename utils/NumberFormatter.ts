function formatPrice(value: number, includeCurrencySymbol = true) {
  if (value == null) {
    return '--';
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 20, // Use a large number to allow for any number of decimal places
  }).format(value);

  let result;
  if (includeCurrencySymbol) {
    result = formattedValue;
  } else {
    result = formattedValue.replace('$', '');
  }

  // Remove trailing zeros after the decimal point
  result = result.replace(/\.?0+$/, '');

  // Count the number of zeros in the integer part of the number
  const match = result.match(/^0+/);
  const numZeros = match ? match[0].length : 0;

  // Calculate the maximum number of decimal places to display
  const maxDecimalPlaces = Math.max(0, 6 - numZeros); // Display up to 6 decimal places, minus the number of zeros in the integer part

  // Format the number again with the calculated maximum number of decimal places
  const finalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimalPlaces,
  }).format(value);

  return includeCurrencySymbol ? finalValue : finalValue.replace('$', '');
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
