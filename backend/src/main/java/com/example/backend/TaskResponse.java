package com.example.backend;

import java.util.ArrayList;

import com.example.backend.Model.Task;

public class TaskResponse {

    private ArrayList<Task> tasks;

    public TaskResponse(ArrayList<Task> tasks) {
        this.tasks = tasks;
    }

    public ArrayList<Task> getTasks() {
        return tasks;
    }

}
