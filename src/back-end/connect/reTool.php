<?php  


    include('./connect.php');


    
    $id = $_GET['id'];
    $name = $_GET['name'];
    $des = $_GET['des'];
    $count = $_GET['count'];

    $sql = "UPDATE Tool SET toolName='$name', toolDes='$des', toolCount='$count' WHERE toolID='$id'";

    if (mysqli_query($conn, $sql)) {
        http_response_code(200);
    } else {
        http_response_code(404);
    }

    mysqli_close($conn);


?>