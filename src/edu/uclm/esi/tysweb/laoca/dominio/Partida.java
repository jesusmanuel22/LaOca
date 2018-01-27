package edu.uclm.esi.tysweb.laoca.dominio;

import java.util.Random;
import java.util.Vector;
import org.json.JSONArray;
import org.json.JSONObject;

import edu.uclm.esi.tysweb.laoca.websockets.WSPartidas;

public class Partida {
	private Vector<Usuario> jugadores;
	private int numeroDeJugadores;
	private static int id=0;
	private int jugadorConElTurno;
	private Tablero tablero;
	private Usuario ganador;

	public Partida(Usuario creador, int numeroDeJugadores) {
		this.jugadores=new Vector<>();
		this.jugadores.add(creador);
		this.numeroDeJugadores=numeroDeJugadores;
		this.id++;
		this.tablero=new Tablero();
	}

	public int getId() {
		return this.id;
	}

	public void add(Usuario jugador) {
		this.jugadores.add(jugador);
	}

	public boolean isReady() {
		boolean si=this.jugadores.size()==this.numeroDeJugadores;
		System.out.println(si);
		System.out.println(jugadores.size()+" esto tiene que ser dos: (numero escrito al crear partida)"+numeroDeJugadores);
		return this.jugadores.size()==this.numeroDeJugadores;

	}

	
	public void comenzar() {
		//int jugadorConTurno= seleccionTurnoAleatorio (jugadores.size());
		//int aux=0;
		JSONObject jso=new JSONObject();
		jso.put("tipo", "COMIENZO");
		jso.put("idPartida", this.id);
		JSONArray jsa=new JSONArray();
		this.jugadorConElTurno=(new Random()).nextInt(this.jugadores.size());
		jso.put("jugadorConElTurno", getJugadorConElTurno().getLogin());
		for (Usuario jugador : jugadores) 
			jsa.put(jugador.getLogin());
		jso.put("numerojugadores", jugadores.size());
		jso.put("jugadores", jsa);
		
		broadcast(jso);
	}

	public Usuario getJugadorConElTurno() {
		if (this.jugadores.size()==0)
			return null;
		return this.jugadores.get(this.jugadorConElTurno);
	}
	public JSONObject mensajeChat(String nombreJugador, String mensajeChat) throws Exception {
		JSONObject result=new JSONObject();
		result.put("tipo","mensajeChat");
		result.put("nombreJugador",nombreJugador);
		result.put("mensajeChat", mensajeChat);
		
		return result;
	}
	public JSONObject tirarDado(String nombreJugador, int dado) throws Exception {
		JSONObject result=new JSONObject();
		Usuario jugador=findJugador(nombreJugador);
		Usuario jugadorRegistrado=new UsuarioRegistrado();
		
		

		if (jugador!=getJugadorConElTurno())
			throw new Exception("No tienes el turno");
		result.put("tipo", "TIRADA");
		result.put("casillaOrigen", jugador.getCasilla().getPos());
		result.put("dado", dado);
		Casilla destino=this.tablero.tirarDado(jugador, dado);
		result.put("destinoInicial", destino.getPos());
		Casilla siguiente=destino.getSiguiente();
		boolean conservarTurno=false;
		if (siguiente!=null) {
			conservarTurno=true;
			String mensaje=destino.getMensaje();
			result.put("destinoFinal", siguiente.getPos());
			result.put("mensaje", mensaje);
			this.tablero.moverAJugador(jugador, siguiente);
			if (siguiente.getPos()==62) { // Llegada
				this.ganador=jugador;
				result.put("ganador", this.ganador.getLogin());
				jugadorRegistrado.setNombre(this.ganador.getLogin());
				((UsuarioRegistrado) jugadorRegistrado).actualizarVictorias();
			}
		}
		if (destino.getPos()==57) { // Muerte
			jugador.setPartida(null);
			result.put("mensaje", jugador.getLogin() + " cae en la muerte");
			this.jugadores.remove(jugador);
			this.jugadorConElTurno--;
			if (this.jugadores.size()==1) {
				this.ganador=this.jugadores.get(0);
				result.put("ganador", this.ganador.getLogin());
				jugadorRegistrado.setNombre(this.ganador.getLogin());
				((UsuarioRegistrado) jugadorRegistrado).actualizarVictorias();

			}
			jugador.enviar(result);
		}
		if (destino.getPos()==62) { // Llegada
			this.ganador=jugador;
			result.put("ganador", this.ganador.getLogin());
			jugadorRegistrado.setNombre(this.ganador.getLogin());
			((UsuarioRegistrado) jugadorRegistrado).actualizarVictorias();

		}
		int turnosSinTirar=destino.getTurnosSinTirar();
		if (turnosSinTirar>0) {
			result.put("mensajeAdicional", jugador.getLogin() + " est� " + turnosSinTirar + " turnos sin tirar porque ha ca�do en ");
			jugador.setTurnosSinTirar(destino.getTurnosSinTirar());
		}
		result.put("jugadorConElTurno", pasarTurno(conservarTurno));
		return result;
	}

	private String pasarTurno(boolean conservarTurno) {
		if (!conservarTurno) {
			boolean pasado=false;
			do {
				this.jugadorConElTurno=(this.jugadorConElTurno+1) % this.jugadores.size();
				Usuario jugador=getJugadorConElTurno();
				int turnosSinTirar=jugador.getTurnosSinTirar();
				if (turnosSinTirar>0) {
					jugador.setTurnosSinTirar(turnosSinTirar-1);
				} else
					pasado=true;
			} while (!pasado);
		}
		return getJugadorConElTurno().getLogin();
	}

	
	private Usuario findJugador(String nombreJugador) {
		for (Usuario jugador : jugadores)
			if (jugador.getLogin().equals(nombreJugador))
				return jugador;
		return null;
	}

	public void addJugador(Usuario jugador) {
		this.tablero.addJugador(jugador);
	}
	
	void broadcast(JSONObject jso) {
		System.out.println(jso);
		for (int i=jugadores.size()-1; i>=0; i--) {
			Usuario jugador=jugadores.get(i);
			try {
				jugador.enviar(jso);
			}
			catch (Exception e) {
				// TODO: eliminar de la colecci�n, mirar si la partida ha terminado
				// y decirle al WSServer que quite a este jugador
				this.jugadores.remove(jugador);
			}
		}
	}
	
	public Vector<Usuario> getJugadores() {
		return jugadores;
	}

	public Usuario getGanador() {
		return this.ganador;
	}

	public void terminar() {
		for (Usuario jugador : this.jugadores)
			jugador.setPartida(null);
	}
	
	@Override
	public String toString() {
		String r="Partida " + id + "\n";
		for (Usuario jugador : jugadores)
			r+="\t" + jugador + "\n";
		r+="\n";
		return r;
	}
}