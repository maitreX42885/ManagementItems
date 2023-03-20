<?php  


    include('./connect.php');


    $data = $_GET['data'];
    $id = $_GET['id'];
    $sql = "UPDATE Tool SET toolName='$data' WHERE toolID='$id'";

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Rename successfully')</script>";
    } else {
        $s = mysqli_error($conn);
        echo "<script>alert(`Fail, $s`)</script>";
    }



?>