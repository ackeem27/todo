// // pages/signup.js

// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function Signup() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();

//         const res = await fetch('/api/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await res.json();
//         if (res.status === 200) {
//             alert(data);
//             router.push('/login');
//         } else {
//             alert(data);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//             />
//             <button type="submit">Signup</button>
//         </form>
//     );
// }


import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setMessage('Sign up successful. Please log in.');
    } else {
      const data = await response.json();
      setMessage(data.message || 'Sign up failed.');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
