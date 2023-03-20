<?php 

    $servername = 'www.db4free.net';
    $username = 'admin63413654';
    $password = '123456789';
    $dbname  = 'admin63413654';

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
?>