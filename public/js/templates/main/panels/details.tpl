<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          We noticed a certain discount code is coming up quite often in the incomplete transactions so we JOIN against our current marketing campaigns to find out more about it. It appears the email sent does not fit the actual discount amount that was supposed to be applied or vice-versa.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
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