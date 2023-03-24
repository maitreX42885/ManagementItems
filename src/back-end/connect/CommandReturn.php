<?php 
    date_default_timezone_set('Asia/Bangkok');   
    include('./connect.php');

    $id = $_POST['id'];

    $sq1 = "SELECT * FROM Borrow WHERE Borrow.bID = '$id'";
    $re1 = mysqli_query($conn, $sq1);

    $rr1 = mysqli_fetch_assoc($re1);
    
    if (isset($rr1['bID'])) {
        $id = $rr1['bID'];
        $timeSp = time();
        $date = date("Y-m-d", $timeSp);
        $time = date("H:i:s", $timeSp);
        $status = 1;
        //1 = True, 0 = False

        // fetch idTool, จำนวนอุปกรณ์ของคนยืม
        $temp1 = "SELECT toolID, bCount FROM Borrow WHERE bID='$id'";
        $tt = mysqli_fetch_assoc(mysqli_query($conn, $temp1));
        $tID = $tt['toolID'];

        // fetch จำนวนอุปกรณ์
        $fcount = "SELECT toolCount FROM Tool WHERE toolID='$tID'";
        $rrCount = mysqli_fetch_assoc(mysqli_query($conn, $fcount));

        // refill Count Tool นำค่าที่ fetch มารวมเพื่อรอไป update;
        $sum = $rrCount['toolCount'] + $tt['bCount'];

        // update Status etc. คนยืม
        $sql = "UPDATE Borrow SET bStatus='$status', returnDate='$date', returnTime='$time' WHERE bID='$id'";
        // update toolCount in Table Tool
        $sql2 = "UPDATE Tool SET toolCount='$sum' WHERE toolID='$tID'";
        // $co = mysqli_query($conn, $sql);

        if (mysqli_query($conn, $sql) && mysqli_query($conn, $sql2)) {
            echo "Success";
        } else {
            echo "Error";
        }

    } else {
        echo "ไม่พบข้อมูล";
    }




?>