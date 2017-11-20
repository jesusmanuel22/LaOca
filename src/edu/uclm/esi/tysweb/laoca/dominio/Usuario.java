package edu.uclm.esi.tysweb.laoca.dominio;

import javax.websocket.Session;

import edu.uclm.esi.tysweb.laoca.dao.DAOUsuario;

public class Usuario {
	protected String login;
	protected Partida partida;

	public Usuario(String nombreJugador) throws Exception {
		if (!DAOUsuario.existe(nombreJugador))
			throw new Exception("Usuario no registrado");
		this.login=nombreJugador;
	}

	public Usuario() {
	}

	public String getLogin() {
		return this.login;
	}

	public void setPartida(Partida partida) {
		this.partida=partida;
	}
	
	public Partida getPartida() {
		return partida;
	}

	public void setWSSession(Session sesion) {
		//this.wsSession=sesion;
	}

	public void enviar(String jugador, int dado) {
		// TODO Auto-generated method stub
		
	}

	public void setNombre(String email) {
		this.login=email;
	}

	public void insert(String pwd) throws Exception {
		DAOUsuario.insert(this, pwd);
	}

}
