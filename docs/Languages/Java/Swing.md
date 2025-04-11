# Swing - Java GUI Library

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```java
import java.io.*;
import java.awt.*;
import javax.swing.*;

public class Swing{
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        Label l1 = new Label("Select known Languages");

        L1.setBounds(150, 200, 220, 50);
        frame.add( l1 );

        frame.setSize( 500, 600 );
        frame.setLayout( null );
        frame.setVisible( true );
        f.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
    }
}
```
```java
JButton b = new JButton( "Button" );
b.setBounds( 100, 230, 180, 50 );
b.addActionListener( new ActionListener(){
    public void actionPerformed( ActionEvente ){
        l1.setText( "Welcome to Java." );
    }
});

b2.addActionListener(this);  
public void actionPerformed(ActionEvent e) {  
    String s1 = tf1.getText();  
    if( e.getSource() == b1 ) { 
        // ...
    }
}
```
```java
Label l1 = new Label( "Select known Languages" );
l1.setEditable( false );  // opt
```
```java
Checkbox c2 = new Checkbox( "My Checkbox" );
```
```java
final JPasswordField value = new JPasswordField();   
new String( value.getPassword() );   
```
```java
rb1 = new JRadioButton( "Male" );    
ButtonGroup bg = new ButtonGroup();    
bg.add( rb1 ); bg.add( rb2 ); 
```
```java
String country[] = {"India","Aus","U.S.A","England","Newzealand"};        
JComboBox cb = new JComboBox( country );   
```
</div>