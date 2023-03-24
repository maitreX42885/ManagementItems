<?php 
    date_default_timezone_set('Asia/Bangkok');   
    include('./connect.php');

    function lend($conn, $num, $all) {
        $err = array(); 
        // จำนวน
        foreach ($all as $key) {
            $toolID = $key['toolID'];
            $sql = "SELECT Tool.toolCount FROM Tool WHERE toolID=$toolID";
            $co = mysqli_query($conn, $sql);
            if ($co) {
                $asc = mysqli_fetch_assoc($co);
                if (isset($asc)) {
                    foreach ($asc as $ad) {
                        $sum = $ad - $key['toolCount'];
                        if ($sum < 0) {
                            array_push($err, 'Not_Enough');
                        }
                    }
                }  
            }
        }
        // status = จำนวนข้อมูล -> insert process
        if (count($err) == 0) {
            foreach ($all as $val) {
                $timeSp = time();
                $date = date("Y-m-d", $timeSp);
                $time = date("H:i:s", $timeSp);
                $toolC = $val['toolCount'];
                $toolID = $val['toolID'];
                $sql = "SELECT Tool.toolCount FROM Tool WHERE toolID=$toolID";

                $co = mysqli_query($conn, $sql);
                $asc = mysqli_fetch_assoc($co);
                if (isset($asc)) {
                    foreach ($asc as $ad) {
                        // 0 = false, 1 = true
                        $b = 0;
                        $sum = $ad - $val['toolCount'];
                        $sq = "INSERT INTO Borrow (studentID, toolID, bCount, bDate, bTime, bStatus) VALUES ('$num', '$toolID', '$toolC', '$date', '$time', '$b')";
                        $update = "UPDATE Tool SET toolCount='$sum' WHERE toolID='$toolID'";
                        if (!(mysqli_query($conn, $sq) && mysqli_query($conn, $update))) {
                            array_push($Status, 'Uploadfail');
                        }else {
                            echo "Success";
                        }
                    }
                }
            }
           
        } 
        // if err -> echo
        if (isset($err)) {
            foreach ($err as $ss) {
                echo $ss;
            }
        }
    }


    $num = $_POST['numStu'];
    $name = $_POST['nameStu'];
    $tel = $_POST['telStu'];
    $fac = $_POST['facStu'];
    $class = $_POST['classStu'];
    $ss = $_POST['all'];

    $all = json_decode($ss, true);
    
    $Qname = "SELECT Student.studentID FROM Student WHERE Student.studentID = '$num'";
    $Rname = mysqli_query($conn, $Qname);
    if (mysqli_num_rows($Rname) > 0) {
        lend($conn, $num, $all);
        exit;
    } else {
        $Cn = "INSERT INTO Student (studentID, studentName, studentPhone, studentClass, studentFaculty) VALUES ('$num', '$name', '$tel', '$class', '$fac')";
        if (mysqli_query($conn, $Cn)) {
            lend($conn, $num, $all);
            exit;
        }
    }

?>