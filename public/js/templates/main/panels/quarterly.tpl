<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          The CFO of TeradataLovesDogs.com has been monitoring quarterly revenue via their real-time dashboard. They notice Q2 revenue for 2015 does not appear as promising as expected and far below what was seen in Q1. They ask you, one of the financial analysts, to dig deeper into the data, find out what is wrong and present them with proposals to remedy the situation by Friday afternoon. 
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
            EXTRACT(month from created) as OrderMonth,
            COUNT (total),
            SUM (total),
          FROM "MyECommerce"."tdOrder"
          WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-04-30'
          GROUP BY OrderMonth;
        </code>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Quarterly Revenue</h4>
        <div id="quarterly-chart">
          
        </div>
      </div>
    </div>
  </div>
</div>