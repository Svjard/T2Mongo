<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          You first look at some of the website statistics to better understand if the drop in revenue may be attributed to a drop in website traffic or some user behavior trend that seems out of the ordinary compared to last quarter. To do this we leverage the Query Grid's T2Mongo connector so that we can pass thru a native MongoDB query which is lets us qualify and project the data within our MongoDB cluster. The data is then sent in parallel back to Teradata where we can run standard SQL grammar against it.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <p>We run these queries in parallel to take adavantage of Teradata's massively parallel architecture. Note that we could also submit queries using MongoDB's aggregration framework to perform the aggregations but aggregrate queries must be in run in serial.</p>
        <textarea id="block1" class="cm-175">
SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  COUNT(*) AS "TotalHits"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate
ORDER BY TheDate ASC;</textarea>
        <br>
        <textarea id="block2" class="cm-175">
SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  COUNT(*) AS "BounceRate"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"sessionInfo": {$size: 1}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate
ORDER BY TheDate ASC;</textarea>
        <br>
        <textarea id="block3" class="cm-175">
SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  AVG(MongoData.JSONExtractValue('$..pageTime')) AS "AvgSessionTime"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {$ne: "127.0.0.1"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate
ORDER BY TheDate ASC;

t2mongo.perf.aggregate(
   [
      {
        $group : {
           _id : { $fdate },
           avg: { $avg: "$sessions.pageTime" }
        },
        {
          $match: { 
            user: {$ne: "127.0.0.1"},
            timestamp: { $gte: 1420070400000, $lte: 1433289599000 }
          }
        }
      }
   ]
)

</textarea>

      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-userstats">
      <div class="panel-body">
        <h4>User Hits</h4>
        <div id="user-hits-chart">
          
        </div>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-userstats">
      <div class="panel-body">
        <h4>Bounce Rate</h4>
        <div id="bounce-rate-chart">
          
        </div>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-userstats">
      <div class="panel-body">
        <h4>Avg. Session Time</h4>
        <div id="session-time-chart">
          
        </div>
      </div>
    </div>
  </div>
</div>