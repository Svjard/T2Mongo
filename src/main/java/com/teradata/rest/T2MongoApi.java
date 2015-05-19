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

    try {
      s = connection.createStatement();

      String query =
        "SELECT " +
          "EXTRACT(month from created) as OrderMonth, " +
          "EXTRACT(year from created) as OrderYear, " +
          "COUNT (*), " +
          "SUM (total) " +
        "FROM \"MyECommerce\".\"tdOrder\" " +
        "WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02' " +
        "GROUP BY OrderMonth " +
        "ORDER BY OrderMonth;";
      ResultSet rs = s.executeQuery(query);
      while (rs.next()) {
        JSONObject d = new JSONObject();
        d.put("month", rs.getInt(1).toString() + "-" + rs.getInt(2).toString());
        d.put("revenue", rs.getFloat(4));
        data.add(d);

        d = new JSONObject();
        d.put("month", rs.getInt(1));
        d.put("orders", rs.getFloat(3));
        data.add(d);
      }

      data.put("revenue", revenue);
      data.put("orders", orders);

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
    JSONArray data = new JSONArray();

    try {
      s = connection.createStatement();

      //avg session time
      //user hits
      //bounce rate = (pages = 1)
      String query =
        "SELECT " +
          "CAST(age AS JSON(16000)) FROM FOREIGN TABLE(@BEGIN_PASS_THRU t2mongo.userstats.distinct(\"user\") @END_PASS_THRU)@Mongo AS T; " +
        "FROM \"MyECommerce\".\"tdOrder\" " +
        //"WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-04-30' " +
        "GROUP BY OrderMonth " +
        "ORDER BY OrderMonth;";
      ResultSet rs = s.executeQuery(query);
      while (rs.next()) {
        JSONObject d = new JSONObject();
        d.put("month", rs.getInt(1));
        d.put("revenue", rs.getFloat(3));
        data.add(d);

        d = new JSONObject();
        d.put("month", rs.getInt(1));
        d.put("orders", rs.getFloat(2));
        data.add(d);
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