<?php 
 session_start(); 
 // echo "<pre>\n-----------------------------------------------------------------------------------------------------------\n";
 // print_r($_SESSION);
 // echo "\n-----------------------------------------------------------------------------------------------------------</pre>\n";

 if(!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']) {
	header('Location: index.php');
	exit;
 }

 $user = $_SESSION['user'];

?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>Bebras.org profile</title>  
  <style type="text/css" >
    html, body{
      margin:0px;
      padding:0px;
      font-size:14px;
    }
  </style>
</head>
<body>

<a href="logout.php">Logout</a>
<h3>Private info for <?php echo $user['username']; ?></h3>


</body>
</html>
