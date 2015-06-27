<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title></title>

    <link rel="stylesheet" href="bower_components/normalize.css/normalize.css">

    <link rel="stylesheet" href="dist/styles/main.css">

    <script src="bower_components/modernizr/modernizr.js"></script>
  </head>
  <body>

    <div id="app"></div>

  <!-- Third Party Scripts -->
  <script src="bower_components/commonjs-require/commonjs-require.js"></script>
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="bower_components/underscore/underscore.js"></script>
  <script src="bower_components/backbone/backbone.js"></script>
  <script src="bower_components/handlebars/handlebars.js"></script>

  <!-- Application Scripts -->
  <script src="dist/scripts/templates.js"></script>
  <script src="dist/scripts/app.js"></script>
  <script>
    require('main');
  </script>

</body>
</html>