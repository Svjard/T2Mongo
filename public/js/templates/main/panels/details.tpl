<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          Now that you have a specific campaign ID to investigate, you pull up that campaign information from the Teradata database to find out more about it. You immediately spot a problem. It appears the email sent does not fit the actual discount amount that was supposed to be applied or vice-versa. Now you have strong evidence to conclude that the Q2 drop in revenue was due to users abadoning transactions mid-stream after the discount code they applied to their order did not return the percentage off they were promised.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <textarea id="block1" style="height: 200px;">
SELECT b."name", b.description, CAST(CAST(b."start" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), CAST(CAST(b."end" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), a.code, a.amount
FROM "MyECommerce"."tdDiscount" a
JOIN "MyECommerce"."tdMarketingCampaign" b
ON a.campaignId = b.campaignId 
WHERE b.id = 32516;</textarea>
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