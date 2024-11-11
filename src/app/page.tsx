'use client'
import React from "react";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="d-flex flex-column p-5 align-items-center">
      <Link href="/google">Google Charts</Link>
      <Link href="/recharts">ReCharts</Link>
    </div>
  );
}