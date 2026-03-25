package com.company.service;

import com.company.model.Employee;
import java.math.BigDecimal;
import java.util.List;

public interface IEmployeeService {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    Employee createEmployee(Employee employee);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
    List<Employee> getHighEarners(BigDecimal threshold);
}