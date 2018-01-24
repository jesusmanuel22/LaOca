package edu.uclm.esi.tysweb.laoca.dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.bson.BsonInt32;
import org.bson.BsonString;
import org.bson.BsonValue;
import org.bson.conversions.Bson;

import com.mongodb.MongoClient;
import com.mongodb.MongoWriteException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOneModel;

import edu.uclm.esi.tysweb.laoca.dominio.Usuario;
import edu.uclm.esi.tysweb.laoca.dominio.UsuarioRegistrado;
import edu.uclm.esi.tysweb.laoca.mongodb.MongoBroker;

public class DAOUsuario {

	public static boolean existe(String nombreJugador) throws Exception {
		MongoBroker broker=MongoBroker.get();
		BsonDocument criterio=new BsonDocument();
		criterio.append("email", new BsonString(nombreJugador));
		
		MongoClient conexion=broker.getConexionPrivilegiada();
		MongoDatabase db=conexion.getDatabase("LaOca2017");
		MongoCollection<BsonDocument> usuarios = db.getCollection("usuarios", BsonDocument.class);
		BsonDocument usuario=usuarios.find(criterio).first();
		return usuario!=null;
	}
	
	public static void insert(Usuario usuario, String pwd) throws Exception {
		BsonDocument bUsuario=new BsonDocument();
		bUsuario.append("email", new BsonString(usuario.getLogin()));
		bUsuario.put("pwd", new BsonString(pwd));
		bUsuario.put("Puntuacion", new BsonInt32(0));
		
	
		MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
		MongoCollection<BsonDocument> usuarios = 
				conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);

		if(existe(usuario.getLogin())==false) {
			usuarios.insertOne(bUsuario);
		}else {
			throw new Exception("Usuario ya está registrado");

		}
		conexion.close();

		/*try {
			usuarios.insertOne(bUsuario);
		}
		catch (MongoWriteException e) {
			if (e.getCode()==11000)
				throw new Exception("Â¿No estarÃ¡s ya registrado, chaval/chavala?");
			throw new Exception("Ha pasado algo muy malorrr");
		}
		finally {
			conexion.close();
		}
		*/
	}

	/*private static void crearComoUsuarioDeLaBD(Usuario usuario, String pwd) throws Exception {
		BsonDocument creacionDeUsuario=new BsonDocument();
		creacionDeUsuario.append("createUser", new BsonString(usuario.getLogin()));
		creacionDeUsuario.append("pwd", new BsonString(pwd));
		BsonDocument rol=new BsonDocument();
		rol.append("role", new BsonString("JugadorDeLaOca"));
		rol.append("db", new BsonString("MACARIO"));
		BsonArray roles=new BsonArray();
		roles.add(rol);
		creacionDeUsuario.append("roles", roles);

		MongoBroker.get().getConexionPrivilegiada().getDatabase("MACARIO").runCommand(creacionDeUsuario);
	}*/

	private static BsonString encriptar(String pwd) throws Exception {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] messageDigest = md.digest(pwd.getBytes());
		BigInteger number = new BigInteger(1, messageDigest);
		String hashtext = number.toString(16);
		 
		while (hashtext.length() < 32) {
			hashtext = "0" + hashtext;
		}
		return new BsonString(hashtext);
	}

	public static Usuario login(String email, String pwd) throws Exception {
		Usuario usuario=null;
		if(email.indexOf("@")!=-1) {
			MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
			
			BsonDocument criterio=new BsonDocument();
			BsonDocument criterioEmail=new BsonDocument();
			criterioEmail.append("email", new BsonString(email));
			criterio.append("email", new BsonString(email));
			criterio.append("pwd", new BsonString(pwd));
			
			MongoCollection<BsonDocument> usuarios=
					conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
			FindIterable<BsonDocument> resultado = usuarios.find(criterio); //criterio de credenciales correctas
			FindIterable<BsonDocument> resultadoEmail = usuarios.find(criterioEmail); 
			
			if (resultado.first()!=null) {
				usuario=new UsuarioRegistrado();
				usuario.setNombre(email);
			} else {
				//throw new Exception("Ha fallado algo en el login");
				if (resultadoEmail.first()!=null) {
					throw new Exception("Este correo ya está registrado");
				}else {
					usuario=new Usuario();
					usuario.setNombre(email);
					
				}
			}
			conexion.close();
		}else {
			throw new Exception("El campo email debe ser valido");

		}
		return usuario;

	}

	public static void cambiarContrasena(String email, String pwdvieja, String pwd1) {
		// TODO Auto-generated method stub
		MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
		BsonDocument criterioActualizacion=new BsonDocument();
		BsonDocument criterio=new BsonDocument();
		criterioActualizacion.append("email", new BsonString(email));
		criterioActualizacion.append("pwd", new BsonString(pwdvieja));
		criterio.append("pwd", new BsonString(pwd1));
		MongoCollection<BsonDocument> usuarios=
				conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
		try {
			usuarios.updateOne(criterioActualizacion, new BsonDocument("$set",criterio));
		} catch (Exception e) {
			System.out.println("La contraseña vieja no coinciden");
		}
		
		conexion.close();
		System.out.println("He llegado a cambiar Contrasena");
		
	}

}








