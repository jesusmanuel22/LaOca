<%@page import="edu.uclm.esi.tysweb.laoca.dominio.*"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String p=request.getParameter("p");
	JSONObject jso=new JSONObject(p);
	
	JSONObject respuesta=new JSONObject();
	try {
		String email=jso.optString("email");
		
		
		comprobarCredenciales(email);
		
		Manager.get().recuperarPWD(email);
		respuesta.put("result", "OK");
	}
	catch (Exception e) {
		respuesta.put("result", "ERROR");
		respuesta.put("mensaje", e.getMessage());
	}
	
	out.println(respuesta.toString());
%>

<%!
private void comprobarCredenciales(String email) throws Exception {
	if (email.length()==0)
		throw new Exception("El email no puede ser vacío");
	
}
%>







