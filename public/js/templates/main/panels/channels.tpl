<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          So far we haven't found any clear problem so we look at all the transactions for Q2 which were not completed and try to identify a pattern in them.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <code>
          "SELECT COUNT(*), CAST(MongoData.referrer AS VARCHAR(255)) " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"user\": {\"$regex\": \"^[0-9]+$\"}, \"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T " +
        "JOIN \"MyECommerce\".\"tdOrder\", " +
        "ON created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete' AND CAST(MongoData.\"user\" AS INTEGER) = customerId " +
        "GROUP BY MongoData.referrer;";
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <table>


        </table>
      </div>
    </div>
  </div>


</div>