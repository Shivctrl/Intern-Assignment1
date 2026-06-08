import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { logout, getUser, hasRole } from '../services/auth.service';
import TaskForm from './TaskForm';

function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = hasRole('ROLE_ADMIN');
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('user'); // 'user' or 'admin'

  useEffect(() => {
    fetchTasks();
  }, [viewMode]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = viewMode === 'admin' && isAdmin
        ? await taskAPI.getAllTasksAdmin()
        : await taskAPI.getAllTasks();
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      if (viewMode === 'admin' && isAdmin) {
        await taskAPI.deleteTaskAdmin(id);
      } else {
        await taskAPI.deleteTask(id);
      }
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task');
      console.error(err);
    }
  };

  const handleTaskSaved = () => {
    setShowModal(false);
    setEditingTask(null);
    fetchTasks();
  };

  const getStatusClass = (status) => {
    return status ? status.toLowerCase().replace('_', '-') : 'pending';
  };

  const getPriorityClass = (priority) => {
    return priority ? priority.toLowerCase() : 'medium';
  };

  return (
    <div>
      <nav className="navbar">
        <h1>📋 Task Manager</h1>
        <div className="navbar-actions">
          <div className="user-info">
            <span>👤 {user?.username}</span>
            {isAdmin && <span className="badge">ADMIN</span>}
          </div>
          {isAdmin && (
            <button
              className="btn btn-secondary"
              onClick={() => setViewMode(viewMode === 'user' ? 'admin' : 'user')}
            >
              {viewMode === 'user' ? 'View All Tasks' : 'View My Tasks'}
            </button>
          )}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="task-header">
          <h2>{viewMode === 'admin' ? 'All Tasks (Admin View)' : 'My Tasks'}</h2>
          <button className="btn btn-success" onClick={handleCreateTask}>
            + Create Task
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description || 'No description provided'}</p>
                
                <div className="task-meta">
                  <span className={`task-status ${getStatusClass(task.status)}`}>
                    {task.status?.replace('_', ' ')}
                  </span>
                  <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>

                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  <div>👤 Owner: {task.username}</div>
                  {task.dueDate && (
                    <div>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                  )}
                  <div>🕐 Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                </div>

                {(viewMode === 'user' || task.username === user?.username) && (
                  <div className="task-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {viewMode === 'admin' && task.username !== user?.username && (
                  <div className="task-actions">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete (Admin)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <TaskForm
            task={editingTask}
            onClose={() => setShowModal(false)}
            onSave={handleTaskSaved}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
