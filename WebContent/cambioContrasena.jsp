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
		String pwd1=jso.optString("pwd1");
		String pwd1New=jso.optString("pwd1New");
		String pwd2New=jso.optString("pwd2New");
		
		comprobarCredenciales(email, pwd1New, pwd2New);
		
		Manager.get().cambiarContrasena(email, pwd1,pwd1New);
		respuesta.put("result", "OK");
	}
	catch (Exception e) {
		respuesta.put("result", "ERROR");
		respuesta.put("mensaje", e.getMessage());
	}
	out.println(respuesta.toString());
%>

<%!
private void comprobarCredenciales(String email, String pwd1, String pwd2) throws Exception {
	if (email.length()==0)
		throw new Exception("El email no puede ser vacío");
	
	if (!pwd1.equals(pwd2))
		throw new Exception("Las contraseñas no coinciden");
	if (pwd1.length()<4)
		throw new Exception("La contraseña tiene que tener 4 caracteres por lo menos");
}
%>