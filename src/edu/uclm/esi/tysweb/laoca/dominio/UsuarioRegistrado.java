package edu.uclm.esi.tysweb.laoca.dominio;

import java.sql.Date;

import edu.uclm.esi.tysweb.laoca.dao.DAOUsuario;

public class UsuarioRegistrado extends Usuario {
	private int partidasGanadas;
	private int partidasPerdidas;
	
	public UsuarioRegistrado() {
		super();
		this.partidasGanadas=0;
		this.partidasPerdidas=0;
	}
	/*public static void actualizarVictorias(String email throws Exception {
		this.
		 DAOUsuario.actualizarVictorias(email);
	}*/

	public static Usuario login(String email, String pwd) throws Exception {
		return DAOUsuario.login(email, pwd);
	}

	public static void cambiarContrasena(String email,String pwdvieja, String pwd1) {
		DAOUsuario.cambiarContrasena(email, pwdvieja,pwd1);
	}
	public static void nuevaContrasena(String pwd1New, long token) {
		DAOUsuario.nuevaContrasena(pwd1New, token);
	}
	public static void recuperarPWD(String email)throws Exception {
		DAOUsuario.recuperarPWD(email);
	}
}
