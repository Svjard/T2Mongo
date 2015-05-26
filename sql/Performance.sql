SELECT TOP 250 
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  MongoData."page" AS "ThePage",
  COUNT(*) AS "PageHits",
  MIN(MongoData.ms) AS "MinPerf",
  MAX(MongoData.ms) AS "MaxPerf",
  AVG(MongoData.ms) AS "AvgPerf", 
  STDDEV_POP(MongoData.ms) AS "StdDev" 
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.perf.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate, The Page
ORDER BY ThePage ASC, TheDate ASC;