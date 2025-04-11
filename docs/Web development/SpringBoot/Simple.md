---
sidebar_position: 1
---

# SpringBoot - Basics

### Installation

```bash
sudo apt update 
sudo apt-get install maven 
curl -s "https://get.sdkman.io" | bash 
sdk install springboot 
sudo apt-get install openjdk-21-jdk 

mvn clean install 
java -jar target/your-app-name.jar 
```

### Code
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```java
    // Simple request handeling

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/")
    public String getString() {
        return "index";
    }

    @GetMapping("/test/{resourceID}")
    public String getString(@PathVariable("resourceID") String resourceID) {
        return "Here is the String: " + resourceID;
    }

    @GetMapping("/test2/") // "/test2?resourceID=3"
    public String getString2(@RequestParam("resourceID") String resourceID) {
        return "Here is the String: " + resourceID;
    }

    @GetMapping("/get/{ID}")"/test2/28380434"
    public Optional<Student> getStudent(@PathVariable("ID") int ID) {
        Optional<Student> stu = studentService.getReferenceById(ID);
        System.out.println(stu);
        return stu;
    }
}


// --------------------------


import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```
```java
   // Spring database 

// Debendency "Spring Web", "Spring Data JPA", "MySQL Driver", "Lombok"?

// -------------- application.properties ----------------
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver 

spring.datasource.url=jdbc:mysql://localhost:3306/newDB
spring.datasource.username=root
spring.datasource.password=1234

spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl.auto=update
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

// -------------  Student -----------------
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Data
@Table(name = "STUDENT")
public class Student {
    @id
    @column(name = "MyID")
    private int id;

    @column(name = "info")
    private String infos;
}


// -------------- Repository ---------------
@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {}

// -------------- Service ---------------
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student saveDetails(Student student) {
        return studentRepository.save(student);
    }

    Optional<Student> getReferenceById(int integer) {
        return studentRepository.findById(integer);
    }
}

// ------------------- Controller -------------
@GetMapping("/get/{ID}")
public Optional<Student> getStudent(@PathVariable("ID") int ID) {
    Optional<Student> stu = studentService.getReferenceById(ID);
    System.out.println(stu);
    return stu;
}
// Start the SQL Server
```
```java
    // Dependenxy Injection

@Component // same as @Service, @Bean and @Configuration
public class TextWriter...

// --------------------------

@Autowired
Textwriter text;

// Auto import

@NoArgsConstructor
@AllArgsConstructor
```
```java
@Controller
public class myController {
    @RequestMapping("/")
    public String welcome() {
        return "index";
    }
}
```
</div>