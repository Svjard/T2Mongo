<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          We can forecast what our current sales will look like by the end of Q2 by using Teradata's integration
          with R. There are a couple methods that can be used and both will run the R functions in parallel across
          every parallel unit on Teradata.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <textarea id="block1" class="cm-225">
# We must first install our script so Teradata can recognize it and set the search path for our
# session. 
CALL SYSUIF.INSTALL_FILE('forecast', 'forecast.py','cz!/root/forecast.py');
SET SESSION SEARCHUIFDBPATH = dr_forecast; 

# Finally we can run our script which leverages stdin and stdout.
SELECT * FROM SCRIPT
( ON (SELECT
    TRIM(EXTRACT(month from created)) AS "OrderDNum",
    SUM (total),
    3 -- number of values to predict into the future
  FROM "MyECommerce"."tdOrder"
  WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02'
  GROUP BY TRIM(EXTRACT(month from created))
  ORDER BY OrderDNum ASC)
SCRIPT_COMMAND('python ./dr_forecast/forecast.py')
RETURNS ('fdate VARCHAR(30)', 'predicted_value FLOAT')
DELIMITER(':')
);</textarea>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin panel-quarterly">
      <div class="panel-body">
        <h4>Forecasted Q2 Revenue</h4>
        <div id="forcaste-revenue-chart">
          
        </div>
      </div>
    </div>
  </div>
</div>