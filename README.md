T2Mongo Demo
============

This demo is designed to showcase a real-world scenario where using the Mongo Connector in Teradata's
Query Grid can provide analytics in an ad-hoc fashion that provides immediate data value to a
business.

### How to setup the demo

#### Teradata Express VM

NOTE: The minimum required TDBMS versions are:
- TDBMS_15.00.02g.48
- TDBMS_15.10m.00.87

1. First you need to get a Teradata Express VM.
2. Add the VM to VM Player and launch the VM
3. Once the VM has booted up open a console window. Run the command `netstat -r`. Find the *default* IP listed. Open /etc/resolv.conf as superuser. Change the nameserver entry to the default IP.
4. `wget http://cran.rstudio.com/src/base/R-3/R-3.2.0.tar.gz`
5. `tar -zxvf R-3.2.0.tar.gz`
6. `cd R-3.2.0`
7. First we must install an fortran compiler as is required by R. So run the following commands:
  `wget https://Svjard@bitbucket.org/Svjard/t2mongo/openSUSE-11.0-Oss.repo.txt   
  cp openSUSE-11.0-Oss.repo.txt /etc/zypp/repos.d/openSUSE-11.0-Oss.repo   
  zypper in gcc-fortran`  
  and follow the instructions to correctly downgrade to the proper packages.
7. `./configure --with-readline=no --with-x=no`
8. `make`
9. `make install`
10. Launch R running the command: `r`
11. `packages.install("forecast")`
12. `/etc/init.d/tpa start` will launch our database.

#### MongoDB VM
1. Create a VM and install Debian 7.x: https://www.debian.org/CD/netinst/
2. Add your user under sudo by editing /etc/sudoers and adding the line `user    ALL=(ALL:ALL) ALL` where *user* is
your username.
3. `sudo apt-get install git`
4. `git clone https://Svjard@bitbucket.org/Svjard/t2mongo.git`
5. `chmod 755 t2mongo/script.sh`
6. Download and unzip the Teradata JDBC Driver from Developer Exchange.
7. 
`mvn install:install-file -DgroupId=com.teradata.jdbc -DartifactId=tdgssconfig -Dversion=15.10.00.05 -Dpackaging=jar -Dfile=/path/to/tdgssconfig.jar  
mvn install:install-file -DgroupId=com.teradata.jdbc -DartifactId=terajdbc4 -Dversion=15.10.00.05 -Dpackaging=jar -Dfile=/path/to/terajdbc4.jar`
8. `sudo t2mongo/script.sh`

### How to run the demo

To start the demo, open Google Chrome to http://[IP]:3000 on your Windows Host machine, where IP is the ip of the MongoDB VM.

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

### Demo vs Interactive

  * Home page you select from three buttons: (begin demo), (begin interative mode)
  * If interactive mode: modal popup with Normal or Advanced, with slight description for each
    * Show first slide about quarterly profit and description of the task
    * Possible areas to investigate questions: [dropdown of choices like website performance, website user behavior trends, transaction history]
    * After selection, the query is partially written but certain parts provide drop-down options to select from to "build" up the correct query. Advanced mode has the user write the entire query. As the query changes so does the graph and charts.
    * The final panel has the conclusion which is a drop-down of options the user must select from. Each selection begins to build out the final proposal for the CFO.