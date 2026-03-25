package com.company.repository;

import com.company.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findBySalaryGreaterThan(BigDecimal salary);
    List<Employee> findByDepartment(String department);
}