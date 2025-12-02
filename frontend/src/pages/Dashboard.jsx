import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import taskService from '../services/taskService';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    loadTasks();
  }, [selectedCategory]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll(selectedCategory || null);
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks([newTask, ...tasks]);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar tarefa');
      return false;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      return true;
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      return false;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa');
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await taskService.toggle(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError('Erro ao atualizar tarefa');
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <div style={{ marginTop: '80px' }}>
          <h1 style={{ color: 'white', marginBottom: '20px' }}>
            Bem-vindo, {user?.name}! 👋
          </h1>

          {error && (
            <div className="error-message" style={{ marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <TaskForm onSubmit={handleCreateTask} />

          <div style={{ marginTop: '30px', marginBottom: '20px' }}>
            <label style={{ color: 'white', marginRight: '10px' }}>
              Filtrar por categoria:
            </label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '2px solid white',
                fontSize: '16px'
              }}
            >
              <option value="">Todas</option>
              <option value="trabalho">Trabalho</option>
              <option value="pessoal">Pessoal</option>
              <option value="estudos">Estudos</option>
              <option value="saude">Saúde</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          {loading ? (
            <div className="loading">Carregando tarefas...</div>
          ) : (
            <TaskList 
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;