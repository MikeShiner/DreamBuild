<?php

if (isset($_POST["infoJSON"])){
	$jsonDump = json_decode($_POST["infoJSON"]);
  foreach($jsonDump as $key => $value) {
    $obj[$key] = $value;
  }
} else {
	echo "No!";
}

// print_r($jsonDump);
// echo $obj['enquiry'];

mail("shinerscyther@googlemail.com", "Website interest: " + $obj['fullName'], "Message: \n" +$obj['enquiry']);
?>