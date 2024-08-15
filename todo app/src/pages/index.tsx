// pages/index.js
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8080/hello');
  const data = await res.text();

  return {
    props: {
      message: data,
    },
  };
}