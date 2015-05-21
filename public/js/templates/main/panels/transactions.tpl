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
        <pre>
SELECT OrderID, CustomerID, Order, DiscountCode, Total, Created
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete'
ORDER BY created ASC;
        </pre>
        <br>
        <pre>
SELECT b.name, b.description, b.start, b.end, a.code, a.amount
FROM "MyECommerce"."tdDiscount" a
JOIN "MyECommerce"."tdMarketingCampaign" b
ON a.campaignId = b.campaignId 
WHERE a.code = "qhubq";
        </pre>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Incomplete Transactions for Q2</h4>
        <div class="table-responsive">
          <table id="table-transactions" class="table table-striped table-hover table-condensed" style="height: 250px;overflow-y: auto;">
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
        
      </div>
    </div>
  </div>
</div>