package com.employee.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementApplication.class, args);
	}

	@org.springframework.context.annotation.Bean
	public org.springframework.boot.CommandLineRunner run() {
		return args -> {
			System.out.println("\n\t----------------------------------------------------------");
			System.out.println("\t\tApplication is ready! Access it here:");
			System.out.println("\t\t👉  http://localhost:8080");
			System.out.println("\t----------------------------------------------------------\n");
		};
	}

}
