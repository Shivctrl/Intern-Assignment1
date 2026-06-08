package com.primetrade.taskmanagement.controller;

import com.primetrade.taskmanagement.dto.MessageResponse;
import com.primetrade.taskmanagement.dto.TaskRequest;
import com.primetrade.taskmanagement.dto.TaskResponse;
import com.primetrade.taskmanagement.security.UserDetailsImpl;
import com.primetrade.taskmanagement.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tasks")
@Tag(name = "Tasks", description = "Task Management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @PostMapping
    @Operation(summary = "Create a new task", description = "Create a new task for the authenticated user")
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        TaskResponse task = taskService.createTask(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
    
    @GetMapping
    @Operation(summary = "Get all tasks", description = "Get all tasks for the authenticated user")
    public ResponseEntity<List<TaskResponse>> getAllTasks(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<TaskResponse> tasks = taskService.getAllTasks(userDetails.getUsername());
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID", description = "Get a specific task by its ID")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        TaskResponse task = taskService.getTaskById(id, userDetails.getUsername());
        return ResponseEntity.ok(task);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update task", description = "Update an existing task")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest request, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        TaskResponse task = taskService.updateTask(id, request, userDetails.getUsername());
        return ResponseEntity.ok(task);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task", description = "Delete a task")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        taskService.deleteTask(id, userDetails.getUsername());
        return ResponseEntity.ok(new MessageResponse("Task deleted successfully!"));
    }
    
    // Admin endpoints
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all tasks (Admin)", description = "Admin: Get all tasks from all users")
    public ResponseEntity<List<TaskResponse>> getAllTasksAdmin() {
        List<TaskResponse> tasks = taskService.getAllTasksAdmin();
        return ResponseEntity.ok(tasks);
    }
    
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete any task (Admin)", description = "Admin: Delete any task by ID")
    public ResponseEntity<?> deleteTaskAdmin(@PathVariable Long id) {
        taskService.deleteTaskAdmin(id);
        return ResponseEntity.ok(new MessageResponse("Task deleted successfully by admin!"));
    }
}
