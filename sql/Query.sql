SELECT
TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) as OrderDate,
COUNT (*)
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02'
GROUP BY TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created))
ORDER BY OrderDate ASC;

SELECT
TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) as OrderDate,
SUM (total)
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02'
GROUP BY TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created))
ORDER BY OrderDate ASC;

SELECT
TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
COUNT(*) AS "TotalHits"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;

SELECT
TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
COUNT(*) AS "BounceRate"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"sessionInfo": {$size: 1}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;

SELECT
TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
AVG(MongoData."session") AS "AvgSessionTime"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {$ne: "127.0.0.1"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;

SELECT
TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
MongoData."page" AS "MyPage",
MIN(MongoData."ms") AS "MinPerf",
MAX(MongoData."ms") AS "MaxPerf",
AVG(MongoData."ms") AS "AvgPerf"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.perf.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate, MyPage ORDER BY TheDate ASC;

SELECT OrderID, CustomerID, "Order", DiscountCode, Total, CAST(CAST(Created AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50))
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete'
ORDER BY created ASC;

SELECT b.name, b.description, b.start, b.end, a.code, a.amount
FROM "MyECommerce"."tdDiscount" a
JOIN "MyECommerce"."tdMarketingCampaign" b
ON a.campaignId = b.campaignId 
WHERE a.code = "qhubq";

SELECT COUNT(*), CAST(MongoData.referrer AS VARCHAR(255)) FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {"$regex": "^[0-9]+$"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T  
JOIN "MyECommerce"."tdOrder" 
ON created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete' AND CAST(MongoData."user" AS INTEGER) = customerId
GROUP BY MongoData.referrer;