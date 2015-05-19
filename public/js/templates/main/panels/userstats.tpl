<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          We first look at our some our website statistics to better understand if the drop in revenue may be attributed to a drop in website traffic or some user behavior trend that seems out of the ordinary compared to last quarter.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <code>
          SELECT
            CAST(month from created) as OrderMonth,
            COUNT (total),
            SUM (total) 
          FROM "MyECommerce"."tdOrder"
          WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-04-30'
          GROUP BY OrderMonth
          ORDER BY OrderMonth;
        </code>
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