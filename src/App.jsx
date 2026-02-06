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
    tamanho: 'M'
  });

    useEffect(() => {
    signInAnonymously(auth).catch(console.error);

    const unsub = onAuthStateChanged(auth, (u) => {
      console.log(u)
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
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 no-print">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <Header view={view} setView={setView} />

        <main>
          {view === 'form' ? (
            <div className="grid lg:grid-cols-5 gap-12 items-start animate-in fade-in slide-in-from-left-4 duration-700">
              <InfoSection totalOrders={orders.length} />
              <OrderForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleOrderSubmit}
                submitting={submitting}
                success={success}
              />
            </div>
          ) : (
            isAdmin ? (
              <SpreadsheetView 
                orders={orders} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                userId="admin-session-active"
              />
            ) : (
              <AdminLoginGate onLoginSuccess={() => setIsAdmin(true)} />
            )
          )}
        </main>

        <footer className="mt-20 py-12 border-t border-slate-900 text-center no-print">
          <p className="text-slate-600 text-[10px] font-mono tracking-[0.2em] uppercase">
            Desenvolvido por Davi Morais // {new Date().getFullYear()} // v1.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}
