<?php
    session_start();
    $loginErr = isset( $_SESSION['loggedin'] ) && !$_SESSION['loggedin'];
?>
<!DOCTYPE html>
<html>
<head>
  <title>Bebras.org</title>
  <style>
  .center {
      margin: auto;
      width: 35%;
      border: 3px solid blue;
      padding: 10px;
      text-align: center;
  }
 
  .errorText {
    color: red;
  }

  .data-field {
    padding-bottom: 5px;
  }
  </style>
</head>
<body>
  <div class="center">
    <div class="errorText" style="display: <?php echo ($loginErr) ? 'block' : 'none'; ?>">Wrong password.</div>
    <form method="post" action="check.php">
      <div class="data-field">
        <input name="username" type="text" placeholder="SVN username"></input>
      </div>
      <div class="data-field">
        <input name="password" type="password" placeholder="SVN password"></input>
      </div>
      <div class="data-field">
        <button type="submit">Connect</button>
      </div>
    </form>
  </div>
</body>
</html>
