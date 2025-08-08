<?php
header('Content-Type: application/json');

$mysqli = new mysqli("awseb-e-wrrrmaqvyv-stack-awsebrdsdatabase-gnigfqsjbf4p.csdsovegklw9.us-east-1.rds.amazonaws.com", "uts", "1234554321", "uts");
if ($mysqli->connect_error) {
    exit('Could not connect');
};

$data = json_decode(file_get_contents('php://input'), true);
$cart = $data['cart'];

$mysqli->begin_transaction();

try {
  foreach ($cart as $item) {
    $productName = array_keys($item)[0];
    $quantity = $item[$productName];
    
    $stmt = $mysqli->prepare("UPDATE Item 
            SET StockNumber = StockNumber - ? 
            WHERE ItemName = ?");
    $stmt->bind_param("is", $quantity, $productName);
    $stmt->execute();
  }
  $mysqli->commit();
  echo json_encode(['success' => true]);
} catch (error) {
      alert('Error:', error);
}

$stmt->close();
$mysqli->close();
?>