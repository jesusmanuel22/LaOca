package edu.uclm.esi.tysweb.laoca.dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.bson.BsonDocument;
import org.bson.BsonString;
import org.bson.BsonValue;
import org.bson.conversions.Bson;

import com.mongodb.MongoWriteException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import edu.uclm.esi.tysweb.laoca.dominio.Usuario;
import edu.uclm.esi.tysweb.laoca.mongodb.MongoBroker;

public class DAOUsuario {

	public static boolean existe(String nombreJugador) throws Exception {
		MongoBroker broker=MongoBroker.get();
		BsonDocument criterio=new BsonDocument();
		criterio.append("email", new BsonString(nombreJugador));
		
		MongoDatabase db=broker.getDatabase("MACARIO");
		MongoCollection<BsonDocument> usuarios = db.getCollection("usuarios", BsonDocument.class);
		BsonDocument usuario=usuarios.find(criterio).first();
		return usuario!=null;
	}

	public static void insert(Usuario usuario, String pwd) throws Exception {
		BsonDocument bUsuario=new BsonDocument();
		bUsuario.append("email", new BsonString(usuario.getLogin()));
		bUsuario.append("pwd", new BsonString(pwd));
		MongoDatabase db=MongoBroker.get().getDatabase("MACARIO");
		MongoCollection<BsonDocument> usuarios = db.getCollection("usuarios", BsonDocument.class);
		try {
			usuarios.insertOne(bUsuario);
		}
		catch (MongoWriteException e) {
			if (e.getCode()==11000)
				throw new Exception("¿No estarás ya registrado, chaval/chavala?");
			throw new Exception("Ha pasado algo muy malorrr");
		}
	}

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

}
