CREATE DATABASE uts;
use uts;

DROP TABLE IF EXISTS Item CASCADE;
DROP TABLE IF EXISTS ItemType CASCADE;
DROP TABLE IF EXISTS ItemSubType CASCADE;

CREATE TABLE ItemType (
    TypeID INT PRIMARY KEY,
    TypeName VARCHAR(100)
);

CREATE TABLE ItemSubType (
    SubTypeID INT PRIMARY KEY,
    SubTypeName VARCHAR(100),
    TypeID INT,
    FOREIGN KEY (TypeID) REFERENCES ItemType(TypeID)
);

CREATE TABLE Item (
    ItemID INT PRIMARY KEY,
    SubTypeID INT,
    ItemName VARCHAR(100),
    Unit VARCHAR(100),
    UnitPrice DECIMAL(10,2),
    StockNumber INT,
    ImagePath VARCHAR(255),
    FOREIGN KEY (SubTypeID) REFERENCES ItemSubType(SubTypeID)
);

INSERT INTO ItemType VALUES (01, 'fresh');
INSERT INTO ItemType VALUES (02, 'diary');
INSERT INTO ItemType VALUES (03, 'beverages');
INSERT INTO ItemType VALUES (04, 'snacks');
INSERT INTO ItemType VALUES (05, 'home');

INSERT INTO ItemSubType VALUES (001, 'fruits', 01);
INSERT INTO ItemSubType VALUES (002, 'vegetables', 01);
INSERT INTO ItemSubType VALUES (003, 'milk', 02);
INSERT INTO ItemSubType VALUES (004, 'yogurt', 02);
INSERT INTO ItemSubType VALUES (005, 'water', 03);
INSERT INTO ItemSubType VALUES (006, 'soda', 03);
INSERT INTO ItemSubType VALUES (007, 'cookies', 04);
INSERT INTO ItemSubType VALUES (008, 'chips', 04);
INSERT INTO ItemSubType VALUES (009, 'dining', 05);
INSERT INTO ItemSubType VALUES (010, 'bath', 05);

INSERT INTO Item VALUES (1001, 001, 'Pink Lady Apples', '1kg bag', 4.50, 0, 'img/pink-lady-apples.png');
INSERT INTO Item VALUES (1002, 001, 'Bananas', 'per kg', 3.20, 0, 'img/bananas.png');
INSERT INTO Item VALUES (1003, 002, 'Carrots', '1kg bag', 2.00, 0, 'img/carrots.png');
INSERT INTO Item VALUES (1004, 002, 'Broccoli', 'each', 2.50, 75, 'img/broccoli.png');
INSERT INTO Item VALUES (1005, 003, 'Full Cream Milk', '2L bottle', 3.10, 200, 'img/full-cream-milk.png');
INSERT INTO Item VALUES (1006, 003, 'Almond Milk', '1L carton', 2.80, 90, 'img/almond-milk.png');
INSERT INTO Item VALUES (1007, 004, 'Greek Yogurt', '1kg tub', 5.00, 0, 'img/greek-yogurt.png');
INSERT INTO Item VALUES (1008, 004, 'Strawberry Yogurt', '150g cup', 1.50, 100, 'img/strawberry-yogurt.png');
INSERT INTO Item VALUES (1009, 005, 'Mount Franklin Water', '600ml bottle', 1.00, 10, 'img/mount-franklin-water.png');
INSERT INTO Item VALUES (1010, 005, 'Sparkling Mineral Water', '1.25L bottle', 1.50, 140, 'img/sparkling-mineral-water.png');
INSERT INTO Item VALUES (1011, 006, 'Coca-Cola Classic', '1.25L bottle', 2.25, 220, 'img/coca-cola-classic.png');
INSERT INTO Item VALUES (1012, 006, 'Sprite Lemonade', '1.25L bottle', 2.25, 180, 'img/sprite-lemonade.png');
INSERT INTO Item VALUES (1013, 007, 'Tim Tam Original', '200g pack', 3.60, 95, 'img/tim-tam-original.png');
INSERT INTO Item VALUES (1014, 007, 'Oreo Cookies', '133g pack', 2.00, 120, 'img/oreo-cookies.png');
INSERT INTO Item VALUES (1015, 008, 'Smith’s Crinkle Cut Chips', '170g pack', 3.00, 130, 'img/smiths-crinkle-cut-chips.png');
INSERT INTO Item VALUES (1016, 008, 'Doritos Corn Chips', '170g pack', 3.00, 125, 'img/doritos-corn-chips.png');
INSERT INTO Item VALUES (1017, 009, 'Paper Plates', '20 pack', 3.50, 50, 'img/paper-plates.png');
INSERT INTO Item VALUES (1018, 009, 'Plastic Cutlery Set', '24 pack', 2.75, 60, 'img/plastic-cutlery-set.png');
INSERT INTO Item VALUES (1019, 010, 'Toilet Paper', '6 rolls', 6.00, 110, 'img/toilet-paper.png');
INSERT INTO Item VALUES (1020, 010, 'Shampoo', '350ml bottle', 4.80, 70, 'img/shampoo.png');
