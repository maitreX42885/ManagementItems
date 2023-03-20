<?php 

   include('./connect.php');

    

    // $d = $_GET['test'];
    // Query the database
    $sql = "SELECT * FROM Tool";

    $result = $conn->query($sql);

    $data = array();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    mysqli_close($conn);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);


?>