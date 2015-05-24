<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          Now that you have a clue, you dig deeper by <b>joining</b> the user IDs from the incomplete transactions with our user behavior data stored in MongoDB. Because the "user" field in our MongoDB documents can contain either an IP address or an actual existing customer ID, we use the T2Mongo push down capability to extend the query to only return documents where the "user" field an existing customer ID via the <b>$regex</b> operator in MongoDB. You notice a lot of these users came through an email channel with the specific campaign ID.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <textarea id="block1" class="cm-225">
SELECT
  COUNT(*),
  CAST(MongoData.referrer AS VARCHAR(255))
FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {"$regex": "^[0-9]+$"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T 
JOIN "MyECommerce"."tdOrder"
  ON created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' 
  AND status = 'incomplete'
  AND CAST(MongoData."user" AS INTEGER) = customerId
GROUP BY MongoData.referrer;</textarea>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <div class="table-responsive" style="height: 250px;">
          <table id="table-channels" class="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                <th>Referrer</th>
                <th>User Count</th>
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