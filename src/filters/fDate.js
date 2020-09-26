export default (val, format = 'date') => {
  const options = {};

  if (format.includes('time')) {
    options.second = '2-digit';
    options.minute = '2-digit';
    options.hour = '2-digit';
  }

  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }

  return new Intl
    .DateTimeFormat('ru-RU', options)
    .format(new Date(val));
}

