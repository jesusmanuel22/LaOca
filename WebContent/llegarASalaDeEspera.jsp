<%@page import="edu.uclm.esi.tysweb.laoca.dominio.Manager"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String p=request.getParameter("p");
	JSONObject jso=new JSONObject(p);
	String nombreJugador=jso.getString("nombre");
	session.setAttribute("nombreDeUsuario", nombreJugador);
	
	JSONObject respuesta=new JSONObject();
	try {
		Manager.get().addJugador(nombreJugador);
		respuesta.put("result", "OK");
	}
	catch (Exception e) {
		respuesta.put("result", "ERROR");
		respuesta.put("mensaje", e.getMessage());
	}
	out.println(respuesta.toString());
%>