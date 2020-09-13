export default (val) => new Intl
  .DateTimeFormat('ru-RU', {
    second: '2-digit',
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  .format(val);
