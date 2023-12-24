<?php
session_start();

function clean_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function printSESSION() {
  echo "<pre>\n-----------------------------------------------------------------------------------------------------------\n";
  print_r($_SESSION);
  echo "\n-----------------------------------------------------------------------------------------------------------</pre>\n";
}
   
function goToLogin() {
    $_SESSION['loggedin'] = false;
    header('Location: index.php');
    exit;
}


//The URL of the resource that is protected by Basic HTTP Authentication.
$url = 'https://svn.bebras.org/svn/repos/';

//Your username.
$username = clean_input($_POST['username']);

//Your password.
$password = clean_input($_POST['password']);

//Initiate cURL.
$ch = curl_init($url);
 
//Specify the username and password using the CURLOPT_USERPWD option.
curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);  

//Tell cURL to return the output as a string instead
//of dumping it to the browser.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//Execute the cURL request.
$response = curl_exec($ch);
 
//Check for errors.
if(curl_errno($ch)){
    //If an error occured, throw an Exception.
    throw new Exception(curl_error($ch));
}

//echo strpos($response,"repos");
if(strpos($response,"repos")===false) gotoLogin();



$_SESSION['user'] = array(
      'username' => $username,
);

$_SESSION['loggedin'] = true;

header('Location: data.php');

