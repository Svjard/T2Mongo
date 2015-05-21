<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          So far we haven't found any clear problem so we look at all the transactions for Q2 which were not completed and try to identify a pattern in them. We noticed a certain discount code is coming up quite often so we JOIN against our current marketing campaigns to find out more about it. It appears the email sent does not fit the actual discount amount that was supposed to be applied or vice-versa.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <pre>
SELECT OrderID, CustomerID, Order, DiscountCode, Total, CAST(CAST(Created AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50))
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete'
ORDER BY created ASC;
        </pre>
        <br>
        <pre>
SELECT b."name", b.description, CAST(CAST(b."start" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), CAST(CAST(b."end" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), a.code, a.amount
FROM "MyECommerce"."tdDiscount" a
JOIN "MyECommerce"."tdMarketingCampaign" b
ON a.campaignId = b.campaignId 
WHERE a.code = 'qhubq';
        </pre>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Incomplete Transactions for Q2</h4>
        <div class="table-responsive" style="height: 250px;">
          <table id="table-transactions" class="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Order #</th>
                <th>Discount Code</th>
                <th>Total</th>
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
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Marketing Campaign Information</h4>
        <div class="table-responsive" style="height: 250px;">
          <table id="table-discounts" class="table table-striped table-hover table-condensed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Discount Code</th>
                <th>Discount %</th>
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