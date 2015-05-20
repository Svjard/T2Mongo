<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          Next we look the website performance data that is being streamed to our MongoDB instance and see if a potential problem with the website may be attributing to our drop in revenue.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <pre>
SELECT
  CAST(month from created) as OrderMonth,
  COUNT (total),
  SUM (total) 
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-04-30'
GROUP BY OrderMonth
ORDER BY OrderMonth;
        </pre>
      </div>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>User Hits</h4>
        <div id="user-hits-chart">
          
        </div>
      </div>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Bounce Rate</h4>
        <div id="bounce-rate-chart">
          
        </div>
      </div>
    </div>
  </div>
  <div class="col-xs-6">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Avg. Session Time</h4>
        <div id="session-time-chart">
          
        </div>
      </div>
    </div>
  </div>
</div>