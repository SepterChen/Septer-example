##Java-QRCode

```xml

<dependency>  
    <groupId>net.glxn.qrgen</groupId>  
    <artifactId>javase</artifactId>  
    <version>2.0</version>  
</dependency>

```


```Java
public static void main(String[] args) {
	AbstractQRCode qrCode = QRCode.from("http://www.baidu.com");
	// 设置字符集，支持中文
	qrCode.withCharset("utf-8");
	// 设置生成的二维码图片大小
	qrCode.withSize(260, 260);
	ByteArrayOutputStream out = qrCode.to(ImageType.PNG).stream();
	File file = new File("D:\\qrCode.png");
	FileOutputStream fout = null;
	try {
		fout = new FileOutputStream(file);
		fout.write(out.toByteArray());
		fout.flush();
		System.out.println("***********二维码生成成功！**********");
	} catch (FileNotFoundException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			fout.close();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
@RequestMapping("code")
public Object code(HttpServletRequest request, HttpServletResponse response) throws Exception{   
	AbstractQRCode qrCode = QRCode.from("http://10.0.4.116:8000/code?random="+UUID.randomUUID().toString().replaceAll("-", "")); 
	qrCode.withHint(EncodeHintType.MARGIN, 1);
	response.setHeader("title", "动态生成二维码");
    // 设置字符集，支持中文  
    qrCode.withCharset("utf-8");  
    // 设置生成的二维码图片大小  
    qrCode.withSize(300,300);
    ByteArrayOutputStream out = qrCode.to(ImageType.PNG).stream();
	OutputStream outputStream = response.getOutputStream();
	outputStream.write(out.toByteArray());
	out.close();
	outputStream.close();
		
	return null;
}

```

```html
<img style="width: 280px;height: 280px;" src="http://10.0.4.116:8000/code" alt="">


```