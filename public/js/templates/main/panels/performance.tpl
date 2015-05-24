<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          The next place you look is at the website performance data that is being streamed to our MongoDB instance. This data contains various performance metrics that get logged against every URL call. You look to see if a potential problem with the website/servers may be attributing to our drop in revenue this quarter.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <p>We run these queries in parallel to take adavantage of Teradata's massively parallel architecture. Note that we could also submit queries using MongoDB's aggregration framework to perform the aggregations but aggregrate queries must be in run in serial.</p>
        <textarea id="block1" class="cm-225">
SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  MongoData."page" AS "ThePage",
  MIN(MongoData.ms) AS "MinPerf",
  MAX(MongoData.ms) AS "MaxPerf",
  AVG(MongoData.ms) AS "AvgPerf",
  COUNT(*) AS "HitRate" 
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.perf.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
GROUP BY TheDate, The Page
ORDER BY ThePage ASC, TheDate ASC;</textarea>

        <textarea id="block2" class="cm-250">
t2mongo.perf.aggregate(
   [
      {
        $group : {
           _id : { $fdate, $page },
           min: { $min: $ms },
           max: { $max: "$ms" },
           avg: { $avg: "$ms" },
           count: { $sum: 1 }
        },
        {
          $match: { 
            timestamp: { $gte: 1420070400000, $lte: 1433289599000 }
          }
        }
      }
   ]
)</textarea>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-performance">
      <div class="panel-body">
        <h4>Website Performance</h4>
        <p>
          <select id="pages-dropdown" class="form-control"> 
          </select>
        </p>
        <div id="performance-chart">
          
        </div>
      </div>
    </div>
  </div>
</div>