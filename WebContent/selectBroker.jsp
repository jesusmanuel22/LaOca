<%@page import="edu.uclm.esi.tysweb.laoca.dominio.Manager"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String p=request.getParameter("p");
	JSONObject jso=new JSONObject(p);
	
	JSONObject respuesta=new JSONObject();
	try {
		String tipoDeBroker=jso.getString("tipo");
		if (tipoDeBroker==null || tipoDeBroker.trim().length()==0)
			throw new Exception("Tipo de broker inválido");
		Manager.get().setTipoDeBroker(tipoDeBroker);
		respuesta.put("result", "OK");
		respuesta.put("mensaje", "Broker seleccionado: " + tipoDeBroker);		
	}
	catch (Exception e) {
		respuesta.put("result", "ERROR");
		respuesta.put("mensaje", e.getMessage());
	}
	out.println(respuesta.toString());
%>