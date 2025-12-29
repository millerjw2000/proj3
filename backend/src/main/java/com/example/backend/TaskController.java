package com.example.backend;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import org.springframework.context.ApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.Repo.*;
import com.example.backend.Model.Task;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {

    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // TODO: endpoints for adding a task, retrieving tasks, changing task status, deleting a task //

    @GetMapping("/fart")
    public String regularTest(Authentication auth) {
        System.out.println("regular test");
        String userId = (String) auth.getPrincipal();
        return userId + " accessed fart test";
    }

    @PostMapping("/tasks/enter")
    public void enterTask(@RequestBody TaskRequest request, Authentication auth) {
        
        Integer dueTime = request.getDueTime();
        String description = request.getDescription();
        Integer status = request.getStatus();
        String userId = (String) auth.getPrincipal();
        String taskId = GenerateId.generate(25);
        Integer creationTime = (int) (System.currentTimeMillis() / 1000);

        Task task = new Task();
        task.setId(taskId);
        task.setUserId(userId);
        task.setDescription(description);
        task.setStatus(status);
        task.setCreationTime(creationTime);
        task.setDueTime(dueTime);

        taskRepository.enter(task);
        System.out.println("Task created (" + taskId + ")");

    }

    @GetMapping("/tasks/getAll")
    public TaskResponse getAll(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        ArrayList<Task> tasks = taskRepository.getAll(userId);
        return new TaskResponse(tasks);
    }

}
