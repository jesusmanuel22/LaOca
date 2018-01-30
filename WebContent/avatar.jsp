<%@page import="edu.uclm.esi.tysweb.laoca.dominio.*"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String p=request.getParameter("p");
	JSONObject jso=new JSONObject(p);
	
	try {
		String email=jso.optString("email");
		
		
		String jota=Manager.get().avatar(email);
		JSONObject jsaa;
		jsaa=new JSONObject(jota);
		out.println(jsaa.toString());
	}
	catch (Exception e) {

	}
	
%>









