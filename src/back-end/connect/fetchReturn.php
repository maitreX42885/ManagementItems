<?php 

    include('./connect.php');
    
    $sq1 = "SELECT Borrow.*, Tool.toolPhoto, Student.studentName, Tool.toolName FROM Borrow JOIN Tool ON Tool.toolID=Borrow.toolID JOIN Student ON Student.studentID=Borrow.studentID WHERE Borrow.bStatus = 0 ";
    $result = $conn->query($sq1);

    $rest = array();
    while($result2 = $result->fetch_assoc())  
    { 
        $r = array("bID"=>$result2['bID'], 
            "studentID"=>$result2['studentID'], 
            "toolName"=>$result2['toolName'],
            "bCount"=>$result2['bCount'],
            "bDate"=>$result2['bDate'],
            "bTime"=>$result2['bTime'],
            "toolPhoto"=>$result2['toolPhoto'],
            "studentName"=>$result2['studentName'],
            
        );
        array_push($rest, $r);
    }
    echo json_encode($rest, JSON_UNESCAPED_UNICODE);
 
?>