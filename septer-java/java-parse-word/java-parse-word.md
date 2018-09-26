##java-parse-word

####maven
```xml
<dependency>
    <groupId>org.ansj</groupId>
    <artifactId>ansj_seg</artifactId>
   	<version>5.1.1</version>
</dependency>
		
<!-- https://mvnrepository.com/artifact/org.nlpcn/nlp-lang -->
<dependency>
	<groupId>org.nlpcn</groupId>
	<artifactId>nlp-lang</artifactId>
	<version>1.7.7</version>
</dependency>
```
####java
```java
public class KeyWordUtils {
	/**
	 * 分词后根据词语类型进行筛选
	 * n:名词
	 * v:动词
	 * r:主语
	 * uj:介词
	 * ns:地名
	 * @param word
	 * @return
	 */
	public static List<String> parseWords(String word){
		List<String> backResult = new ArrayList<>();
		Result result = ToAnalysis.parse(word);
		List<Term> terms = result.getTerms();
		
		for (Term term : terms) {
			if (term.getNatureStr().equals("n")) {
				backResult.add(term.getName());
			}
		}
		return backResult;
		
	}
	public static void main(String[] args) {
		
		String words = "我想买笔记本电脑";
		List<String> result = KeyWordUtils.parseWords(words);
		for (String string : result) {
			System.err.println(string);
		}
	}
}
```