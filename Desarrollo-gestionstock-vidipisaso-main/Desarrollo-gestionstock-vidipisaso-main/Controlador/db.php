<?php


$servername = "localhost";
$username = "root";
$password = "";$db="stvent";

try {
	$conn = new PDO("mysql:host=$servername;dbname=".$db, $username, $password);
    // set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    

}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}





function Escribir($query,$conn=null){
    if(!$conn )global $conn;

    $stmt= $conn->prepare($query);
    $stmt->execute();
    return  $stmt->rowCount();

}


function Leer($query,$conn=null){
    if(!$conn )global $conn;
        $statement = $conn->prepare($query);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $results;

}

function getConnection()
{
    global $conn;
    return $conn;
}



?>