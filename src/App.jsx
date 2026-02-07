import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  signInAnonymously, 
  onAuthStateChanged 
} from 'firebase/auth';

import { db, auth } from './config/firebase';

import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/header';
import { InfoSection } from './components/InfoSection';
import { OrderForm } from './components/OrderForm';
import { SpreadsheetView } from './components/SpreadsheetView';
import { AdminLoginGate } from './components/AdminLoginGate';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('form');
  const [activeTab, setActiveTab] = useState('P');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    tamanho: 'PP'
  });

  useEffect(() => {
    signInAnonymously(auth).catch(console.error);

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const colRef = collection(db, 'uniformes');

    const unsub = onSnapshot(colRef, (snap) => {
      setOrders(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsub();
  }, [user]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!user || submitting) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'uniformes'), {
        ...formData,
        createdAt: new Date(),
        userId: user.uid
      });

      setSuccess(true);
      setFormData({ nome: '', telefone: '', tamanho: 'M' });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Erro ao salvar:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-10 no-print">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <Header view={view} setView={setView} />

        <main>
          {view === 'form' ? (
            <OrderForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleOrderSubmit}
              submitting={submitting}
              success={success}
              totalOrders={orders.length}
            />
          ) : (
            isAdmin ? (
              <SpreadsheetView 
                orders={orders} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                userId={user?.uid}
                onLogout={() => { setIsAdmin(false); setView('form'); }}
              />
            ) : (
              <AdminLoginGate onLoginSuccess={() => setIsAdmin(true)} />
            )
          )}
        </main>

        <footer className="mt-20 py-12 border-t-2 border-zinc-900 text-center no-print">
          <p className="text-zinc-700 text-[10px] font-mono tracking-[0.4em] uppercase">
            Developed_by Davi Morais // 2026 // v2.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}