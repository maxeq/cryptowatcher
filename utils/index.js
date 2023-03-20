function formatPrice(price = 0) {
  const formattedPrice = Math.round(Number(price) * 100) / 100;
  return `$${formattedPrice.toLocaleString()}`;
}

function formatPercent(percent) {
  if (percent == null) {
    return null;
  }

  const formattedPercent = parseFloat(Number(percent).toFixed(2));

  return formattedPercent + '%';
}

function extractValues(obj = [], prop = '') {
  return obj.map(item => item[prop]);
}

export { formatPrice, extractValues, formatPercent };
