package edu.uclm.esi.tysweb.laoca.mongodb;

import org.bson.BsonDocument;
import org.bson.BsonString;
import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoBroker {
	private MongoClient mongoClient;
	
	private MongoBroker() {
		this.mongoClient=new MongoClient("localhost", 27017);
	}
	
	public static void main(String[] args) {
		MongoBroker broker=MongoBroker.get();
		MongoDatabase db = broker.mongoClient.getDatabase("MACARIO");
		
		if (db.getCollection("usuarios")==null)
			db.createCollection("usuarios");
		
		MongoCollection<BsonDocument> usuarios = db.getCollection("usuarios", BsonDocument.class);
				
		for (int i=1; i<=100; i++) {
			BsonDocument pepe=new BsonDocument();
			pepe.put("email", new BsonString("pepe" + i + "@pepe.com"));
			pepe.put("pwd", new BsonString("pepe"));
			usuarios.insertOne(pepe);
		}
		
		BsonDocument criterio=new BsonDocument();
		criterio.append("email", new BsonString("pepe100@pepe.com"));
		FindIterable<BsonDocument> busqueda = usuarios.find(criterio);
		BsonDocument elementoBuscado = busqueda.first();
		System.out.println(elementoBuscado.getString("email"));
		System.out.println(elementoBuscado.getString("pwd"));
		
		broker.mongoClient.close();
	}
	
	private static class MongoBrokerHolder {
		static MongoBroker singleton=new MongoBroker();
	}
	
	public static MongoBroker get() {
		return MongoBrokerHolder.singleton;
	}

	public MongoDatabase getDatabase(String databaseName) {
		return mongoClient.getDatabase(databaseName);
	}

	public void close() {
		this.mongoClient.close();
	}
}
