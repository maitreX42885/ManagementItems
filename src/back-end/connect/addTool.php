<?php 

    include('./connect.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $des = $_POST['Des'];
    $count = $_POST['count'];

    $target_dir = 'uploads/';

    $filename = $_FILES['file']['name'];
    $tempname = $_FILES['file']['tmp_name'];

    $target_file = $target_dir . $filename;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


    $sqlQ = "SELECT toolID FROM Tool WHERE toolID='$id'";
    $sa = mysqli_query($conn, $sqlQ);
    if (mysqli_num_rows($sa) == 0) {
              
        if (file_exists($target_file)) {
            $filename = time() . '_' . $filename;
        }
        
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {
            echo "type";
            http_response_code(404);
            exit;
        }
        if ($_FILES['file']['size'] > 1000000) {
            echo "large";
            http_response_code(404);
            exit;
        }
        
        $nn = basename($_FILES['file']['name']);
        $sql = "INSERT INTO Tool (toolID, toolName, toolDes, toolCount, toolPhoto) VALUES ($id, '$name', '$des', $count, '$nn')";
        if (mysqli_query($conn, $sql)) {
            if (move_uploaded_file($tempname, $target_dir.$filename)) {
                echo "ok";
                http_response_code(200);
                exit;
            } else {
                echo 'move';
                http_response_code(404);
                exit;
            }
        } else {
            echo mysqli_error($conn);
            http_response_code(404);
            exit;
        }
        
    } else {
        echo "id";
        http_response_code(404);
        exit;
    }

?>