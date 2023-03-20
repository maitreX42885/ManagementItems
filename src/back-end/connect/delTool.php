<?php 

    include('./connect.php');

    $d = $_GET['data'];

    $sql = "DELETE FROM Tool WHERE toolID='$d'";

    // Execute the SQL query
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Record deleted successfully')</script>";
        mysqli_close($conn);
    } else {
        echo "Error deleting record: " . mysqli_error($conn);
        mysqli_close($conn);
    }

    // Close the database connection
    


?>