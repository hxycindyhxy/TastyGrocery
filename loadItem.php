<?php
$mysqli = new mysqli("awseb-e-wrrrmaqvyv-stack-awsebrdsdatabase-gnigfqsjbf4p.csdsovegklw9.us-east-1.rds.amazonaws.com", "uts", "1234554321", "uts");
if ($mysqli->connect_error) {
    exit('Could not connect');
}

$sql = "SELECT ItemName, Unit, UnitPrice, StockNumber, ImagePath, ItemSubType.SubTypeName, ItemType.TypeName FROM Item
        INNER JOIN ItemSubType ON Item.SubTypeID = ItemSubType.SubTypeID
        INNER JOIN ItemType ON ItemSubType.TypeID = ItemType.TypeID";


$conditions = [];
$params = [];
$types = ""; 


if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search = strtolower(trim($_GET['search']));
    $conditions[] = "LOWER(Item.ItemName) LIKE ?";
    $params[] = "%$search%";
    $types .= "s";
}

if (isset($_GET['category']) && !empty($_GET['category'])) {
    $category = $_GET['category'];
    $conditions[] = "ItemType.TypeName = ?";
    $params[] = $category;
    $types .= "s";
}

if (isset($_GET['subtype']) && !empty($_GET['subtype'])) {
    $subtype = $_GET['subtype'];
    $conditions[] = "ItemSubType.SubTypeName = ?";
    $params[] = $subtype;
    $types .= "s";
}

if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}


$stmt = $mysqli->prepare($sql);


if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$stmt->store_result();
$stmt->bind_result($name, $unit, $price, $stockNumber, $imagePath, $subTypeName, $typeName);


while ($stmt->fetch()) {
    $stockStatus = $stockNumber > 0 ? "In Stock" : "Out of Stock";
    $disabled = $stockNumber > 0 ? "" : "disabled";
    // $buttonClass = $stockNumber > 0 ? "add-button" : "add-button-disabled";
    
    
    echo '
    <div class="grid-item">
        <div class="image-container">
            <img src="' . htmlspecialchars($imagePath) . '" alt="' . htmlspecialchars($name) . '">
        </div>
        <div class="item-details">
            <div class="item-name">' . htmlspecialchars($name) . '</div>
            <div class="item-price">$' . number_format($price, 2) . '</div>
            <div class="item-unit">' . htmlspecialchars($unit) . '</div>
            <div class="item-stock-status" data-name="' . htmlspecialchars($name) . '">' . $stockStatus . '</div>
            <button class="add-button" ' . $disabled . '
                data-name="' . htmlspecialchars($name) . '"
                data-price="' . $price . '"
                data-unit="' . htmlspecialchars($unit) . '"
                data-image="' . htmlspecialchars($imagePath) . '"
                data-stockNumber="' . $stockNumber .'">
                Add&nbsp;&nbsp;+
            </button>
        </div>
    </div>';
}

$stmt->close();
$mysqli->close();
?>