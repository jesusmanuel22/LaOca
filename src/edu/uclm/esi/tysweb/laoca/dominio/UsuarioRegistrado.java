package edu.uclm.esi.tysweb.laoca.dominio;

import edu.uclm.esi.tysweb.laoca.dao.DAOUsuario;
	
public class UsuarioRegistrado extends Usuario {
	private int partidasGanadas;
	private int partidasPerdidas;
	public UsuarioRegistrado() {
		super();
		this.partidasGanadas=0;
		this.partidasPerdidas=0;
	}

	public static Usuario login(String email, String pwd) throws Exception {
		return DAOUsuario.login(email, pwd);
	}

	public static void cambiarContrasena(String email,String pwdvieja, String pwd1) {
		DAOUsuario.cambiarContrasena(email, pwdvieja,pwd1);
	}
	
}
