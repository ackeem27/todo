

// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// // Define the Task interface
// interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   categoryId: string;
// }

// // Define the Category interface
// interface Category {
//   id: string;
//   name: string;
// }

// const TaskComponent: React.FC = () => {
//   const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'status'>>({ title: '', description: '', categoryId: '' });
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [categories, setCategories] = useState<Category[]>([
//     { id: '1', name: 'Work' },
//     { id: '2', name: 'Personal' }
//   ]);

//   useEffect(() => {
//     // Fetch tasks and categories from an API or other source if needed
//     // Example:
//     // setTasks(fetchedTasks);
//     // setCategories(fetchedCategories);
//   }, []);

//   const createTask = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add the new task to the tasks array
//     const newTaskWithId: Task = { ...newTask, id: Date.now().toString(), status: 'Pending' };
//     setTasks([...tasks, newTaskWithId]);
//     // Reset newTask
//     setNewTask({ title: '', description: '', categoryId: '' });
//   };

//   const updateTaskStatus = (id: string, status: string) => {
//     setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
//   };

//   // Prepare data for the chart
//   const statusCounts = tasks.reduce((acc, task) => {
//     acc[task.status] = (acc[task.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const chartData = Object.keys(statusCounts).map(status => ({
//     name: status,
//     value: statusCounts[status]
//   }));

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div>
//       <h1>Tasks</h1>
//       <form onSubmit={createTask}>
//         <input
//           type="text"
//           placeholder="Title"
//           onChange={e => setNewTask({ ...newTask, title: e.target.value })}
//           value={newTask.title}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           onChange={e => setNewTask({ ...newTask, description: e.target.value })}
//           value={newTask.description}
//         />
//         <select onChange={e => setNewTask({ ...newTask, categoryId: e.target.value })} value={newTask.categoryId}>
//           <option value="">Select a category</option>
//           {categories.map(category => (
//             <option key={category.id} value={category.id}>{category.name}</option>
//           ))}
//         </select>
//         <button type="submit">Create Task</button>
//       </form>
//       <ul>
//         {tasks.length === 0 && <li>No tasks found</li>}
//         {tasks.map(task => (
//           <li key={task.id}>
//             {task.title} - {task.description} - {task.status}
//             <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>Start</button>
//             <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Complete</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Task Status Dashboard</h2>
//       <PieChart width={400} height={400}>
//         <Pie
//           data={chartData}
//           cx={200}
//           cy={200}
//           labelLine={false}
//           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//           outerRadius={150}
//           fill="#8884d8"
//           dataKey="value"
//         >
//           {chartData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default TaskComponent;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Define the Task interface
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  categoryId: string;
}

// Define the Category interface
interface Category {
  id: string;
  name: string;
}

const TaskComponent: React.FC = () => {
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'status'>>({ title: '', description: '', categoryId: '' });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' }
  ]);

  useEffect(() => {
    // Fetch tasks and categories from an API or other source if needed
    // Example:
    // setTasks(fetchedTasks);
    // setCategories(fetchedCategories);
  }, []);

  const createTask = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new task to the tasks array
    const newTaskWithId: Task = { ...newTask, id: Date.now().toString(), status: 'Pending' };
    setTasks([...tasks, newTaskWithId]);
    // Reset newTask
    setNewTask({ title: '', description: '', categoryId: '' });
  };

  const updateTaskStatus = (id: string, status: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Prepare data for the chart
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Title"
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          value={newTask.title}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          value={newTask.description}
        />
        <select onChange={e => setNewTask({ ...newTask, categoryId: e.target.value })} value={newTask.categoryId}>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button type="submit">Create Task</button>
      </form>
      <ul>
        {tasks.length === 0 && <li>No tasks found</li>}
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.status}
            <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>Start</button>
            <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Complete</button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Task Status Dashboard</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TaskComponent;