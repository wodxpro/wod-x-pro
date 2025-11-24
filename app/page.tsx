'use client';

import { useSignerStatus, useUser } from '@account-kit/react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Button } from '@/app/ui/Button';
import { ArenaDashboard } from '@/components/ArenaDashboard';
import { DailyTraining } from '@/components/DailyTraining';
import { OnRampPIX } from '@/components/OnRampPIX';
import { ValidatorDashboard } from '@/components/ValidatorDashboard';
import { IPFSStatus } from '@/components/IPFSStatus';

// Desabilita static generation - página requer client-side rendering
export const dynamic = 'force-dynamic';

export default function Home() {
  const { isConnected } = useSignerStatus();
  const user = useUser();
  const { address } = useAccount();

  return (
    <main className="min-h-screen p-8 bg-arena">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-protocol">WOD[X] PRO</h1>
              <p className="text-protocol/80">
                Transforme esforço físico em valor digital real
              </p>
              <p className="text-sm text-protocol/60 mt-1 font-mono">
                wod.eth • Token: $WOD
              </p>
            </div>
            {isConnected ? (
              <div className="flex items-center gap-4">
                {address && (
                  <span className="text-sm text-protocol/70 font-mono">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                )}
                {user?.email && (
                  <span className="text-xs text-protocol/60">
                    {user.email}
                  </span>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>
        </header>

        {/* Main Content */}
        {isConnected ? (
          <div className="space-y-6">
            {/* Navegação Rápida */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Link href="/dashboard">
                <div className="bg-arena border border-token/20 rounded-lg p-4 hover:shadow-token transition-shadow cursor-pointer text-center">
                  <p className="text-sm font-semibold text-protocol">Dashboard</p>
                </div>
              </Link>
              <Link href="/desafios">
                <div className="bg-arena border border-token/20 rounded-lg p-4 hover:shadow-token transition-shadow cursor-pointer text-center">
                  <p className="text-sm font-semibold text-protocol">Desafios</p>
                </div>
              </Link>
              <Link href="/validar">
                <div className="bg-arena border border-token/20 rounded-lg p-4 hover:shadow-token transition-shadow cursor-pointer text-center">
                  <p className="text-sm font-semibold text-protocol">Validar</p>
                </div>
              </Link>
              <div className="bg-arena border border-token/20 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-protocol">Arena</p>
              </div>
            </div>

            <IPFSStatus />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <DailyTraining />
                <OnRampPIX />
              </div>
              <div>
                <ArenaDashboard />
              </div>
            </div>
            <ValidatorDashboard />
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4 text-protocol">
              Conecte sua wallet para começar
            </h2>
            <p className="text-protocol/70 mb-8">
              Use Alchemy Account Kit para login social e acesso sem fricção
            </p>
            <Link href="/login">
              <Button variant="primary">Fazer Login</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

