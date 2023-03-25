<?php 

    include('./connect.php');


    $sql = "SELECT Borrow.bCount, Borrow.bDate, Borrow.bTime, Borrow.returnDate, Borrow.returnTime, Tool.toolName, Student.* FROM Borrow JOIN Tool ON Borrow.toolID=Tool.toolID JOIN Student ON Student.studentID = Borrow.studentID WHERE Borrow.bStatus=1";
    $result = $conn->query($sql);
    $arr = array();
    while($result2 = $result->fetch_assoc()) {
        array_push($arr, $result2);
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);


?>