function formatPrice(price = 0) {
  const formattedPrice = Math.round(Number(price) * 100) / 100;
  return `$${formattedPrice.toLocaleString()}`;
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
