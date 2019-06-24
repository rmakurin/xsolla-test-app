const assetUrl =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/public/' : '/';

const renderHTML = (body: string) => `
<!DOCTYPE html>
<html lang="ru">
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xsolla transaction app</title>
      <link rel="stylesheet" href="${assetUrl}css/styles.css">
  </head>
  <body>
    <div id="root">${body}</div>
    <script type="application/javascript" src="${assetUrl}js/bundle.js"></script>
  </body>
</html>
`;

export default renderHTML;
