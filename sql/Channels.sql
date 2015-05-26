SELECT
  COUNT(*),
  CAST(MongoData.referrer AS VARCHAR(255))
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {"$regex": "^[0-9]+$"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T 
JOIN "MyECommerce"."tdOrder"
  ON created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' 
  AND status = 'incomplete'
  AND CAST(MongoData."user" AS INTEGER) = customerId
GROUP BY MongoData.referrer;