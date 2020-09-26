export default (val, currency = 'RUB') => {
  const num = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency
  }).format(val);
  return num.includes('число') ? '...' : num;
};
