T2Mongo Demo
============

This demo is designed to showcase a real-world scenario where using the Mongo Connector in Teradata's
Query Grid can provide analytics in an ad-hoc fashion that provides immediate data value to a
business.

### How to setup the demo

1. First you need to get a Teradata Express VM.
2. Add the VM to VM Player and launch the VM
3. Once the VM has booted up open a console window. Run the command `netstat -r`. Find the *default* IP listed. Open /etc/resolv.conf as superuser. Change the nameserver entry to the default IP.
[Show Screenshot]
4. Next we need to install R on the VM. Go to http:// and download the latest source.
5. `tar -zxvf r....tar.gz`
6. cd ...
7. `./configure`
8. `./make`
9. `./install`
10. Load our data.
10. Next we need to create a new VM in VM Player.
11. Install Debian 7.x using the netinst ISO.
12. Once you have completed the installation we need to install Mongo. Go to and download the latest.
13. Setup sudo for this user.
13. `mkdir --parent /data/db`
14. `cd mongo/bin`
15. `sudo ./mongod --dbpath=/data/db`
15. `sudo apt-get install git`
16. Load our data.
17. Launch our Rest Server after install Java 1.7.
18. On the Windows Host, open up Google Chrome and go to http://[IP]:8085


NOTE: The minimum required TDBMS versions are:
- TDBMS_15.00.02g.48
- TDBMS_15.10m.00.87


### UI Design

Header is standard navbar with limited content. A link to about query grid, creating the foreign server.
Sidebar has the following:

Revenue
  - Quarterly
  - Forecasted
Website
  - Statistics
  - Performance
Transactions
Marketing Campaigns
  - Details
  - Channels

Each panel will show the query being run and the resulting visualization/table of data.

### Scenario

  * User transaction data is being stored in Teradata along with marketing campaign information
  * Engagement metrics are being streamed into MongoDB
  * We notice sales have dropped off from last quarter (basic chart) (data coming from Teradata)
  * Forecasting with R in Teradata we see the expected sales by end of quarter is very low (this would just be a "cool" add to show how Teradata as an analytics engine is very powerful and something way beyond what can be done in Mongo, but we can skip this too)
  * Now we search into possible causes for this
    > Running our SQL query against the foreign Mongo server we see if Page Hits / Users / Bounce Rate, everything seems ok
    >  Running our SQL query against the foreign Mongo server we check to see if a performance issue exists looking at page load speeds, seems ok
    > From Teradata we notice many transactions ("shopping carts") have never completed, show same amount of transactions but huge jump in incomplete ones
  * Drill-Down:
    > We check what "channel" these customers came from via Mongo (referrer behavior) and join against our marketing campaign data in Teradata, see a high percentage came from an email campaign launched recently
    > We run a query against Teradata for Campaign XYZ, notice it is for a 20% discount on all purchases till July 4th
    > We run a query against these transactions for the discount code provided from campaign XYZ, against our "tdDiscount" table and notice the discount is set to 5% 
  * We determine the issue is the discount has not been applied properly for these customers, so we can now:
    - Report issue to our developer/IT team
    - Now we can proactively re-target these particular customers using our Mongo data and/or Teradata data for all who came from the email link and just those who tried entering the code. Perhaps those who completed the transaction w/ the wrong discount versus those who entered it and then bounced versus those who only clicked on the email all could be targeted in different ways
    - Can use R for further forcasting based on a certain percentage we give them, show potential sales revenue from it based on the other campaigns (May be again too complex first out but powerful to show how our product data in Teradata (price versus margin) combined with previous conversion rates can act to provide a more sophisticated targeting mechanism of new campaigns)