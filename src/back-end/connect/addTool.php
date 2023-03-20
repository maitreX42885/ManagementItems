<?php 

    include('./connect.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $des = $_POST['Des'];
    $count = $_POST['count'];
    // $file = $_POST['file'];

    $target_dir = 'uploads/';
    $target_file = $target_dir . basename($_FILES['file']['name']);
    $uploadStatus = 0;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


    $sqlQ = "SELECT toolID FROM Tool WHERE toolID='$id'";
    $sa = mysqli_query($conn, $sqlQ);
    if (mysqli_num_rows($sa) == 0) {
        
        if (isset($_POST['submit'])) {
            $check = getimagesize($_FILES['file']['tmp_name']);
            if ($check !== false) {
                // echo "File is an image - ". $check['mine'] . ".";
                $uploadStatus = 1;
                if (file_exists($target_file)) {
                    echo "ไฟล์นี้มีอยู่แล้ว";
                    $uploadOk = 0;
                }
                // 500kb
                if ($_FILES['file']['size'] > 500000) {
                    echo "ไฟล์มีขนาดใหญ่เกินไป ต้องมีขนาดน้อยกว่า500kb.";
                    $uploadStatus = 0;
                }
                    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {
                    echo "Sorry, only JPG, JPEG, PNG files are allowed.";
                    $uploadStatus = 0;
                }
    
            } else {
                echo "File is not an image.";
                $uploadStatus = 0;
            }
        }
        
        if ($uploadStatus == 0) {
            echo "File is not upload";
            // echo json_encode("Error", JSON_UNESCAPED_UNICODE);
        } else {
            $nn = basename($_FILES['file']['name']);
            $sql = "INSERT INTO Tool (toolID, toolName, toolDes, toolCount, toolPhoto) VALUES ($id, '$name', '$des', $count, '$nn')";
            if (mysqli_query($conn, $sql)) {
                // echo "<script>alert('เพิ่มข้อมูลสำเร็จ')</script>";
                if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
                    // echo "The file ". htmlspecialchars( basename( $_FILES["file"]["name"])). " has been uploaded.";
                    header('Location: https://napapronlab1.000webhostapp.com/');
                } else {
                    echo 'error between uploading your file';
                }
            } else {
                echo mysqli_error($conn);
            }
        }
    } else {
        echo "<script>alert('Id นี้มีอยู่แล้ว')</script>";
        
    }

  

  
    

    mysqli_close($conn);
?>