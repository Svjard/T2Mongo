CREATE DATABASE "MyECommerce" FROM "DBC" AS
	PERMANENT = 3355443200,
	SPOOL = 1342177280,
	TEMPORARY = 268435456,
	ACCOUNT = 'DBC',
	NO FALLBACK,
	NO BEFORE JOURNAL,
	NO AFTER JOURNAL;
	
DROP TABLE "MyECommerce"."tdCategory";
DROP TABLE "MyECommerce"."tdCustomer";
DROP TABLE "MyECommerce"."tdDiscount";
DROP TABLE "MyECommerce"."tdMarketingCampaign";
DROP TABLE "MyECommerce"."tdOrder";
DROP TABLE "MyECommerce"."tdOrderItem";
DROP TABLE "MyECommerce"."tdProduct";
DROP TABLE "MyECommerce"."tdSKU";

CREATE TABLE "MyECommerce"."tdCategory"
(
  "categoryID" INTEGER NOT NULL,
  "code" VARCHAR(100) NOT NULL,
  "name" VARCHAR(255),
  "keywords" VARCHAR(255),
  "description" VARCHAR(4096),
  "isActive" SMALLINT NOT NULL,
  "image" VARCHAR(255),
  "extra1" VARCHAR(255),
  "extra2" VARCHAR(255),
  "extra3" VARCHAR(255),
  "parentCategory" INTEGER,
  "categoryOrder" INTEGER NOT NULL
)
UNIQUE PRIMARY INDEX("categoryID");

CREATE TABLE "MyECommerce"."tdCustomer"
(
  "customerID" INTEGER NOT NULL,
  "username" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "created" TIMESTAMP(6),
  "lastLogin" TIMESTAMP(6),
  "status" VARCHAR(50),
  "firstname" VARCHAR(255),
  "lastname" VARCHAR(255),
  "organization" VARCHAR(255),
  "address1" VARCHAR(255),
  "address2" VARCHAR(255),
  "city" VARCHAR(255),
  "state" VARCHAR(255),
  "zip" VARCHAR(255),
  "country" VARCHAR(255),
  "phonenumber1" VARCHAR(255),
  "phonenumber2" VARCHAR(255),
  "email" VARCHAR(255),
  "extra1" INTEGER,
  "extra2" VARCHAR(255),
  "extra3" VARCHAR(255)
)
UNIQUE PRIMARY INDEX("customerID");

CREATE TABLE "MyECommerce"."tdProduct"
(
  "productID" INTEGER NOT NULL,
  "code" VARCHAR(255),
  "name" VARCHAR(255),
  "keywords" VARCHAR(255),
  "description" VARCHAR(4096),
  "isTaxed" SMALLINT,
  "cost" FLOAT,
  "price" FLOAT,
  "retail" FLOAT,
  "weight" INTEGER,
  "isActive" VARCHAR(255),
  "image" VARCHAR(255),
  "extra1" INTEGER,
  "extra2" BIGINT,
  "extra3" VARCHAR(255),
  "extra4" VARCHAR(255),
  "extra5" VARCHAR(255),
  "categoryID" INTEGER,
  "order" INTEGER
)
UNIQUE PRIMARY INDEX("productID");

CREATE TABLE "MyECommerce"."tdSKU"
(
  "skuID" INTEGER NOT NULL,
  "productID" INTEGER NOT NULL,
  "sku" VARCHAR(255),
  "extra1" INTEGER,
  "extra2" BIGINT,
  "extra3" VARCHAR(255),
  "isActive" SMALLINT,
  "inventory" INTEGER,
  "notes" VARCHAR(255)
)
UNIQUE PRIMARY INDEX("skuID");

CREATE TABLE "MyECommerce"."tdMarketingCampaign"
(
  "campaignID" INTEGER NOT NULL,
  "name" VARCHAR(255),
  "description" VARCHAR(4096),
  "isActive" SMALLINT,
  "start" TIMESTAMP(6),
  "end" TIMESTAMP(6)
)
UNIQUE PRIMARY INDEX("campaignID");

CREATE TABLE "MyECommerce"."tdDiscount"
(
  "discountID" INTEGER NOT NULL,
  "campaignID" INTEGER NOT NULL,
  "code" VARCHAR(255),
  "amount" FLOAT
)
UNIQUE PRIMARY INDEX("discountID");

CREATE TABLE "MyECommerce"."tdOrderItem"
(
  "orderID" INTEGER NOT NULL,
  "productID" INTEGER NOT NULL,
  "qty" INTEGER
)
UNIQUE PRIMARY INDEX("orderID", "productID");

CREATE TABLE "MyECommerce"."tdOrder"
(
  "orderID" INTEGER NOT NULL,
  "customerID" INTEGER,
  "order" INTEGER,
  "discountCode" VARCHAR(255),
  "trackingCode" VARCHAR(255),
  "total" FLOAT,
  "shipping" FLOAT,
  "tax" FLOAT,
  "weight" FLOAT,
  "created" TIMESTAMP(6),
  "lastModified" TIMESTAMP(6),
  "completed" SMALLINT,
  "status" VARCHAR(255),
  "firstname" VARCHAR(255),
  "lastname" VARCHAR(255),
  "organization" VARCHAR(255),
  "address1" VARCHAR(255),
  "address2" VARCHAR(255),
  "city" VARCHAR(255),
  "state" VARCHAR(255),
  "zip" VARCHAR(255),
  "country" VARCHAR(255),
  "phonenumber1" VARCHAR(255),
  "phonenumber2" VARCHAR(255),
  "email" VARCHAR(255),
  "extra1" INTEGER,
  "extra2" BIGINT,
  "extra3" VARCHAR(255)
)
UNIQUE PRIMARY INDEX("orderID");


