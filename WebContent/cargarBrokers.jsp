<%@page import="edu.uclm.esi.tysweb.laoca.dominio.Manager"%>
<%@page import="org.json.JSONObject, org.json.JSONArray, edu.uclm.esi.tysweb.laoca.dao.*, org.apache.commons.io.FileUtils, java.io.File, 
	java.util.*" %>
<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	ServletContext context = session.getServletContext();
	String webAppPath = context.getRealPath("/");
	Manager.get().setWebAppPath(webAppPath);
	
	String daoFolder=Manager.get().getWebAppPath()+"WEB-INF/classes/edu/uclm/esi/tysweb/laoca/dao/";
	String[] dotClass={"class"};
	Iterator<File> classes=FileUtils.listFiles(new File(daoFolder), dotClass, false).iterator();
	JSONArray jsaBrokers=new JSONArray();
	while (classes.hasNext()) {
		String classFile=classes.next().getName();
		if (classFile.startsWith("Broker") && classFile.indexOf("$")==-1)
			jsaBrokers.put(classFile.substring(0, classFile.length()-6));
	}
	
	JSONObject respuesta=new JSONObject();
	try {
		respuesta.put("result", "OK");
		respuesta.put("mensaje", jsaBrokers);
	}
	catch (Exception e) {
		respuesta.put("result", "ERROR");
		respuesta.put("mensaje", e.getMessage());
	}
	out.println(respuesta.toString());
%>