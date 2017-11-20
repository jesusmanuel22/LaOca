package edu.uclm.esi.tysweb.laoca.dominio;

import java.util.Enumeration;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

public class Partida {
	private ConcurrentHashMap<String, Usuario> jugadores;
	private int numeroDeJugadores;
	private int id;

	public Partida(Usuario creador, int numeroDeJugadores) {
		this.jugadores=new ConcurrentHashMap<>();
		this.jugadores.put(creador.getLogin(), creador);
		this.numeroDeJugadores=numeroDeJugadores;
		this.id=new Random().nextInt();
	}

	public Integer getId() {
		return this.id;
	}

	public void add(Usuario usuario) {
		this.jugadores.put(usuario.getLogin(), usuario);
		System.out.println("Añade un user");
	}

	public boolean isReady() {
		return this.jugadores.size()==this.numeroDeJugadores;
	}

	public void actualizar(String jugador, int dado) {
		// ...
		Enumeration<Usuario> eJugadores = jugadores.elements();
		while (eJugadores.hasMoreElements())
			eJugadores.nextElement().enviar(jugador, dado);
	}

}
