<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          Next we look the website performance data that is being streamed to our MongoDB instance and see if a potential problem with the website/servers may be attributing to our drop in revenue.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <p>We run these queries in parallel to take adavantage of Teradata's massively parallel architecture. Note that we could also submit queries using MongoDB's aggregration framework to perform some the aggregration queries if we want.</p>
        <code>
        <pre>
SELECT
  TRIM(CAST(MongoData."fdate" AS VARCHAR(50))) AS "TheDate",
  MIN(ms) AS "MinPerf",
  MAX(ms) AS "MaxPerf",
  AVG(ms) AS "AvgPerf"
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.perf.find({"timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;
        </pre>
        </code>
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