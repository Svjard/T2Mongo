<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          So far you haven't found any clear problem so you look at all the transactions for Q2 which were not completed and try to identify a pattern in them. You noticed a certain discount code is coming up quite often and a discount code indicates a marketing campaign was initiated.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <textarea id="block1">
SELECT OrderID, CustomerID, Order, DiscountCode, Total, CAST(CAST(Created AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50))
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete'
ORDER BY created ASC;</textarea>
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
</div>