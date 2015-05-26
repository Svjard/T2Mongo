<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Overview</h4>
        <p>
          Now that you have identified the likely problem you can put together your proposal for the the CFO to re-engage lost customers and help propel Q2 revenue to meet expectations. First you decide to import the data from MongoDB about all the existing customers who got to the website by clicking on the campaign email. Now that this user information is stored in a new table in the Teradata database, you proceed to come up with a proposal to present on Friday.
        </p>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Query Set</h4>
        <textarea id="block1" class="cm-400">
        CREATE TABLE "MyECommerce"."tdLostCustomers"
        (
          UserID INTEGER,
          JData JSON(1600000),
          OrderStatus VARCHAR(255) 
        );

        INSERT INTO "MyECommerce"."tdLostCustomers"
          SELECT
            CAST(MongoData."user" AS INTEGER),
            MongoData,
            orders.status
          FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({"user": {"$regex": "^[0-9]+$"}, "timestamp": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T
          JOIN "MyECommerce"."tdOrder" orders
            ON orders.created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' 
            AND CAST(MongoData."user" AS INTEGER) = orders.customerId;
        </textarea>
      </div>
    </div>
  </div>
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-body">
        <h4>Proposal</h4>
        <p>
        We can re-engage those customers who came to the website via the marketing campaign email and did not complete their order with a new 50% off campaign. For those who customers who came to the website via the marketing campaign email and did complete their order we can include them in the new 60% off campaign and provide a the most browsed item among them as a free giveaway with their order.
        </p>
        <textarea id="block2" class="cm-150">
        SELECT UserID 
        FROM "MyECommerce"."tdLostCustomers"
        WHERE OrderStatus = 'incomplete';
        </textarea>
        <textarea id="block3" class="cm-200">
        SELECT UserID
        FROM "MyECommerce"."tdLostCustomers"
        WHERE OrderStatus = 'completed';
        
        SELECT JData.JSONExtractValue("$..page") AS "TheItem", prd.name, COUNT(*) AS "ItemCount" 
        FROM "MyECommerce"."tdLostCustomers"
        WHERE OrderStatus = 'completed' AND JData.JSONExtractValue("$..page") LIKE '%item%'
        JOIN "MyECommerce"."tdProduct" prd
          ON productID = SUBSTRING (TheItem FROM 6 FOR 10)
        GROUP BY TheItem 
        ORDER BY ItemCount DESC;
        </textarea>
      </div>
    </div>
  </div>
</div>