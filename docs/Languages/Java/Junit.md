# Junit - Java

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

```java
@Test
public void test_Function_Name() {
        assertEquals(result, function());
}
```
```java
assertThat(object, equalTo(other))
assertThat(function(), is(closeTo(result, abweichung));
```
```java
@Test(expected=NullPointerException.class)
public void needsExistingScaleFactor() {
        ...;
}
```
```java
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doReturn;

assertEquals: Überprüfung auf Gleichheit
assertSame: Überprüfung auf Identität
assertTrue: Überprüfung auf Wahrheit
asserNull: Überprüfung auf null
assertThat: Überprüfung auf Bedingung (z.B. größer, kleiner, etc.)

assertThat(target).isEqualTo(expected);
```
```java
@Autowired
private Wired wired; // Empty normal object

@MockBean
private MockedObject mockedObject; // Mocked object

@Test
void myTest() {
    // given
    doReturn("value").when(mockedObject).method(any(), String.class);
    
    mockedObject.method("value", "value");

    // then
    assertThat(wired.getSomething()).isEqualTo("value");
}
   
```
```java
@SonarCoverageExcludeAnotationGeneration
class ...
            
        
```
</div>
