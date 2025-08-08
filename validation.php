<?php
$mysqli = new mysqli("awseb-e-wrrrmaqvyv-stack-awsebrdsdatabase-gnigfqsjbf4p.csdsovegklw9.us-east-1.rds.amazonaws.com", "uts", "1234554321", "uts");
if ($mysqli->connect_error) {
    exit('Could not connect');
};

$sql = "SELECT ItemName, StockNumber FROM Item";

$stmt = $mysqli->prepare($sql);

$stmt->execute();
$stmt->store_result();
$stmt->bind_result($name, $stockNumber);

$data = [];

while ($stmt->fetch()) {
    $data[] = [
        "Name" => $name,
        "StockNumber" => $stockNumber
    ];
};


echo json_encode($data);

$stmt->close();
$mysqli->close();
?>