package com.example.backend.Model;

public class Task {

    private String id;
    private String userId;
    private Integer creationTime;
    private Integer dueTime;
    private Integer status;
    private String description;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public Integer getCreationTime() {
        return creationTime;
    }
    public void setCreationTime(Integer creationTime) {
        this.creationTime = creationTime;
    }
    public Integer getDueTime() {
        return dueTime;
    }
    public void setDueTime(Integer dueTime) {
        this.dueTime = dueTime;
    }
    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

}
