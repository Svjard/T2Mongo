SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  COUNT(*) AS "TotalHits"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate
ORDER BY TheDate ASC;

SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  COUNT(*) AS "BounceRate"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({$and: [{"sessionInfo": {$size: 1}}, {"sessionInfo.page": {$in: ["/home","/login","/register"]}}], "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate
ORDER BY TheDate ASC;

SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  AVG(MongoData.JSONExtractValue('$.sessionInfo[0].pageTime')) AS "AvgSessionTime"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {$ne: "127.0.0.1"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate
ORDER BY TheDate ASC;