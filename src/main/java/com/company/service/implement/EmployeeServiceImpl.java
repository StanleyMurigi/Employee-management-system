package com.company.service.implement;

import com.company.model.Employee;
import com.company.repository.EmployeeRepository;
import com.company.service.IEmployeeService;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    private final EmployeeRepository repository;
    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee details) {
        Employee existing = getEmployeeById(id);
        existing.setFirstName(details.getFirstName());
        existing.setLastName(details.getLastName());
        existing.setEmail(details.getEmail());
        existing.setDepartment(details.getDepartment());
        existing.setSalary(details.getSalary());
        return repository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee existing = getEmployeeById(id);
        repository.delete(existing);
    }

    @Override
    public List<Employee> getHighEarners(BigDecimal threshold) {
        return repository.findBySalaryGreaterThan(threshold);
    }
}