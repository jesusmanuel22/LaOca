<%@page import="edu.uclm.esi.tysweb.laoca.dominio.*"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%

JSONObject respuesta=new JSONObject();

	String p=request.getParameter("p");
	JSONObject jso=new JSONObject(p);
	

	try {
		
		String pwd1New=jso.optString("pwd1New");
		String pwd2New=jso.optString("pwd2New");
		long token=jso.optLong("token");
		
		comprobarCredenciales(pwd1New, pwd2New);
		
		Manager.get().nuevaContrasena( pwd1New, token);
		respuesta.put("result", "OK");
	}
	catch (Exception e) {
		respuesta.put("result", "ERROR");
		respuesta.put("mensaje", e.getMessage());
	}
//}else{response.sendRedirect("login.html");return;}
out.println(respuesta.toString());
%>

<%!
private void comprobarCredenciales(String pwd1, String pwd2) throws Exception {
	
	if (!pwd1.equals(pwd2))
		throw new Exception("Las contraseñas no coinciden");
	if (pwd1.length()<4)
		throw new Exception("La contraseña tiene que tener 4 caracteres por lo menos");
}
%>




