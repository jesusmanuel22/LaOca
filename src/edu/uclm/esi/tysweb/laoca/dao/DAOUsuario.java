package edu.uclm.esi.tysweb.laoca.dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Random;
import org.json.JSONObject;

import javax.print.Doc;

import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.bson.BsonInt32;
import org.bson.BsonInt64;
import org.bson.BsonString;
import org.bson.BsonValue;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONObject;

import com.mongodb.MongoClient;
import com.mongodb.MongoWriteException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOneModel;

import edu.uclm.esi.tysweb.laoca.dominio.EMailSenderService;
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
		bUsuario.put("victorias", new BsonInt32(0));
		bUsuario.put("avatar", new BsonString("avatarm3"));
	
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
		
	}
	public static void nuevaContrasena( String pwd1New, long token) {
		// TODO Auto-generated method stub
		MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
		BsonDocument criterioActualizacion=new BsonDocument();
		BsonDocument criterio=new BsonDocument();
		BsonDocument criterioBuscar=new BsonDocument();
		criterioActualizacion.append("token", new BsonInt64(token));
		
		criterio.append("pwd", new BsonString(pwd1New));
		MongoCollection<BsonDocument> recuPWD=
				conexion.getDatabase("LaOca2017").getCollection("recuperacionContrasena", BsonDocument.class);
		FindIterable<BsonDocument> userToken = recuPWD.find(criterioActualizacion); 
		if(userToken.first()!=null) {
			//printJson(userToken.first());
			//String email=userToken.(criterioActualizacion,new BsonDocument("$get","email"));
			String email=userToken.first().get("email").toString();
			email=email.split("value='")[1].split("'}")[0];
			criterioBuscar.append("email", new BsonString(email));
		MongoCollection<BsonDocument> usuarios=
				conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
		try {
			usuarios.updateOne(criterioBuscar, new BsonDocument("$set",criterio));
		} catch (Exception e) {
			System.out.println("La contraseña vieja no coinciden");
		}
		
		conexion.close();
		System.out.println("He llegado a cambiar Contrasena");
		}
	}
	public static void recuperarPWD(String email) throws Exception{
		// TODO Auto-generated method stub
		System.out.println(email);
		if(existe(email)) {
			System.out.println("EXISTE EL USUARIO");
			EMailSenderService emailrecu=new EMailSenderService();
			long codigo= new Random().nextLong();
			emailrecu.enviarPorGmail(email, codigo);
			
			insertRecuperacion(email, codigo);
		}else {
			throw new Exception("No es posible recuperar la contraseña para este correo.");
		}
		
		
		
	}
	public static void insertRecuperacion(String email, long token) throws Exception {
		BsonDocument recuUsuario=new BsonDocument();
		recuUsuario.append("email", new BsonString(email));
		recuUsuario.put("token", new BsonInt64( token));
		Date caducidad=new Date();
		int caducidadBD=caducidad.getHours()+1;
		caducidad.setHours(caducidadBD);
		recuUsuario.put("caducidad", new BsonString(caducidad.toString()));
		
	
		MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
		MongoCollection<BsonDocument> usuarios = 
				conexion.getDatabase("LaOca2017").getCollection("recuperacionContrasena", BsonDocument.class);

		try {
			usuarios.insertOne(recuUsuario);
		} catch (Exception e) {
			// TODO: handle exception
		}
		conexion.close();

}


	public static void actualizarVictorias(String email) throws Exception {
		if(existe(email)) {
			MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
			
			BsonDocument criterioActualizacion=new BsonDocument();
			BsonDocument criterio=new BsonDocument();
			BsonDocument criterioBuscarVictorias=new BsonDocument();
			criterioBuscarVictorias.append("email", new BsonString(email));
			criterioActualizacion.append("email", new BsonString(email));
			MongoCollection<BsonDocument> usuarios=
					conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
			int vic=0;
			FindIterable<BsonDocument> buscarVic= usuarios.find(criterioBuscarVictorias);
			if(buscarVic!=null) {
				String victorias=buscarVic.first().get("victorias").toString();
				victorias=victorias.split("=")[1].split("}")[0];
				System.out.println(victorias);
				vic=Integer.parseInt(victorias);
				

			}

			criterio.append("victorias", new BsonInt32(vic+1));
			usuarios.updateOne(criterioActualizacion, new BsonDocument("$set",criterio));
			
			
			conexion.close();
			
		}
		
	}


	public static String ranking() {
		// TODO Auto-generated method stub
		JSONObject jso=new JSONObject();
		
		MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
		MongoCollection<BsonDocument> usuarios=
				conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
		int ki=0;
		try (MongoCursor <BsonDocument> cursor = usuarios.find().iterator()) {
		    while (cursor.hasNext()) {
		    	ki+=1;
		    	jso.put("user_"+Integer.toString(ki), cursor.next().toString());
		    }
		}	
		
		System.out.println(jso);
		return jso.toString();
	}
	
	public static void cambiarAvatar(String email, String rutaNueva) throws Exception{
	    // TODO Auto-generated method stub
	    MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
	    BsonDocument criterioActualizacion=new BsonDocument();
	    BsonDocument criterio=new BsonDocument();
	    criterioActualizacion.append("email", new BsonString(email));
	    criterio.append("avatar", new BsonString(rutaNueva));
	    MongoCollection<BsonDocument> usuarios=
	        conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
	      usuarios.updateOne(criterioActualizacion, new BsonDocument("$set",criterio));

	    
	    conexion.close();
	    
	  }
	public static String avatar(String email) {
	    // TODO Auto-generated method stub
	    JSONObject jso=new JSONObject();
	    BsonDocument criterioEmail=new BsonDocument();
	    criterioEmail.append("email", new BsonString(email));
	    MongoClient conexion=MongoBroker.get().getConexionPrivilegiada();
	    MongoCollection<BsonDocument> usuarios=
	        conexion.getDatabase("LaOca2017").getCollection("usuarios", BsonDocument.class);
	    String ruta="";
	    
	    try (MongoCursor <BsonDocument> cursor = usuarios.find(criterioEmail).iterator()) {
	        while (cursor.hasNext()) {
	          ruta=cursor.next().toString();
	        }
	    }  
	    
	    return ruta;
	  }

}