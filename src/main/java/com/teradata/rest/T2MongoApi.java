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

import java.sql.*;
 
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
      boolean results = s.executeQuery(query);
      int rsCount = 0;

      do {
        if (results) {
          ResultSet rs = stmt.getResultSet();
          rsCount++;

          while (rs.next()) {
            JSONObject d = new JSONObject();
            String[] od = rs.getString(1).split("-");
            String orderDateModified = od[0] + "-" + String.format("%02d", Integer.parseInt(od[1]));
            d.put("date", orderDateModified);
            if (rsCount == 1) {
              d.put("orders", rs.getDouble(2));
              data.get("orders").add(d);
            }
            else {
              d.put("revenue", rs.getDouble(2));
              data.get("revenue").add(d);
            }
          }
          rs.close();
        }
        results = stmt.getMoreResults();
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

    rp = Response.ok(data).build();
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
        "  TRIM(CAST(MongoData.\"timestamp\" AS VARCHAR(50))) AS \"TheDate\", " +
        "  COUNT(*) AS \"TotalHits\" "
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T GROUP BY TheDate ORDER BY TheDate ASC;";
      query +=
        "SELECT " +
        "  CAST(MongoData.\"timestamp\" / 1000 AS BIGINT) AS \"SecEpoch\", " +
        "  CAST(CAST(700101 AS DATE) + SecEpoch / 86400 AS TIMESTAMP(6)) + (SecEpoch MOD 86400) * INTERVAL '00:00:01' HOUR TO SECOND AS \"TheDate\", " +
        "  TRIM(EXTRACT(year from TheDate)) || '-' || TRIM(EXTRACT(month from TheDate)) as MyDate, " +
        "  COUNT(*) AS \"BounceRate\" "
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"pages\": {$eq: 1}, \"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T;";
      query +=
        "SELECT " +
        "  CAST(MongoData.\"timestamp\" / 1000 AS BIGINT) AS \"SecEpoch\", " +
        "  CAST(CAST(700101 AS DATE) + SecEpoch / 86400 AS TIMESTAMP(6)) + (SecEpoch MOD 86400) * INTERVAL '00:00:01' HOUR TO SECOND AS \"TheDate\", " +
        "  TRIM(EXTRACT(year from TheDate)) || '-' || TRIM(EXTRACT(month from TheDate)) as MyDate, " +
        "  AVG(MongoData.session) AS \"AvgSessionTime\" " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find({\"user\": {$ne: \"127.0.0.1\"}, \"timestamp\": {$gte: 1420070400000, $lte: 1433289599000}}) @END_PASS_THRU)@Mongo AS T;";
      boolean results = s.executeQuery(query);
      int rsCount = 0;

      do {
        if (results) {
          ResultSet rs = stmt.getResultSet();
          rsCount++;

          while (rs.next()) {
            JSONObject d = new JSONObject();
            String[] od = rs.getString(3).split("-");
            String orderDateModified = od[0] + "-" + String.format("%02d", Integer.parseInt(od[1]));
            d.put("date", orderDateModified);
            if (rsCount == 1) {
              d.put("hits", rs.getDouble(4));
              data.get("hits").add(d);
            }
            else if (rsCount == 2) {
              d.put("bounces", rs.getDouble(4));
              data.get("bounces").add(d);
            }
            else {
              d.put("session", rs.getDouble(4));
              data.get("sessions").add(d);
            }
          }
          rs.close();
        }
        results = stmt.getMoreResults();
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

    rp = Response.ok(data).build();
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

      //
      String query =
        "SELECT " +
        "  CAST(CAST(700101 AS DATE) + MongoData.timestamp / 86400 AS TIMESTAMP(6)) + (MongoData.timestamp MOD 86400) * INTERVAL '00:00:01' HOUR TO SECOND AS \"MyDate\", " +
        "  EXTRACT(Month FROM MyDate) AS HitMonth, " +
        "  EXTRACT(Year FROM MyDate) AS HitYear, " +
        "  MongoData.page, " +
        "  MIN(ms) AS \"MinPerf\","
        "  MAX(ms) AS \"MaxPerf\","
        "  AVG(ms) AS \"AvgPerf\" " +
        "FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.find() @END_PASS_THRU)@Mongo AS T;";
      ResultSet rs = s.executeQuery(query);
      while (rs.next()) {
        JSONObject d = new JSONObject();
        d.put("date", rs.getInt(2).toString() + "-" + rs.getInt(3).toString());
        d.put("hits", rs.getFloat(4));
        data.get("hits").add(d);

        d = new JSONObject();
        d.put("date", rs.getInt(2).toString() + "-" + rs.getInt(3).toString());
        d.put("session", rs.getFloat(5));
        data.get("sessions").add(d);
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

    rp = Response.ok(data).build();
    return rp;
  }
}