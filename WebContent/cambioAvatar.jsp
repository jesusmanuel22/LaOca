<%@page import="edu.uclm.esi.tysweb.laoca.dominio.*"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	JSONObject respuesta=new JSONObject();
	if(session.getAttribute("usuario")!=null){
		String p=request.getParameter("p");
		JSONObject jso=new JSONObject(p);
		
	
		try {
			String email=jso.optString("email");
			String ruta=jso.optString("ruta");
			
			Manager.get().cambiarAvatar(email, ruta);
			respuesta.put("result", "OK");
		}
		catch (Exception e) {
			respuesta.put("result", "ERROR");
			respuesta.put("mensaje", e.getMessage());
		}
	}else{response.sendRedirect("index.html");return;}
	out.println(respuesta.toString());
%>
