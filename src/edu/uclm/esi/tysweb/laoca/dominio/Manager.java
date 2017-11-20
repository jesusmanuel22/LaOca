package edu.uclm.esi.tysweb.laoca.dominio;

import java.io.File;
import java.util.concurrent.ConcurrentHashMap;

import edu.uclm.esi.tysweb.laoca.dao.BrokerConPool;

public class Manager {
	private ConcurrentHashMap<String, Usuario> usuarios;
	private ConcurrentHashMap<Integer, Partida> partidasPendientes;
	private ConcurrentHashMap<Integer, Partida> partidasEnJuego;
	private String webAppPath;
	private String tipoDeBroker;
	
	private Manager() {
		this.usuarios=new ConcurrentHashMap<>();
		this.partidasPendientes=new ConcurrentHashMap<>();
		this.partidasEnJuego=new ConcurrentHashMap<>();
	}
	
	public Usuario crearPartida(String nombreJugador, int numeroDeJugadores) throws Exception {
		Usuario usuario = findUsuario(nombreJugador);
		if (usuario.getPartida()!=null)
			throw new Exception("El usuario ya está asociado a una partida. Desconéctate para crear una nueva o unirte a otra");

		Partida partida=new Partida(usuario, numeroDeJugadores);
		usuario.setPartida(partida);
		this.partidasPendientes.put(partida.getId(), partida);
		return usuario;
	}

	private Usuario findUsuario(String nombreJugador) throws Exception {
		Usuario usuario=this.usuarios.get(nombreJugador);
		if (usuario==null) {
			usuario=new Usuario(nombreJugador);
			this.usuarios.put(nombreJugador, usuario);
		}
		return usuario;
	}
	
	public void setTipoDeBroker(String tipoDeBroker) {
		this.tipoDeBroker="edu.uclm.esi.tysweb.laoca.dao." + tipoDeBroker;
	}
	
	public String getTipoDeBroker() {
		return tipoDeBroker;
	}
	
	public void addJugador(String nombreJugador) throws Exception {
		if (this.partidasPendientes.isEmpty())
			throw new Exception("No hay partidas pendientes. Crea una, pendejo");
		Partida partida=this.partidasPendientes.elements().nextElement();
		Usuario usuario=findUsuario(nombreJugador);
		partida.add(usuario);
		usuario.setPartida(partida);
		if (partida.isReady()) {
			this.partidasPendientes.remove(partida.getId());
			this.partidasEnJuego.put(partida.getId(), partida);
		}
	}
	
	public void setWebAppPath(String webAppPath) {
		this.webAppPath=webAppPath;
		if (!this.webAppPath.endsWith(File.separator))
			this.webAppPath+=File.separator;
	}
	
	public String getWebAppPath() {
		return webAppPath;
	}
	
	private static class ManagerHolder {
		static Manager singleton=new Manager();
	}
	
	public static Manager get() {
		return ManagerHolder.singleton;
	}
	
	public void registrar(String email, String pwd) throws Exception {
		Usuario usuario=new UsuarioRegistrado();
		usuario.setNombre(email);
		usuario.insert(pwd);
	}

	public void actualizarTablero(int idPartida, String jugador, int dado) {
		Partida partida=this.partidasEnJuego.get(idPartida);
		partida.actualizar(jugador, dado);
	}
	
}








