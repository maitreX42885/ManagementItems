<?php 

    include('./connect.php');


    $sql = "DELETE FROM Borrow WHERE bStatus = 1;";

    if (mysqli_query($conn, $sql)) {
        echo "Success";
    } else {
        echo "Error";
    }



?>