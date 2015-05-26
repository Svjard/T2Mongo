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
        <p>We take advantage of the built-in functions within Teradata to perform operations otherwise impossible to do directly inside MongoDB.</p>
        <textarea id="block1" class="cm-225">
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
ORDER BY ThePage ASC, TheDate ASC;</textarea>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-performance">
      <div class="panel-body">
        <h4>Website Performance</h4>
        <div class="table-responsive" style="height: 250px;">
          <table id="table-performance" class="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                <th>TheDate</th>
                <th>Page</th>
                <th>Page Hits</th>
                <th>Min (ms)</th>
                <th>Max (ms)</th>
                <th>Avg (ms)</th>
                <th>Std. Dev.</th>
              </tr>
            </thead>
            <tbody>
              

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-performance">
      <div class="panel-body">
        <h4>Actions Performance</h4>
        <div class="table-responsive" style="height: 250px;">
          <table id="table-transactions" class="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                <th>TheDate</th>
                <th>Page</th>
                <th>Page Hits</th>
                <th>Min (ms)</th>
                <th>Max (ms)</th>
                <th>Avg (ms)</th>
                <th>Std. Dev.</th>
              </tr>
            </thead>
            <tbody>
              

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>