package com.example.backend;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.Repo.TaskRepository;
import com.example.backend.Model.Task;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {

    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // TODO: //
    // make sure person task being deleted/changed belongs to person sending request // 
    // send proper codes back in response //

    @PostMapping("/tasks/enter")
    public TaskResponse enterTask(@RequestBody TaskRequest request, Authentication auth) {
        
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

        ArrayList<Task> tasks = taskRepository.getAll(userId);
        return new TaskResponse(tasks);

    }

    @GetMapping("/tasks/getAll")
    public TaskResponse getAll(Authentication auth) {
        
        String userId = (String) auth.getPrincipal();
        ArrayList<Task> tasks = taskRepository.getAll(userId);
        return new TaskResponse(tasks);

    }

    @PostMapping("/tasks/changeStatus")
    public TaskResponse changeStatus(@RequestBody ChangeTaskRequest request, Authentication auth) {

        String userId = (String) auth.getPrincipal();
        taskRepository.changeStatus(request.getTaskId());
        ArrayList<Task> tasks = taskRepository.getAll(userId);
        return new TaskResponse(tasks);

    }

    @PostMapping("/tasks/delete")
    public TaskResponse deleteTask(@RequestBody ChangeTaskRequest request, Authentication auth) {

        String userId = (String) auth.getPrincipal();
        taskRepository.delete(request.getTaskId());
        ArrayList<Task> tasks = taskRepository.getAll(userId);
        return new TaskResponse(tasks);

    }

}
