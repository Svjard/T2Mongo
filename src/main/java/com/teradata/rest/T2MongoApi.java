package com.teradata.rest;
 
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
 
@Path("/api")
public class T2MongoApi {

  public T2MongoApi() {
    // initialize our jdbc pool here

  }

  @GET
  @Path("ping")
  @Produces(MediaType.TEXT_PLAIN)
  public String test() {
      return "Test";
  }

  @POST
  @Path("query")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String query() {

  }
}