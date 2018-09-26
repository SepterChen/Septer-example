##java-socket-client
####maven
```xml
<dependency>  
    <groupId>io.socket</groupId>  
    <artifactId>socket.io-client</artifactId>  
    <version>0.8.3</version>  
</dependency> 
```
####java
```java
public class SocketUtils {

	private static SocketUtils manager;
	private static Socket socket;
	private static String host = "http://10.0.4.116:3001";
	
	public static SocketUtils getInstance(){
		if (manager == null) {
			manager = new SocketUtils();
			host = Constant.getProperty("socket.url", "");
			try {
				socket = IO.socket(host);
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
		}
		return manager;
	}
	
	
	public void start(){
		socket.open();
		socket.on("newMessage", new Emitter.Listener() {
			public void call(Object... arg0) {
				System.err.println(arg0[0].toString());
			}
		});
		
	}
	
	public void sendMessage(Object msg){
		if (!socket.connected()) {
			start();
		}
		socket.emit("newMessage", msg);
	}


	public void close() {
		socket.close();
	}
	
	public static void main(String[] args) {
		SocketUtils.getInstance().sendMessage("111");
	}
	
}

```