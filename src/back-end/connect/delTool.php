<?php 

    include('./connect.php');

    $d = $_GET['data'];
    // $photo = "SELECT toolPhoto FROM Tool WHERE toolID='$d'";
    $sql = "DELETE FROM Tool WHERE toolID='$d'";

    if (mysqli_query($conn, $sql)) {
        http_response_code(200);
        mysqli_close($conn);
    } else {
        http_response_code(404);
        mysqli_close($conn);
    }


    // $aa = $conn->query($photo);

    // $data = array();
    // while ($row = $aa->fetch_assoc()) {
    // $data[] = $row;
    // }

    // if (count($data) > 0) {
    //     $f_name = $data[0]['toolPhoto'];
    //     $file_path = "/back-end/connect/uploads/$f_name";
    //     if (file_exists($file_path)) {
    //         unlink($file_path);
    //     }

    //     if (mysqli_query($conn, $sql)) {
    //         http_response_code(200);
    //         mysqli_close($conn);
    //     } else {
    //         http_response_code(404);
    //         mysqli_close($conn);
    //     }
    // }else {
    //     http_response_code(404);
    // }




    


?>