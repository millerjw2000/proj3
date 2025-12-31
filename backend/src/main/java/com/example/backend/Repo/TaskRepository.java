package com.example.backend.Repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.backend.Model.Task;

@Repository
public class TaskRepository {

    private JdbcTemplate template;
    private String tableName = "tasks";

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

        private RowMapper<Task> mapper = new RowMapper<Task>() {
        @Override
        public Task mapRow(ResultSet rs, int row) throws SQLException {
        
            Task t = new Task();
            
            t.setId(rs.getString("id"));
            t.setUserId(rs.getString("userId"));
            t.setCreationTime(rs.getInt("creationTime"));
            t.setDueTime(rs.getInt("dueTime"));
            t.setDescription(rs.getString("description"));
            t.setStatus(rs.getInt("status"));

            return t;

        }
    };

    public void enter(Task task) {

        String query = "INSERT INTO " + tableName + " (id,userId,creationTime,dueTime,description,status) " +
        "VALUES (?,?,?,?,?,?)";
        template.update(query,
            task.getId(),
            task.getUserId(),
            task.getCreationTime(),
            task.getDueTime(),
            task.getDescription(),
            task.getStatus()
        );

    }

    public ArrayList<Task> getAll(String userId) {
        String query = "SELECT * FROM " + tableName + " WHERE userId = ? ORDER by dueTime ASC";
        ArrayList<Task> tasks = new ArrayList<Task>(template.query(query,mapper,userId));
        return tasks;
    }

    public void changeStatus(String taskId) { // Could maybe condense this into one sql query later
        String query = "SELECT status FROM " + tableName + " WHERE id = ?";
        Integer status = template.queryForObject(query,Integer.class,taskId);
        status = (status == 1) ? 0 : 1;
        query = "UPDATE " + tableName + " SET status = ? WHERE id = ?";
        template.update(query,status,taskId);
    }

    public void delete(String taskId) {
        String query = "DELETE FROM " + tableName + " WHERE id = ?";
        template.update(query, taskId);
    }

}
