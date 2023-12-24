<?php
session_start();

foreach ($_SESSION as $key => $value) {
	if(isset($_SESSION[$key])) 
	  unset($_SESSION[$key]);
}

$params = session_get_cookie_params();
setcookie(session_name(), '', 0, $params['path'], $params['domain'], $params['secure'], isset($params['httponly']));
session_unset();
if(session_destroy()) header("Location: index.php");
?>
