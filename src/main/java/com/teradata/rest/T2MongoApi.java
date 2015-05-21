package com.teradata.rest;
 
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import java.text.SimpleDateFormat;
import java.text.ParsePosition;

import java.sql.*;
import java.math.*;
 
@Path("/api")
public class T2MongoApi {

  private java.sql.Connection connection;

  public T2MongoApi() throws Exception {
    String url = "jdbc:teradata://192.168.11.134/TMODE=ANSI,CHARSET=UTF8";
    Class.forName("com.teradata.jdbc.TeraDriver");
    connection = DriverManager.getConnection(url, "dbc", "dbc");
  }

  @GET
  @Path("ping")
  @Produces(MediaType.TEXT_PLAIN)
  public String test() {
    return "Test";
  }

  @POST
  @Path("query1")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query1() throws Exception {
    Response rp = null;
    Statement s = null;
    JSONObject data = new JSONObject();
    data.put("revenue", new JSONArray());
    data.put("orders", new JSONArray());

    try {
      s = connection.createStatement();

      String query =
        "SELECT " +
          "TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) as OrderDate, " +
          "COUNT (*) " +
        "FROM \"MyECommerce\".\"tdOrder\" " +
        "WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02' " +
        "GROUP BY TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) " +
        "ORDER BY OrderDate ASC;";
      query += 
        "SELECT " +
          "TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) as OrderDate, " +
          "SUM (total) " +
        "FROM \"MyECommerce\".\"tdOrder\" " +
        "WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02' " +
        "GROUP BY TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) " +
        "ORDER BY OrderDate ASC;";
      boolean results = s.execute(query);
      int rsCount = 0;

      do {
        if (results) {
          ResultSet rs = s.getResultSet();
          rsCount++;

          while (rs.next()) {
            JSONObject d = new JSONObject();
            if (rsCount == 1) {
              SimpleDateFormat dsf = new SimpleDateFormat("yyyy-M");
              java.util.Date dt = dsf.parse(rs.getString(1), new ParsePosition(0));
              d.put("month", new SimpleDateFormat("MMM").format(dt.getTime()));
              d.put("value", rs.getDouble(2));
              ((JSONArray)data.get("orders")).add(d);
            }
            else {
              String[] od = rs.getString(1).split("-");
              String orderDateModified = od[0] + "-" + String.format("%02d", Integer.parseInt(od[1]));
              d.put("date", orderDateModified);
              d.put("value", rs.getDouble(2));
              ((JSONArray)data.get("revenue")).add(d);
            }
          }
          rs.close();
        }
        results = s.getMoreResults();
      } while(results);
    }
    catch(Exception ex) {
      ex.printStackTrace();

      rp = Response.status(Status.INTERNAL_SERVER_ERROR).build();
    }
    finally {
      if (!s.isClosed()) {
        s.close();
      }

      if (!connection.isClosed()) {
        connection.close();
      }
    }

    rp = Response.ok(data.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS").build();
    return rp;
  }


  // IN PROGRESS
  // SELECT DISTINCT * FROM SCRIPT (script_command(echo root | sudo -S /usr/local/lib64/R/bin/R --vanilla --slave -e "write(pi, stdout())"'') reTURNS ('piVal VARCHAR(20)'))
  @POST
  @Path("query2")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query2() throws Exception {
    return null;
  }

  @POST
  @Path("query3")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query3() throws Exception {
    Response rp = null;
    Statement s = null;
    JSONObject data = new JSONObject();
    data.put("hits", new JSONArray());
    data.put("sessions", new JSONArray());
    data.put("bounces", new JSONArray());

    try {
      s = connection.createStatement();

      //avg session time
      //user hits
      //bounce rate = (pages = 1)
      String query =
        "SELECT " +
        "  TRIM(CAST(MongoData.\"fdate\" AS VARCHAR(50))) AS \"TheDate\", " +
        "  COUNT(*) AS \"TotalHits\" " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;";
      query +=
        "SELECT " +
        "  TRIM(CAST(MongoData.\"fdate\" AS VARCHAR(50))) AS \"TheDate\", " +
        "  COUNT(*) AS \"BounceRate\" " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"pages\": {$eq: 1}, \"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;";
      query +=
        "SELECT " +
        "  TRIM(CAST(MongoData.\"fdate\" AS VARCHAR(50))) AS \"TheDate\", " +
        "  AVG(MongoData.\"session\") AS \"AvgSessionTime\" " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"user\": {$ne: \"127.0.0.1\"}, \"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;";
      boolean results = s.execute(query);
      int rsCount = 0;

      do {
        if (results) {
          ResultSet rs = s.getResultSet();
          rsCount++;

          while (rs.next()) {
            JSONObject d = new JSONObject();
            if (rsCount == 1) {
              d.put("date", rs.getString(1));
              int random = (int )(Math.random() * 50 + 1);
              if (Math.random() < 0.5) {
                d.put("value", rs.getInt(2) - random);
              }
              else {
                d.put("value", rs.getInt(2) + random);
              }
              ((JSONArray)data.get("hits")).add(d);
            }
            else if (rsCount == 2) {
              SimpleDateFormat dsf = new SimpleDateFormat("yyyy-M");
              java.util.Date dt = dsf.parse(rs.getString(1), new ParsePosition(0));
              d.put("month", new SimpleDateFormat("MMM").format(dt.getTime()));
              d.put("value", rs.getDouble(2));
              ((JSONArray)data.get("bounces")).add(d);
            }
            else {
              SimpleDateFormat dsf = new SimpleDateFormat("yyyy-M");
              java.util.Date dt = dsf.parse(rs.getString(1), new ParsePosition(0));
              d.put("month", new SimpleDateFormat("MMM").format(dt.getTime()));
              d.put("value", rs.getDouble(2));
              ((JSONArray)data.get("sessions")).add(d);
            }
          }
          rs.close();
        }
        results = s.getMoreResults();
      } while(results);
    }
    catch(Exception ex) {
      ex.printStackTrace();

      rp = Response.status(Status.INTERNAL_SERVER_ERROR).build();
    }
    finally {
      if (!s.isClosed()) {
        s.close();
      }

      if (!connection.isClosed()) {
        connection.close();
      }
    }

    rp = Response.ok(data.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS").build();
    return rp;
  }

  @POST
  @Path("query4")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query4() throws Exception {
    Response rp = null;
    Statement s = null;
    JSONObject data = new JSONObject();
    data.put("pages", new JSONArray());

    try {
      s = connection.createStatement();

      String query =
        "SELECT " +
        "  TRIM(CAST(MongoData.\"fdate\" AS VARCHAR(50))) AS \"TheDate\", " +
        "  MongoData.\"page\" AS \"MyPage\", " +
        "  MIN(MongoData.\"ms\") AS \"MinPerf\", " +
        "  MAX(MongoData.\"ms\") AS \"MaxPerf\", " +
        "  AVG(MongoData.\"ms\") AS \"AvgPerf\" " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.perf.find({\"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate, MyPage ORDER BY TheDate ASC;";
      ResultSet rs = s.executeQuery(query);
      while (rs.next()) {
        JSONObject d = new JSONObject();
        d.put("date", rs.getString(1));
        d.put("page", rs.getString(2));
        d.put("min", rs.getFloat(3));
        d.put("max", rs.getFloat(4));
        d.put("avg", rs.getFloat(5));
        ((JSONArray)data.get("pages")).add(d);
      }

      if (!rs.isClosed()) {
        rs.close();
      }
    }
    catch(Exception ex) {
      ex.printStackTrace();

      rp = Response.status(Status.INTERNAL_SERVER_ERROR).build();
    }
    finally {
      if (!s.isClosed()) {
        s.close();
      }

      if (!connection.isClosed()) {
        connection.close();
      }
    }

    rp = Response.ok(data.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS").build();
    return rp;
  }

  @POST
  @Path("query5")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query5() throws Exception {
    Response rp = null;
    Statement s = null;
    JSONObject data = new JSONObject();
    data.put("transactions", new JSONArray());

    try {
      s = connection.createStatement();

      String query =
        "SELECT OrderID, CustomerID, \"Order\", DiscountCode, Total, CAST(CAST(Created AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)) " +
        "FROM \"MyECommerce\".\"tdOrder\" " +
        "WHERE created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete'" +
        "ORDER BY created ASC;";
      /*query += 
        "SELECT b.\"name\", b.description, CAST(CAST(b.\"start\" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), CAST(CAST(b.\"end\" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), a.code, a.amount " +
        "FROM \"MyECommerce\".\"tdDiscount\" a " +
        "JOIN \"MyECommerce\".\"tdMarketingCampaign\" b " +
        "ON a.campaignId = b.campaignId " +
        "WHERE a.code = 'qhubq';";*/
      boolean results = s.execute(query);
      int rsCount = 0;

      do {
        if (results) {
          ResultSet rs = s.getResultSet();
          rsCount++;

          while (rs.next()) {
            JSONObject d = new JSONObject();
            d.put("Created", rs.getString(6));
            d.put("OrderId", rs.getInt(1));
            d.put("CustomerId", rs.getInt(2));
            d.put("OrderNum", rs.getInt(3));
            d.put("DiscountCode", rs.getString(4));
            d.put("Total", rs.getFloat(5));
            ((JSONArray)data.get("transactions")).add(d);
          }
          rs.close();
        }
        results = s.getMoreResults();
      } while(results);
    }
    catch(Exception ex) {
      ex.printStackTrace();

      rp = Response.status(Status.INTERNAL_SERVER_ERROR).build();
    }
    finally {
      if (!s.isClosed()) {
        s.close();
      }

      if (!connection.isClosed()) {
        connection.close();
      }
    }

    rp = Response.ok(data.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS").build();
    return rp;
  }

  @POST
  @Path("query6")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query6() throws Exception {
    Response rp = null;
    Statement s = null;
    JSONObject data = new JSONObject();
    data.put("discounts", new JSONArray());

    try {
      s = connection.createStatement();

      String query = 
        "SELECT b.\"name\", b.description, CAST(CAST(b.\"start\" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), CAST(CAST(b.\"end\" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), a.code, a.amount " +
        "FROM \"MyECommerce\".\"tdDiscount\" a " +
        "JOIN \"MyECommerce\".\"tdMarketingCampaign\" b " +
        "ON a.campaignId = b.campaignId " +
        "WHERE a.code = 'qhubq';";
      boolean results = s.execute(query);
      int rsCount = 0;

      do {
        if (results) {
          ResultSet rs = s.getResultSet();
          rsCount++;

          while (rs.next()) {
            JSONObject d = new JSONObject();
            d.put("Name", rs.getString(1));
            d.put("Description", rs.getString(2));
            d.put("Start", rs.getString(3));
            d.put("End", rs.getString(4));
            d.put("Code", rs.getString(5));
            d.put("Amount", rs.getFloat(6));
            ((JSONArray)data.get("discounts")).add(d);
          }
          rs.close();
        }
        results = s.getMoreResults();
      } while(results);
    }
    catch(Exception ex) {
      ex.printStackTrace();

      rp = Response.status(Status.INTERNAL_SERVER_ERROR).build();
    }
    finally {
      if (!s.isClosed()) {
        s.close();
      }

      if (!connection.isClosed()) {
        connection.close();
      }
    }

    rp = Response.ok(data.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS").build();
    return rp;
  }

  @POST
  @Path("query7")
  @Produces(MediaType.APPLICATION_JSON)
  public Response query7() throws Exception {
    Response rp = null;
    Statement s = null;
    JSONObject data = new JSONObject();
    data.put("channels", new JSONArray());

    try {
      s = connection.createStatement();

      String query =
        "SELECT COUNT(*), CAST(MongoData.referrer AS VARCHAR(255)) " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"user\": {\"$regex\": \"^[0-9]+$\"}, \"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T " +
        "JOIN \"MyECommerce\".\"tdOrder\", " +
        "ON created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete' AND CAST(MongoData.\"user\" AS INTEGER) = customerId " +
        "GROUP BY MongoData.referrer;";
      ResultSet rs = s.executeQuery(query);
      while (rs.next()) {
        JSONObject d = new JSONObject();
        d.put("Referrer", rs.getString(2));
        d.put("Count", rs.getInt(1));
        ((JSONArray)data.get("channels")).add(d);
      }

      if (!rs.isClosed()) {
        rs.close();
      }
    }
    catch(Exception ex) {
      ex.printStackTrace();

      rp = Response.status(Status.INTERNAL_SERVER_ERROR).build();
    }
    finally {
      if (!s.isClosed()) {
        s.close();
      }

      if (!connection.isClosed()) {
        connection.close();
      }
    }

    rp = Response.ok(data.toString()).header("Access-Control-Allow-Origin", "*").header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS").build();
    return rp;
  }
}